import axios from "axios";
import React from "react";

type ResponseData = {
  status: number;
  message: string;
} | null;

type FormData = {
  plain_prompt: string;
  generated_prompt: string;
  result: string;
  ai_model: string;
};

type DataPayload = {
  payload: FormData;
  setResponseData: React.Dispatch<React.SetStateAction<ResponseData>>;
};

const sendCollectionRequest = async ({
  payload,
  setResponseData,
}: DataPayload) => {
  try {
    const response = await axios.post<ResponseData>(
      "/api/send-request",
      payload,
    );
    setResponseData(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      setResponseData(error.response.data);
    } else {
      console.error(error);
    }
  }
};

export { sendCollectionRequest };
export type { ResponseData, FormData };
