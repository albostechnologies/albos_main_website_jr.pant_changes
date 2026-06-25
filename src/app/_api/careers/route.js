import { NextResponse } from "next/server";
import { getPublishedJobListings } from "@/data/job-listings";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");
    const type = searchParams.get("type");
    const location = searchParams.get("location");

    let jobs = getPublishedJobListings();

    if (department && department !== "All") {
      jobs = jobs.filter((job) => job.department === department);
    }
    if (type && type !== "All") {
      jobs = jobs.filter((job) => job.type === type);
    }
    if (location && location !== "All") {
      jobs = jobs.filter((job) => job.location === location);
    }

    return NextResponse.json({ success: true, jobs, total: jobs.length });
  } catch (error) {
    console.error("Fetch jobs error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch jobs" },
      { status: 500 },
    );
  }
}
