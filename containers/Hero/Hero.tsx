import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Coins } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  setStepper: () => void;
}

export default function Hero({ setStepper }: HeroProps) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      <Link href="https://sociabuzz.com/yohanesrioirsan/tribe" target="_blank">
        <div className="text-white border border-glass-border bg-glass-background px-6 py-2 w-fit rounded-full text-xs backdrop-blur-md flex  items-center">
          <Coins className="mr-2" size={16} />
          <span>
            Like The Project? Keep it <b>alive</b> with your <b>support</b>!
          </span>
        </div>
      </Link>
      <h1 className="text-4xl lg:text-[44px] font-bold text-center text-white drop-shadow mb-3">
        Generate Proper AI Prompt Easily!
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
