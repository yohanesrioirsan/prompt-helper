"use client";

import DotGrid from "@/components/DotGrid";
import Hero from "@/containers/Hero/Hero";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);

  const handleStepper = () => {
    setStep(2);
  };

  return (
    <div className="w-screen h-screen relative z-0">
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
      <div className="w-full h-full absolute top-0 left-0 z-1">
        <div className="w-full h-full flex items-center justify-center">
          {step == 1 ? (
            <Hero setStepper={handleStepper} />
          ) : (
            <h1>Hello World</h1>
          )}
        </div>
      </div>
    </div>
  );
}
