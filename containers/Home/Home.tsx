"use client";
import PromptPrompt from "@/containers/Form/Form";
import Hero from "@/containers/Hero/Hero";
import Layout from "@/components/Layout";
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState(1);
  const handleStepper = () => {
    setStep(2);
  };
  return (
    <Layout>
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center py-8 px-4 mt-6">
        {step == 1 ? <Hero setStepper={handleStepper} /> : <PromptPrompt />}
      </div>
    </Layout>
  );
}
