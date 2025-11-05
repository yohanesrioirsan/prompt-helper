"use client";
import DotGrid from "@/components/DotGrid";
import PromptPrompt from "@/containers/Form/Form";
import Hero from "@/containers/Hero/Hero";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const handleStepper = () => {
    setStep(2);
  };
  return (
    <div className="w-full min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <DotGrid
          dotSize={5}
          gap={30}
          baseColor="#676765"
          activeColor="#8A00C4"
          proximity={120}
          shockRadius={250}
          shockStrength={5}
          resistance={750}
          returnDuration={1.5}
        />
      </div>
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center py-8 px-4">
        {step == 1 ? <Hero setStepper={handleStepper} /> : <PromptPrompt />}
      </div>
    </div>
  );
}
