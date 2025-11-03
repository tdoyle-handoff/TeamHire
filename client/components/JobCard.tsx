import React from "react";
import {
  MapPin,
  DollarSign,
  Clock,
  Star,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { JobPost } from "@shared/types";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: JobPost;
  onApply?: () => void;
  onMessage?: () => void;
  isApplied?: boolean;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  onApply,
  onMessage,
  isApplied = false,
}) => {
  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-lg text-foreground line-clamp-2">
              {job.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {job.employerName}
            </p>
          </div>
          {job.employerVerificationLevel === "verified" && (
            <CheckCircle className="w-5 h-5 text-natural-green flex-shrink-0" />
          )}
        </div>

        {/* Category */}
        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mt-2">
          {job.category}
        </span>
      </div>

      {/* Location & Pay */}
      <div className="space-y-2 mb-4 flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{job.locationCityArea}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <DollarSign className="w-4 h-4" />
          <span>
            ${job.payRangeHourly.min} - ${job.payRangeHourly.max}/hr
          </span>
        </div>
      </div>

      {/* Requirements */}
      <div className="mb-4 pb-4 border-t border-border">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
          Requirements
        </p>
        <div className="flex flex-wrap gap-2">
          {job.skillsRequired.slice(0, 2).map((skill, i) => (
            <span
              key={i}
              className="text-xs bg-secondary text-foreground px-2 py-1 rounded"
            >
              {skill}
            </span>
          ))}
          {job.skillsRequired.length > 2 && (
            <span className="text-xs text-muted-foreground px-2 py-1">
              +{job.skillsRequired.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-4 text-xs text-muted-foreground">
        {job.requireIntroVideo && (
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-natural-green" />
            Intro video
          </span>
        )}
        {job.requireBackgroundCheck && (
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-natural-green" />
            Background check
          </span>
        )}
        {job.requireReferences && (
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-natural-green" />
            References
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-border">
        <button
          onClick={onApply}
          className={cn(
            "flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all",
            isApplied
              ? "bg-secondary text-foreground"
              : "bg-primary text-white hover:bg-primary/90",
          )}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>
        <button
          onClick={onMessage}
          className="px-4 py-2 rounded-lg font-medium text-sm bg-secondary text-foreground hover:bg-secondary/80 transition-all flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="hidden sm:inline">Message</span>
        </button>
      </div>
    </div>
  );
};

export default JobCard;
