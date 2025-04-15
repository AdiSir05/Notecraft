
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface ChordButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  chordName: string;
  active?: boolean;
}

const ChordButton = React.forwardRef<HTMLButtonElement, ChordButtonProps>(
  ({ className, chordName, active = false, ...props }, ref) => {
    return (
      <Button
        type="button"
        variant={active ? "default" : "outline"}
        className={cn(
          "h-10 px-4 text-sm font-medium",
          active ? "bg-notecraft-gold text-white" : "border-notecraft-brown/30 text-notecraft-brown hover:bg-notecraft-brown/10",
          className
        )}
        ref={ref}
        {...props}
      >
        {chordName}
      </Button>
    );
  }
);

ChordButton.displayName = "ChordButton";

export { ChordButton };
