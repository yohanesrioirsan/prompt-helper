import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("per-page")) || 10;

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from(`${process.env.SUPABASE_GET_COLLETION}`)
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    return NextResponse.json({
      status: 500,
      message: error.message,
    });
  }

  const totalPages = Math.ceil((count || 0) / pageSize);

  return NextResponse.json({
    status: 200,
    data: {
      result: data,
      pagination: {
        page,
        pageSize,
        total_data: count,
        totalPages,
      },
    },
  });
}
