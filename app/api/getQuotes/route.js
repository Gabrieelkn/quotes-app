import { NextResponse } from "next/server";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const res = await fetch(
    `https://api.api-ninjas.com/v1/quotes?category=${category}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": process.env.API_KEY,
      },
    }
  );
  const quote = await res.json();

  return NextResponse.json({ quote });
}
