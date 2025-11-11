import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  plain_prompt: string;
  generated_prompt: string;
  result: string;
  ai_model: string;
};

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body: RequestBody = await request.json();

    if (request.method === "POST") {
      const { plain_prompt, generated_prompt, result, ai_model }: RequestBody =
        body;

      const { error } = await supabase
        .from("collection_request")
        .insert([{ plain_prompt, generated_prompt, result, ai_model }]);

      if (error) {
        return NextResponse.json({
          message: error.message,
          success: false,
        });
      }

      return NextResponse.json({
        message: "Your request has been sent.",
        success: true,
        status: 201,
        data: body,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Invalid request body",
      success: false,
      status: 400,
      error: error,
    });
  }
}
