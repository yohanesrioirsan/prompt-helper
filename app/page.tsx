import Home from "@/containers/Home/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Helper - Your Plain Text To Proper AI Prompt",
  description:
    "Prompt Helper helps you turn your rough ideas or plain text into clean, structured prompts. No need to use fancy words or perfect phrasing — just write what’s on your mind, and let the AI do the rest.",
};
export default function HomePage() {
  return <Home />;
}
