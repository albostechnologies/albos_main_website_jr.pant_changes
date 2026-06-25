import { NextResponse } from "next/server";
import { isEmailConfigured, sendContactNotification } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is not configured. Please contact us directly at project@albostechnologies.com.",
        },
        { status: 503 },
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      company,
      phone,
      services,
      budget,
      timeline,
      description,
    } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 },
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      !EMAIL_REGEX.test(email.trim())
    ) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    await sendContactNotification({
      name: name.trim(),
      company: company?.trim() || null,
      email: email.trim(),
      phone: phone?.trim() || null,
      services: Array.isArray(services) ? services : null,
      budget: budget?.trim() || null,
      timeline: timeline?.trim() || null,
      description: description?.trim() || null,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for reaching out! Our team will review your submission and get back to you within 24 hours.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to send your message. Please try again or email project@albostechnologies.com.",
      },
      { status: 500 },
    );
  }
}
