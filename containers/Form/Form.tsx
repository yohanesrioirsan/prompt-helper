import { useState } from "react";
import { GlassButton } from "@/components/ui/glassbutton";
import { GlassTextarea } from "@/components/ui/glasstextarea";

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
      <h1 className="text-2xl font-bold text-white drop-shadow mb-3 break-words">
        No need to phrase your words perfectly!
      </h1>

      <div className="space-y-4 w-full">
        <GlassTextarea
          placeholder="What's in your mind?"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full h-32 resize-none"
          rows={5}
        />

        <div className="flex flex-col lg:flex-row gap-3 items-center">
          {textInput.length > 3 && (
            <GlassButton
              className="cursor-pointer w-full"
              variant="cancel"
              onClick={handleClear}
              disabled={isLoading}
            >
              Clear
            </GlassButton>
          )}
          <GlassButton
            className="cursor-pointer w-full"
            onClick={handleGenerate}
            disabled={!textInput.trim() || isLoading}
          >
            {isLoading ? "Generating..." : "Give Me The Prompt!"}
          </GlassButton>
        </div>

        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur">
            <p className="text-red-200 text-sm font-semibold mb-1">Error:</p>
            <p className="text-red-100/90 text-sm">{error}</p>
          </div>
        )}

        {generatedPrompt && (
          <div className="p-4 md:p-6 bg-white/10 rounded-lg backdrop-blur border border-white/20 w-full overflow-hidden">
            <div className="flex justify-between items-center mb-3 gap-2">
              <p className="text-white text-sm md:text-base font-semibold">
                Generated Prompt:
              </p>
              <button
                onClick={handleCopy}
                className="text-white/70 hover:text-white text-xs md:text-sm px-2 md:px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors flex-shrink-0"
              >
                Copy
              </button>
            </div>
            <div className="text-white/90 whitespace-pre-wrap text-sm leading-relaxed max-h-96 overflow-y-auto overflow-x-hidden pr-2 custom-scrollbar break-words">
              {generatedPrompt}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
