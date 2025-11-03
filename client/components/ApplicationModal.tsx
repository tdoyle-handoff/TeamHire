import React from "react";
import { X } from "lucide-react";
import { ApplicationForm } from "@/components/ApplicationForm";
import { JobPost } from "@shared/types";

interface ApplicationModalProps {
  job: JobPost;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({
  job,
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    onClose();
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Apply Now</h2>
            <p className="text-sm text-slate-600 mt-1">{job.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <ApplicationForm
            jobId={job.id}
            jobTitle={job.title}
            employer={job.employerName}
            requirements={{
              requireIntroVideo: job.requireIntroVideo,
              requireReferences: job.requireReferences,
              requireBackgroundCheck: job.requireBackgroundCheck,
            }}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;
