import { NextResponse } from "next/server";
import { getPublishedBlogPosts } from "@/data/blog-posts";

export async function GET(request) {
  try {
    const { searchParams } = request.nextUrl;
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") || "10", 10)),
    );
    const category = searchParams.get("category") || undefined;

    let posts = getPublishedBlogPosts();

    if (category) {
      posts = posts.filter((post) => post.category === category);
    }

    const total = posts.length;
    const totalPages = Math.ceil(total / limit);
    const paginated = posts.slice((page - 1) * limit, page * limit);

    return NextResponse.json({
      posts: paginated,
      total,
      page,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 },
    );
  }
}
