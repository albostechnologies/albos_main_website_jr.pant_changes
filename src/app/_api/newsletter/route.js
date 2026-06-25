import { NextResponse } from "next/server";
import {
  isEmailConfigured,
  sendNewsletterSubscriptionNotification,
} from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    if (!isEmailConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: "Email service is not configured. Please try again later.",
        },
        { status: 503 },
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string" || email.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address" },
        { status: 400 },
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    await sendNewsletterSubscriptionNotification(trimmedEmail);

    return NextResponse.json(
      {
        success: true,
        message:
          "You're subscribed! Welcome to the Albos Technologies Pvt Ltd newsletter.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 },
    );
  }
}
