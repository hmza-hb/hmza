import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email.trim().toLowerCase()
      : "";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const buttondownKey = process.env.BUTTONDOWN_API_KEY;
  if (buttondownKey) {
    return subscribeButtondown(email, buttondownKey);
  }

  const resendKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (resendKey && audienceId) {
    return subscribeResend(email, resendKey, audienceId);
  }

  return NextResponse.json({ error: "not_configured" }, { status: 503 });
}

async function subscribeButtondown(email: string, apiKey: string) {
  const tag = process.env.BUTTONDOWN_TAG?.trim();

  const response = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      type: "regular",
      ...(tag ? { tags: [tag] } : {}),
    }),
  });

  if (response.ok || response.status === 409) {
    return NextResponse.json({ ok: true });
  }

  const detail = await response.text();
  console.error("Buttondown subscribe failed:", response.status, detail);
  return NextResponse.json({ error: "provider_error" }, { status: 502 });
}

async function subscribeResend(
  email: string,
  apiKey: string,
  audienceId: string,
) {
  const response = await fetch(
    `https://api.resend.com/audiences/${audienceId}/contacts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
      }),
    },
  );

  if (response.ok || response.status === 409) {
    return NextResponse.json({ ok: true });
  }

  const detail = await response.text();
  console.error("Resend subscribe failed:", response.status, detail);
  return NextResponse.json({ error: "provider_error" }, { status: 502 });
}
