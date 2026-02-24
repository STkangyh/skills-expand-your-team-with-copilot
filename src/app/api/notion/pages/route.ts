import { NextResponse } from "next/server";
import { getNotionPages } from "@/utils/notion";

export async function GET() {
  try {
    const pages = await getNotionPages();
    return NextResponse.json({ pages });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
