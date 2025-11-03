import React from "react";
import { CheckCircle, Shield, Star, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationBadgeProps {
  level: 1 | 2 | 3 | 4;
  showLabel?: boolean;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  level,
  showLabel = true,
  className,
}) => {
  const badges = {
    1: {
      icon: CheckCircle,
      label: "ID Verified",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    2: {
      icon: Shield,
      label: "Background Check",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    3: {
      icon: Star,
      label: "4★+ Rating",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
    },
    4: {
      icon: Briefcase,
      label: "Fair-Pay Certified",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  };

  const badge = badges[level];
  const Icon = badge.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-sm font-medium",
        badge.bgColor,
        badge.borderColor,
        badge.color,
        className,
      )}
    >
      <Icon className="w-4 h-4" />
      {showLabel && <span>{badge.label}</span>}
    </div>
  );
};

export default VerificationBadge;
