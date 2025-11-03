import React from "react";
import { useViewMode } from "@/contexts/ViewModeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Briefcase, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export const ViewModeToggle: React.FC = () => {
  const { user } = useAuth();
  const { viewMode, toggleViewMode } = useViewMode();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
      <button
        onClick={() => {
          if (viewMode !== "worker") toggleViewMode();
        }}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
          viewMode === "worker"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-600 hover:text-slate-900",
        )}
        title="View as Worker"
      >
        <Users className="w-4 h-4" />
        <span className="hidden sm:inline">Worker</span>
      </button>
      <button
        onClick={() => {
          if (viewMode !== "employer") toggleViewMode();
        }}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all",
          viewMode === "employer"
            ? "bg-white text-slate-900 shadow-sm"
            : "text-slate-600 hover:text-slate-900",
        )}
        title="View as Employer"
      >
        <Briefcase className="w-4 h-4" />
        <span className="hidden sm:inline">Employer</span>
      </button>
    </div>
  );
};

export default ViewModeToggle;
