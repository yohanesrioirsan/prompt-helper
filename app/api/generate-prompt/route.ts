// app/api/generate-prompt/route.ts
import axios from "axios";
import { NextRequest } from "next/server";

interface ApiResponse {
  status: boolean;
  data: {
    message: string;
  };
}

interface RequestBody {
  textInput: string;
}

export async function POST(request: NextRequest) {
  try {
    // Security: Check origin/referer
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const allowedOrigins: string[] = [
      process.env.NEXT_PUBLIC_SITE_URL,
      "http://localhost:3000",
      "http://localhost:3001",
    ].filter((url): url is string => Boolean(url));

    const isValidOrigin = allowedOrigins.some(
      (allowed) => origin === allowed || referer?.startsWith(allowed),
    );

    if (!isValidOrigin && process.env.NODE_ENV === "production") {
      return Response.json(
        { status: "error", error: "Unauthorized access" },
        { status: 403 },
      );
    }

    const body: RequestBody = await request.json();
    const { textInput } = body;

    if (!textInput || typeof textInput !== "string" || !textInput.trim()) {
      return Response.json(
        { status: "error", error: "Invalid input" },
        { status: 400 },
      );
    }

    const promptMessage = `Generate a proper prompt for me. I will give you my sentence, and I need you to phrase and craft it into a well-structured AI prompt. Here are my words: "${textInput}"`;

    const apiUrl = process.env.API_URL;
    const apiKey = process.env.API_KEY;

    if (!apiUrl || !apiKey) {
      console.error("Missing API configuration");
      return Response.json(
        { status: "error", error: "Server configuration error" },
        { status: 500 },
      );
    }

    const response = await axios.get<ApiResponse>(
      `${apiUrl}q=${encodeURIComponent(promptMessage)}&apikey=${apiKey}`,
    );

    if (response.data?.status && response.data?.data?.message) {
      return Response.json({
        status: "success",
        data: {
          message: response.data.data.message,
        },
      });
    }

    return Response.json(
      { status: "error", error: "Invalid response from AI service" },
      { status: 500 },
    );
  } catch (error) {
    console.error("API Route Error:", error);

    if (axios.isAxiosError(error)) {
      return Response.json(
        {
          status: "error",
          error: error.response?.data?.message || "Failed to generate prompt",
        },
        { status: error.response?.status || 500 },
      );
    }

    return Response.json(
      {
        status: "error",
        error: "Failed to generate prompt",
      },
      { status: 500 },
    );
  }
}
