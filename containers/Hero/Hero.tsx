import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeroProps {
  setStepper: () => void;
}

export default function Hero({ setStepper }: HeroProps) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <h1 className="text-4xl lg:text-[44px] font-bold text-center text-white lg:w-1/2 drop-shadow mb-3">
        Generate The Prompt Based On Your Imaginary
      </h1>
      <div className="flex items-center gap-3">
        <Button variant="primary" onClick={setStepper}>
          Generate Prompt Now
        </Button>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary">How this work?</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Don’t worry about sounding fancy — just type whatever’s in your
              head, and we’ll shape it into a great prompt for you.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
