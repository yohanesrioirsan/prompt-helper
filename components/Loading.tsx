import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full flex justify-center flex-col items-center animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[280px] h-[280px] rounded-full  border-transparent border-t-white/40 border-r-white/20 animate-spin-slow"></div>
        </div>

        {/* Pulsing glow effect */}
        <div className="absolute inset-0 flex items-center justify-center animate-pulse-glow">
          <div className="w-[260px] h-[260px] rounded-full bg-white/5 blur-xl"></div>
        </div>

        {/* Image with subtle float animation */}
        <div className="relative animate-float">
          <Image
            src="/prompt-helper.png"
            alt="prompt-helper-logo"
            width={250}
            height={250}
            className="relative z-10"
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 animate-slide-up">
        <h1 className="text-white text-xl font-medium">Generating Prompt</h1>
      </div>
      <div className="flex gap-1 mt-6">
        <span
          className="w-2 h-2 bg-white rounded-full animate-bounce-dot"
          style={{ animationDelay: "0ms" }}
        ></span>
        <span
          className="w-2 h-2 bg-white rounded-full animate-bounce-dot"
          style={{ animationDelay: "150ms" }}
        ></span>
        <span
          className="w-2 h-2 bg-white rounded-full animate-bounce-dot"
          style={{ animationDelay: "300ms" }}
        ></span>
      </div>
    </div>
  );
}
