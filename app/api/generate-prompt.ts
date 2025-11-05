// pages/api/generate-prompt.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface ApiResponse {
  status: boolean;
  data: {
    message: string;
  };
}

interface SuccessResponse {
  status: "success";
  data: {
    message: string;
  };
}

interface ErrorResponse {
  status: "error";
  error: string;
}

type ResponseData = SuccessResponse | ErrorResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ status: "error", error: "Method not allowed" });
  }

  try {
    // Security: Check origin/referer
    const origin = req.headers.origin;
    const referer = req.headers.referer;
    const allowedOrigins: string[] = [
      process.env.NEXT_PUBLIC_SITE_URL,
      "http://localhost:3000",
      "http://localhost:3001",
    ].filter((url): url is string => Boolean(url));

    const isValidOrigin = allowedOrigins.some(
      (allowed) => origin === allowed || referer?.startsWith(allowed),
    );

    if (!isValidOrigin && process.env.NODE_ENV === "production") {
      return res
        .status(403)
        .json({ status: "error", error: "Unauthorized access" });
    }

    const { textInput } = req.body as { textInput?: string };

    if (!textInput || typeof textInput !== "string" || !textInput.trim()) {
      return res.status(400).json({ status: "error", error: "Invalid input" });
    }

    const promptMessage = `Generate a proper prompt for me. I will give you my sentence, and I need you to phrase and craft it into a well-structured AI prompt. Here are my words: "${textInput}"`;

    const apiUrl = process.env.API_URL;
    const apiKey = process.env.API_KEY;

    if (!apiUrl || !apiKey) {
      console.error("Missing API configuration");
      return res
        .status(500)
        .json({ status: "error", error: "Server configuration error" });
    }

    const response = await axios.get<ApiResponse>(
      `${apiUrl}q=${encodeURIComponent(promptMessage)}&apikey=${apiKey}`,
    );

    if (response.data?.status && response.data?.data?.message) {
      return res.status(200).json({
        status: "success",
        data: {
          message: response.data.data.message,
        },
      });
    }

    return res.status(500).json({
      status: "error",
      error: "Invalid response from AI service",
    });
  } catch (error) {
    console.error("API Route Error:", error);

    if (axios.isAxiosError(error)) {
      return res.status(error.response?.status || 500).json({
        status: "error",
        error: error.response?.data?.message || "Failed to generate prompt",
      });
    }

    return res.status(500).json({
      status: "error",
      error: "Failed to generate prompt",
    });
  }
}
