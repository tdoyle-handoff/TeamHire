import React from "react";
import {
  MapPin,
  Star,
  CheckCircle,
  Clock,
  Award,
  MessageCircle,
  Video,
} from "lucide-react";
import { WorkerProfile, BackgroundCheckStatus } from "@shared/types";
import { cn } from "@/lib/utils";

interface WorkerCardProps {
  worker: WorkerProfile;
  onContact?: () => void;
  onViewProfile?: () => void;
}

const getBackgroundCheckColor = (status: BackgroundCheckStatus) => {
  switch (status) {
    case "complete":
      return "text-natural-green";
    case "in_progress":
      return "text-warm-neutral";
    case "requested":
      return "text-warm-neutral";
    default:
      return "text-muted-foreground";
  }
};

const getBackgroundCheckLabel = (status: BackgroundCheckStatus) => {
  switch (status) {
    case "complete":
      return "Verified";
    case "in_progress":
      return "Verifying";
    case "requested":
      return "Pending";
    default:
      return "Not started";
  }
};

export const WorkerCard: React.FC<WorkerCardProps> = ({
  worker,
  onContact,
  onViewProfile,
}) => {
  const displayName = worker.alias || worker.firstName;
  const location = worker.cityArea || "Location not shared";

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1">
            {worker.avatar ? (
              <img
                src={worker.avatar}
                alt={displayName}
                className="w-12 h-12 rounded-full mb-3 object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-natural-green text-white font-bold flex items-center justify-center mb-3">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg text-foreground">{displayName}</h3>
              <p className="text-sm text-muted-foreground">
                {worker.experienceYears} years experience
              </p>
            </div>
          </div>
          {worker.introVideoUrl && (
            <Video className="w-5 h-5 text-natural-green flex-shrink-0" />
          )}
        </div>

        {/* Location & Reliability */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>

        {worker.reliabilityScore && (
          <div className="flex items-center gap-1 text-sm">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.round(worker.reliabilityScore! / 20)
                      ? "text-warm-neutral fill-warm-neutral"
                      : "text-muted"
                  )}
                />
              ))}
            </div>
            <span className="font-medium text-foreground">
              {(worker.reliabilityScore / 20).toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="mb-4 pb-4 border-t border-border flex-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {worker.skills.slice(0, 3).map((skill, i) => (
            <span key={i} className="text-xs bg-secondary text-foreground px-2 py-1 rounded">
              {skill}
            </span>
          ))}
          {worker.skills.length > 3 && (
            <span className="text-xs text-muted-foreground px-2 py-1">
              +{worker.skills.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Languages & Verification */}
      <div className="mb-4">
        {worker.languages.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
              Languages
            </p>
            <p className="text-sm text-foreground">{worker.languages.join(", ")}</p>
          </div>
        )}

        <div className={cn("flex items-center gap-1 text-sm", getBackgroundCheckColor(worker.backgroundCheckStatus))}>
          <CheckCircle className="w-4 h-4" />
          <span>{getBackgroundCheckLabel(worker.backgroundCheckStatus)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-border">
        <button
          onClick={onViewProfile}
          className="flex-1 px-4 py-2 rounded-lg font-medium text-sm bg-primary text-white hover:bg-primary/90 transition-all"
        >
          View Profile
        </button>
        <button
          onClick={onContact}
          className="px-4 py-2 rounded-lg font-medium text-sm bg-secondary text-foreground hover:bg-secondary/80 transition-all flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Contact</span>
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;
