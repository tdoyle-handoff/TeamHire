import React from "react";
import { CheckCircle, Eye, Lock } from "lucide-react";

interface TrustBadgeProps {
  icon: "verified" | "privacy" | "secure";
  title: string;
  description: string;
}

const iconMap = {
  verified: CheckCircle,
  privacy: Eye,
  secure: Lock,
};

const colorMap = {
  verified: "text-natural-green",
  privacy: "text-muted-blue",
  secure: "text-warm-neutral",
};

const bgColorMap = {
  verified: "bg-natural-green/10",
  privacy: "bg-muted-blue/10",
  secure: "bg-warm-neutral/10",
};

export const TrustBadge: React.FC<TrustBadgeProps> = ({ icon, title, description }) => {
  const Icon = iconMap[icon];
  const iconColor = colorMap[icon];
  const bgColor = bgColorMap[icon];

  return (
    <div className={`p-4 rounded-lg ${bgColor}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-6 h-6 ${iconColor} flex-shrink-0 mt-0.5`} />
        <div>
          <h3 className="font-semibold text-foreground text-sm">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TrustBadge;
