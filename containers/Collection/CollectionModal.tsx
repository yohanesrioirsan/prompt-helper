import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { sendCollectionRequest, type ResponseData } from "./request";
import React, { useState } from "react";

export default function CollectionModal() {
  const [formData, setFormData] = useState({
    plain_prompt: "",
    generated_prompt: "",
    result: "",
    ai_model: "",
  });
  const [responseData, setResponseData] = useState<ResponseData>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendCollectionRequest({
        payload: formData,
        setResponseData,
      });
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="plain_prompt">Plain Prompt</Label>
          <Input
            id="plain_prompt"
            name="plain_prompt"
            value={formData.plain_prompt}
            onChange={handleChange}
            placeholder="Your plain text before generating"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="generated_prompt">Generated Prompt</Label>
          <Textarea
            id="generated_prompt"
            name="generated_prompt"
            value={formData.generated_prompt}
            onChange={handleChange}
            placeholder="The generated prompt from the site"
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="result">Result (Optional)</Label>
          <Input
            id="result"
            name="result"
            value={formData.result}
            onChange={handleChange}
            placeholder="Generated image from in AI Service (URL)"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="ai_model">AI Model</Label>
          <Input
            id="ai_model"
            name="ai_model"
            value={formData.ai_model}
            onChange={handleChange}
            placeholder="The AI Model that you use to generate the prompt"
            required
          />
        </div>
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
        {responseData?.status === 429 && responseData.message && (
          <span className="text-red-600 font-semibold text-center text-sm">
            {responseData.message}
          </span>
        )}
        {responseData?.status === 201 && responseData.message && (
          <span className="text-green-500 font-semibold text-center text-sm">
            {responseData.message}
          </span>
        )}
      </div>
    </form>
  );
}
