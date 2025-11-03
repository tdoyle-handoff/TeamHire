import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { cn } from "@/lib/utils";

interface ReadAloudButtonProps {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const ReadAloudButton: React.FC<ReadAloudButtonProps> = ({
  text,
  className = "",
  size = "sm",
}) => {
  const { readAloud, isSpeaking, readAloudEnabled } = useAccessibility();

  if (!readAloudEnabled) {
    return null;
  }

  const sizeClasses = {
    sm: "p-1.5 w-7 h-7",
    md: "p-2 w-8 h-8",
    lg: "p-2.5 w-9 h-9",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <button
      onClick={() => readAloud(text)}
      className={cn(
        "inline-flex items-center justify-center rounded-lg transition-all duration-200",
        "hover:bg-blue-100 text-blue-600 hover:text-blue-700",
        sizeClasses[size],
        className,
      )}
      title="Read aloud"
      aria-label="Read aloud"
    >
      {isSpeaking ? (
        <VolumeX className={cn(iconSizes[size], "animate-pulse")} />
      ) : (
        <Volume2 className={iconSizes[size]} />
      )}
    </button>
  );
};

export default ReadAloudButton;
