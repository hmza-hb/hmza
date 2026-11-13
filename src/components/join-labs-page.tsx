"use client";

import type { FormEvent, ReactNode } from "react";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import {
  joinLabsFields,
  joinLabsIntro,
  joinLabsNote,
  joinLabsSuccess,
} from "@/data/join-labs";

type FormStatus = "idle" | "submitting" | "done" | "error";

const errorMessages: Record<string, string> = {
  invalid_fields: "Enter your full name and a valid email.",
  missing_answers: "Please fill in every question.",
  file_too_large: "Attachment must be 8 MB or smaller.",
  file_type: "That file type is not supported. Try PDF, DOC, images, or ZIP.",
  not_configured: "Applications are not wired yet. Email hello@hmza.cc instead.",
  send_failed: "Could not send your application. Try again or email hello@hmza.cc.",
  confirmation_failed:
    "We received your application but the confirmation email failed. We will still review it.",
};

const inputClass =
  "mt-2 w-full rounded-2xl border border-black/[0.08] bg-white px-4 py-3 text-[15px] text-ink outline-none transition-shadow placeholder:text-muted focus:border-lime focus:ring-2 focus:ring-lime/35";

const labelClass = "text-[13px] font-semibold tracking-wide text-ink";

export function JoinLabsPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorDetail(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/join-labs", {
        method: "POST",
        body: formData,
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        partial?: boolean;
      };

      if (response.ok) {
        setStatus("done");
        form.reset();
        return;
      }

      setStatus("error");
      const key = data.error ?? "send_failed";
      if (data.partial) {
        setErrorDetail(errorMessages.confirmation_failed);
        return;
      }
      setErrorDetail(errorMessages[key] ?? errorMessages.send_failed);
    } catch {
      setStatus("error");
      setErrorDetail(errorMessages.send_failed);
    }
  }

  return (
    <>
      <Navbar visible />
      <main className="min-h-screen bg-white text-ink">
        <div className="mx-auto w-full max-w-[1400px] px-5 pb-24 pt-[6.5rem] md:px-8 md:pt-28">
          <header className="max-w-2xl">
            <p className="text-[12px] font-medium tracking-[0.22em] uppercase text-muted">
              Participate
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.75rem,6vw,4rem)] leading-[0.92] tracking-[0.03em]">
              Join Labs
            </h1>
            <p className="mt-5 text-[16px] leading-[1.75] text-muted">
              {joinLabsIntro}
            </p>
            <p className="mt-4 rounded-2xl border border-lime/50 bg-lime/15 px-5 py-4 text-[15px] leading-[1.7] text-ink">
              {joinLabsNote}
            </p>
          </header>

          {status === "done" ? (
            <SuccessPanel>
              <p className="text-[17px] font-medium text-ink">{joinLabsSuccess}</p>
              <Link
                href="/"
                className="mt-6 inline-block text-[14px] font-medium text-muted hover:text-ink"
              >
                ← Back to home
              </Link>
            </SuccessPanel>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-12 max-w-2xl space-y-8 rounded-[2rem] border border-black/[0.06] bg-cream p-8 md:p-10"
              encType="multipart/form-data"
            >
              <Field name="fullName" label={joinLabsFields.fullName} required>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  className={inputClass}
                  disabled={status === "submitting"}
                />
              </Field>

              <Field name="email" label={joinLabsFields.email} required>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                  disabled={status === "submitting"}
                />
              </Field>

              <Field
                name="socialProfile"
                label={joinLabsFields.socialProfile}
                hint="GitHub, LinkedIn, portfolio, or any profile that shows your work."
                required
              >
                <input
                  id="socialProfile"
                  name="socialProfile"
                  type="text"
                  required
                  placeholder="https://github.com/your-handle or @yourhandle"
                  className={inputClass}
                  disabled={status === "submitting"}
                />
              </Field>

              <Field
                name="aboutYou"
                label={joinLabsFields.aboutYou}
                required
              >
                <textarea
                  id="aboutYou"
                  name="aboutYou"
                  required
                  rows={5}
                  className={`${inputClass} resize-y min-h-[120px]`}
                  disabled={status === "submitting"}
                />
              </Field>

              <Field name="whyJoin" label={joinLabsFields.whyJoin} required>
                <textarea
                  id="whyJoin"
                  name="whyJoin"
                  required
                  rows={5}
                  className={`${inputClass} resize-y min-h-[120px]`}
                  disabled={status === "submitting"}
                />
              </Field>

              <Field
                name="attachment"
                label={joinLabsFields.attachment}
                hint="Optional. CV, research paper, portfolio PDF, or anything that inspires us. Max 8 MB."
              >
                <input
                  id="attachment"
                  name="attachment"
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp,.zip,.txt,.md,application/pdf"
                  className="mt-2 block w-full text-[14px] text-muted file:mr-4 file:rounded-full file:border-0 file:bg-nav file:px-4 file:py-2.5 file:text-[13px] file:font-medium file:text-ink hover:file:bg-[#ececec]"
                  disabled={status === "submitting"}
                />
              </Field>

              {errorDetail && (
                <p className="text-[14px] leading-relaxed text-red-700" role="alert">
                  {errorDetail}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex h-12 items-center rounded-full bg-ink px-8 text-[15px] font-medium text-white transition-colors hover:bg-neutral-800 disabled:cursor-wait disabled:opacity-80"
              >
                {status === "submitting" ? "Sending…" : "Submit application"}
              </button>
            </form>
          )}

          <footer className="mt-16 border-t border-black/6 pt-8">
            <Link
              href="/"
              className="text-[14px] font-medium text-muted transition-colors hover:text-ink"
            >
              ← Back to home
            </Link>
          </footer>
        </div>
      </main>
    </>
  );
}

function Field({
  name,
  label,
  hint,
  required,
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
        {required && <span className="text-muted"> *</span>}
      </label>
      {hint && (
        <p className="mt-1 text-[13px] leading-relaxed text-muted">{hint}</p>
      )}
      {children}
    </div>
  );
}

function SuccessPanel({ children }: { children: ReactNode }) {
  return (
    <div className="mt-12 max-w-2xl rounded-[2rem] border border-black/[0.06] bg-cream px-8 py-10">
      {children}
    </div>
  );
}
