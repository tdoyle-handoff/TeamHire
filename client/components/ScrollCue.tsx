import React from "react";
import { ChevronDown } from "lucide-react";

interface ScrollCueProps {
  label?: string;
}

export const ScrollCue: React.FC<ScrollCueProps> = ({ label = "Learn how it works" }) => {
  return (
    <div className="flex flex-col items-center gap-2 mt-8 animate-bounce">
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
      <ChevronDown className="w-5 h-5 text-primary" />
    </div>
  );
};

export default ScrollCue;
