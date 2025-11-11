import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

const requestLog = new Map<string, number>();

type RequestBody = {
  plain_prompt: string;
  generated_prompt: string;
  result: string;
  ai_model: string;
};

function rateLimiter(id: string): { allowed: boolean; resetTime?: number } {
  if (process.env.NODE_ENV === "development") {
    return { allowed: true };
  }

  const now = Date.now();
  const lastRequest = requestLog.get(id);
  const requestTime = 15 * 60 * 1000;

  if (lastRequest && now - lastRequest < requestTime) {
    const resetTime = lastRequest + requestTime;
    return { allowed: false, resetTime };
  }

  requestLog.set(id, now);

  for (const [key, timestamp] of requestLog.entries()) {
    if (now - timestamp > requestTime) {
      requestLog.delete(key);
    }
  }

  return { allowed: true };
}

export async function POST(request: NextRequest) {
  try {
    const userAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0] ??
      request.headers.get("x-real-ip") ??
      "127.0.0.1";

    const { allowed, resetTime } = rateLimiter(userAddress);

    if (!allowed && resetTime) {
      const waitTime = Math.ceil((resetTime - Date.now()) / 1000 / 60);

      return NextResponse.json({
        message: `Rate Limit exceeded. Please Try Again in ${waitTime} minutes`,
        success: false,
        status: 429,
      });
    }

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
