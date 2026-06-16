import { Resend } from "resend";

let resendClient = null;

function getResend() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

export const HR_EMAIL = process.env.HR_EMAIL ?? "hr@albostechnologies.com";
export const PROJECT_EMAIL =
  process.env.PROJECT_EMAIL ?? "project@albostechnologies.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ??
  "Albos Technologies <noreply@albostechnologies.com>";

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label, value) {
  if (!value?.trim()) return "";
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#52525B;width:180px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#18181B">${escapeHtml(value.trim())}</td></tr>`;
}

function emailShell(title, rows) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:24px;font-family:Inter,Arial,sans-serif;background:#FAFAFA">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #E5E7EB;overflow:hidden">
<tr><td style="padding:20px 24px;background:#18181B;color:#fff"><h1 style="margin:0;font-size:18px">${escapeHtml(title)}</h1><p style="margin:6px 0 0;font-size:12px;color:#A1A1AA">Albos Technologies Pvt Ltd</p></td></tr>
<tr><td style="padding:8px 0"><table width="100%" cellpadding="0" cellspacing="0">${rows}</table></td></tr>
</table></body></html>`;
}

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY?.trim());
}

export async function sendContactNotification(data) {
  const services =
    data.services && data.services.length > 0 ? data.services.join(", ") : null;

  const html = emailShell(
    "New project inquiry",
    [
      row("Name", data.name),
      row("Email", data.email),
      row("Company", data.company),
      row("Phone", data.phone),
      row("Service", services),
      row("Budget", data.budget),
      row("Timeline", data.timeline),
      row("Project details", data.description),
    ].join(""),
  );

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: [PROJECT_EMAIL],
    replyTo: data.email,
    subject: `[Contact] ${data.name}${data.company ? ` — ${data.company}` : ""}`,
    html,
  });

  if (error) throw new Error(error.message);
}

export async function sendNewsletterSubscriptionNotification(email) {
  const html = emailShell("New newsletter subscriber", row("Email", email));

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: [PROJECT_EMAIL],
    replyTo: email,
    subject: `[Newsletter] New subscriber — ${email}`,
    html,
  });

  if (error) throw new Error(error.message);
}

export async function sendCareerApplicationNotification(data) {
  const html = emailShell(
    data.customRole ? "New custom role application" : "New job application",
    [
      row("Position", data.jobTitle),
      row("Applicant", data.fullName),
      row("Email", data.email),
      row("Phone", data.phone),
      row("Current company", data.currentCompany),
      row("Experience", data.experience),
      row("LinkedIn", data.linkedinUrl),
      row("Portfolio", data.portfolioUrl),
      row("Resume link", data.resumeUrl),
      row("Notice period", data.noticePeriod),
      row("Expected salary", data.expectedSalary),
      row("Source", data.source),
      row("Cover letter", data.coverLetter),
      row(
        "Resume attached",
        data.resumeFile ? `Yes — ${data.resumeFile.filename}` : "No",
      ),
    ].join(""),
  );

  const attachments = data.resumeFile
    ? [{ filename: data.resumeFile.filename, content: data.resumeFile.content }]
    : undefined;

  const { error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to: [HR_EMAIL],
    replyTo: data.email,
    subject: `[Careers] ${data.jobTitle} — ${data.fullName}`,
    html,
    attachments,
  });

  if (error) throw new Error(error.message);
}
