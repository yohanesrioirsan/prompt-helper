import { useState } from "react";
import { GlassButton } from "@/components/ui/glassbutton";
import { GlassTextarea } from "@/components/ui/glasstextarea";
import Loading from "@/components/Loading";
import Link from "next/link";

export default function PromptPrompt() {
  const [textInput, setTextInput] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    setIsLoading(true);
    setError("");
    setGeneratedPrompt("");

    try {
      const response = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ textInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate prompt");
      }

      if (data.status === "success" && data.data?.message) {
        setGeneratedPrompt(data.data.message);
      } else {
        setError("No prompt generated. Please try again.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError(error.message || "Failed to generate prompt. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setTextInput("");
    setGeneratedPrompt("");
    setError("");
  };

  const handleCopy = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-8 my-auto">
      <div
        className={`transition-all duration-500 ease-in-out ${
          isLoading
            ? "opacity-0 scale-95 pointer-events-none absolute"
            : "opacity-100 scale-100"
        }`}
      >
        <h1 className="text-2xl font-bold text-white drop-shadow mb-3 break-words">
          No need to phrase your words perfectly!
        </h1>

        <div className="space-y-4 w-full">
          <GlassTextarea
            placeholder="What's in your mind?"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="w-full h-32 resize-none transition-all duration-300"
            rows={5}
          />

          <div className="flex flex-col lg:flex-row gap-3 items-center">
            {textInput.length > 3 && (
              <div className="w-full animate-fade-in">
                <GlassButton
                  className="cursor-pointer w-full transition-all duration-300 hover:scale-[1.02]"
                  variant="cancel"
                  onClick={handleClear}
                  disabled={isLoading}
                >
                  Clear
                </GlassButton>
              </div>
            )}
            <GlassButton
              className="cursor-pointer w-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              onClick={handleGenerate}
              disabled={!textInput.trim() || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating...
                </span>
              ) : (
                "Give Me The Prompt!"
              )}
            </GlassButton>
          </div>

          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur transition-all duration-300 animate-shake">
              <p className="text-red-200 text-sm font-semibold mb-1">Error:</p>
              <p className="text-red-100/90 text-sm">{error}</p>
            </div>
          )}

          {generatedPrompt && (
            <>
              <div className="p-4 md:p-6 bg-white/10 rounded-lg backdrop-blur border border-white/20 w-full overflow-hidden transition-all duration-500 animate-slide-up-fade">
                <div className="flex justify-between items-center mb-3 gap-2">
                  <p className="text-white text-sm md:text-base font-semibold">
                    Generated Prompt:
                  </p>
                  <button
                    onClick={handleCopy}
                    className="text-white/70 hover:text-white text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md hover:bg-white/10 transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
                  >
                    Copy
                  </button>
                </div>
                <div className="text-white/90 whitespace-pre-wrap text-sm leading-relaxed max-h-96 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar break-words">
                  {generatedPrompt}
                </div>
              </div>
              <div className="w-full flex justify-center mt-3">
                <Link
                  href="https://sociabuzz.com/yohanesrioirsan/tribe"
                  target="_blank"
                >
                  <div className="text-white border border-glass-border bg-glass-background px-6 py-2 w-fit rounded-full text-xs backdrop-blur-md">
                    Like The Project? Keep it <b>alive</b> with your{" "}
                    <b>support</b>!
                  </div>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="transition-all duration-500 ease-in-out">
          <Loading />
        </div>
      )}
    </div>
  );
}
