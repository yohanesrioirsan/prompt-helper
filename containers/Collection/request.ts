import axios from "axios";
import React from "react";

type DataPayload = {
  payload: object;
  setResponseData: React.Dispatch<React.SetStateAction<boolean>>;
};

const sendCollectionRequest = async ({
  payload,
  setResponseData,
}: DataPayload) => {
  try {
    const response = await axios.post("/api/send-request", payload);

    setResponseData(response.data);
  } catch (error) {
    console.log(error);
  }
};

export { sendCollectionRequest };
