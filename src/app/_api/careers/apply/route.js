import { NextResponse } from "next/server";
import {
  isEmailConfigured,
  sendCareerApplicationNotification,
} from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];

function getExtension(filename) {
  const dot = filename.lastIndexOf(".");
  return dot >= 0 ? filename.slice(dot).toLowerCase() : "";
}

export async function POST(request) {
  try {
    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is not configured. Please email your application to hr@albostechnologies.com.",
        },
        { status: 503 },
      );
    }

    const formData = await request.formData();

    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim() || null;
    const currentCompany =
      String(formData.get("currentCompany") ?? "").trim() || null;
    const experience = String(formData.get("experience") ?? "").trim() || null;
    const linkedinUrl =
      String(formData.get("linkedinUrl") ?? "").trim() || null;
    const portfolioUrl =
      String(formData.get("portfolioUrl") ?? "").trim() || null;
    const resumeUrl = String(formData.get("resumeUrl") ?? "").trim() || null;
    const noticePeriod =
      String(formData.get("noticePeriod") ?? "").trim() || null;
    const expectedSalary =
      String(formData.get("expectedSalary") ?? "").trim() || null;
    const source = String(formData.get("source") ?? "").trim() || null;
    const coverLetter =
      String(formData.get("coverLetter") ?? "").trim() || null;
    const customRole = formData.get("customRole") === "true";
    const customRoleTitle = String(
      formData.get("customRoleTitle") ?? "",
    ).trim();
    const jobId = String(formData.get("jobId") ?? "").trim();
    const jobTitle = String(formData.get("jobTitle") ?? "").trim();
    const resumeEntry = formData.get("resume");

    if (!fullName) {
      return NextResponse.json(
        { success: false, error: "Full name is required" },
        { status: 400 },
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required" },
        { status: 400 },
      );
    }

    let resolvedJobTitle = jobTitle;

    if (customRole) {
      if (!customRoleTitle) {
        return NextResponse.json(
          {
            success: false,
            error: "Please specify the role you are applying for",
          },
          { status: 400 },
        );
      }
      resolvedJobTitle = customRoleTitle;
    } else if (!jobId || !jobTitle) {
      return NextResponse.json(
        { success: false, error: "Job selection is required" },
        { status: 400 },
      );
    }

    let resumeFile = null;

    if (resumeEntry instanceof File && resumeEntry.size > 0) {
      const ext = getExtension(resumeEntry.name);
      if (!ALLOWED_RESUME_EXTENSIONS.includes(ext)) {
        return NextResponse.json(
          { success: false, error: "Resume must be a PDF, DOC, or DOCX file" },
          { status: 400 },
        );
      }
      if (resumeEntry.size > MAX_RESUME_BYTES) {
        return NextResponse.json(
          { success: false, error: "Resume file must be 5 MB or smaller" },
          { status: 400 },
        );
      }

      const arrayBuffer = await resumeEntry.arrayBuffer();
      resumeFile = {
        filename: resumeEntry.name,
        content: Buffer.from(arrayBuffer),
      };
    } else if (!resumeUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Please upload your resume or provide a resume link",
        },
        { status: 400 },
      );
    }

    await sendCareerApplicationNotification({
      fullName,
      email,
      jobTitle: resolvedJobTitle,
      phone,
      currentCompany,
      experience,
      linkedinUrl,
      portfolioUrl,
      resumeUrl,
      noticePeriod,
      expectedSalary,
      source,
      coverLetter,
      customRole,
      resumeFile,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your application has been submitted successfully! Our HR team will review it and get back to you within 5 business days.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Job application error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to send your application. Please try again or email hr@albostechnologies.com.",
      },
      { status: 500 },
    );
  }
}
