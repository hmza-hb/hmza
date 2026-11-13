import { Resend } from "resend";
import { NextResponse } from "next/server";
import { person } from "@/data/site-seo";
import {
  adminApplicationEmail,
  applicantConfirmationEmail,
} from "@/lib/join-labs-emails";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FILE_BYTES = 8 * 1024 * 1024;

const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
  "text/markdown",
  "image/png",
  "image/jpeg",
  "image/webp",
  "application/zip",
]);

function textField(formData: FormData, key: string, maxLen: number) {
  const raw = formData.get(key);
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, maxLen);
}

function resendFromAddress() {
  return (
    process.env.RESEND_FROM?.trim() ||
    process.env.JOIN_LABS_FROM?.trim() ||
    "HMZA Labs <onboarding@resend.dev>"
  );
}

function adminInbox() {
  return (
    process.env.JOIN_LABS_ADMIN_EMAIL?.trim() ||
    process.env.RESEND_ADMIN_EMAIL?.trim() ||
    person.email
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const fullName = textField(formData, "fullName", 120);
  const email = textField(formData, "email", 254).toLowerCase();
  const socialProfile = textField(formData, "socialProfile", 500);
  const aboutYou = textField(formData, "aboutYou", 8000);
  const whyJoin = textField(formData, "whyJoin", 8000);

  if (!fullName || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }
  if (!socialProfile || !aboutYou || !whyJoin) {
    return NextResponse.json({ error: "missing_answers" }, { status: 400 });
  }

  let attachment: { filename: string; content: Buffer } | undefined;
  const file = formData.get("attachment");
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json({ error: "file_too_large" }, { status: 400 });
    }
    const type = file.type || "application/octet-stream";
    if (type !== "application/octet-stream" && !ALLOWED_MIME.has(type)) {
      return NextResponse.json({ error: "file_type" }, { status: 400 });
    }
    const bytes = Buffer.from(await file.arrayBuffer());
    attachment = {
      filename: file.name.replace(/[^\w.\-() ]+/g, "_").slice(0, 120) || "attachment",
      content: bytes,
    };
  }

  const payload = {
    fullName,
    email,
    socialProfile,
    aboutYou,
    whyJoin,
    attachmentName: attachment?.filename,
  };

  const resend = new Resend(apiKey);
  const from = resendFromAddress();
  const adminTo = adminInbox();

  const adminMail = adminApplicationEmail(payload);
  const applicantMail = applicantConfirmationEmail(payload);

  const adminResult = await resend.emails.send({
    from,
    to: adminTo,
    replyTo: email,
    subject: adminMail.subject,
    html: adminMail.html,
    text: adminMail.text,
    attachments: attachment
      ? [{ filename: attachment.filename, content: attachment.content }]
      : undefined,
  });

  if (adminResult.error) {
    console.error("Join Labs admin email failed:", adminResult.error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  const confirmResult = await resend.emails.send({
    from,
    to: email,
    subject: applicantMail.subject,
    html: applicantMail.html,
    text: applicantMail.text,
  });

  if (confirmResult.error) {
    console.error("Join Labs confirmation email failed:", confirmResult.error);
    return NextResponse.json(
      { error: "confirmation_failed", partial: true },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
