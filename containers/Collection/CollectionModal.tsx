import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CollectionModal() {
  return (
    <form>
      <div className="grid gap-4">
        <div className="grid gap-3">
          <Label htmlFor="plain_prompt">Plain Prompt</Label>
          <Input
            id="plain_prompt"
            name="plain_prompt"
            placeholder="Your plain text before generating"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="generated_prompt">Generated Prompt</Label>
          <Textarea
            id="generated_prompt"
            name="generated_prompt"
            placeholder="The generated prompt from the site"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="result">Result (Optional)</Label>
          <Input
            id="result"
            name="result"
            placeholder="Generated image from in AI Service (URL)"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="ai_model">AI Model</Label>
          <Input
            id="ai_model"
            name="ai_model"
            placeholder="The AI Model that you use to generate the prompt"
          />
        </div>
        <Button variant="primary">Send</Button>
      </div>
    </form>
  );
}
