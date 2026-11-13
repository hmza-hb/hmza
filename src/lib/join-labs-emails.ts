type ApplicationPayload = {
  fullName: string;
  email: string;
  socialProfile: string;
  aboutYou: string;
  whyJoin: string;
  attachmentName?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function socialCell(value: string) {
  const safe = escapeHtml(value);
  if (/^https?:\/\//i.test(value)) {
    return `<a href="${safe}">${safe}</a>`;
  }
  return safe;
}

function firstName(fullName: string) {
  const part = fullName.trim().split(/\s+/)[0];
  return part || "there";
}

export function applicantConfirmationEmail(payload: ApplicationPayload) {
  const name = firstName(payload.fullName);

  const subject = "Your application reached HMZA Labs";

  const text = `Hi ${name},

We received your Join Labs application at HMZA.

This is not a hiring pipeline. The lab exists for people who build, research, and ship in the open. We read every application ourselves. If your work and story resonate, we will reach out.

What happens next:
1. We review your answers and anything you attached.
2. If there is a fit, we invite you to a conversation or a build sprint.
3. Funding and lab seats go to minds that inspire us, not résumés that look perfect on paper.

Until then, keep building. The lab is watching the work, not just the credentials.

Hamza Hafeez
HMZA Labs
https://hmza.cc
hello@hmza.cc`;

  const html = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;background:#f7f7f5;font-family:system-ui,-apple-system,sans-serif;color:#111;">
  <div style="max-width:560px;margin:0 auto;padding:40px 24px;">
    <p style="font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#737373;margin:0 0 12px;">HMZA Labs</p>
    <h1 style="font-size:28px;line-height:1.15;margin:0 0 20px;font-weight:600;">We got it, ${escapeHtml(name)}.</h1>
    <p style="font-size:16px;line-height:1.7;color:#333;margin:0 0 16px;">
      Your Join Labs application is in the lab inbox. We are not hiring employees here.
      We back builders, researchers, and odd geniuses who want to work in the open with us.
    </p>
    <p style="font-size:16px;line-height:1.7;color:#333;margin:0 0 16px;">
      We read every submission ourselves. If your story and work inspire us, you will hear from us.
      Grades and job titles matter less than proof that you think deeply and ship real things.
    </p>
  <p style="font-size:16px;line-height:1.7;color:#333;margin:0 0 24px;">
      Keep building while you wait. The lab notices work.
    </p>
    <p style="font-size:15px;line-height:1.6;color:#111;margin:0;">
      <strong>Hamza Hafeez</strong><br />
      HMZA Labs<br />
      <a href="https://hmza.cc" style="color:#111;">hmza.cc</a>
    </p>
  </div>
</body>
</html>`;

  return { subject, text, html };
}

export function adminApplicationEmail(payload: ApplicationPayload) {
  const subject = `Join Labs: ${payload.fullName}`;
  const attachmentLine = payload.attachmentName
    ? `Attachment: ${payload.attachmentName} (see email attachment)`
    : "Attachment: none";

  const text = `New Join Labs application

Full name: ${payload.fullName}
Email: ${payload.email}
Social profile: ${payload.socialProfile}

Who they are / what they want to be:
${payload.aboutYou}

Why they want to join:
${payload.whyJoin}

${attachmentLine}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<body style="margin:0;background:#fff;font-family:system-ui,-apple-system,sans-serif;color:#111;padding:24px;">
  <h1 style="font-size:22px;margin:0 0 20px;">New Join Labs application</h1>
  <table style="border-collapse:collapse;width:100%;max-width:640px;font-size:15px;line-height:1.5;">
    <tr><td style="padding:8px 0;color:#737373;width:160px;vertical-align:top;">Full name</td><td style="padding:8px 0;"><strong>${escapeHtml(payload.fullName)}</strong></td></tr>
    <tr><td style="padding:8px 0;color:#737373;vertical-align:top;">Email</td><td style="padding:8px 0;"><a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></td></tr>
    <tr><td style="padding:8px 0;color:#737373;vertical-align:top;">Social</td><td style="padding:8px 0;">${socialCell(payload.socialProfile)}</td></tr>
  </table>
  <h2 style="font-size:16px;margin:24px 0 8px;">Who they are / what they want to be</h2>
  <p style="white-space:pre-wrap;margin:0 0 20px;font-size:15px;line-height:1.65;">${escapeHtml(payload.aboutYou)}</p>
  <h2 style="font-size:16px;margin:0 0 8px;">Why join</h2>
  <p style="white-space:pre-wrap;margin:0 0 20px;font-size:15px;line-height:1.65;">${escapeHtml(payload.whyJoin)}</p>
  <p style="font-size:14px;color:#737373;margin:0;">${escapeHtml(attachmentLine)}</p>
</body>
</html>`;

  return { subject, text, html };
}
