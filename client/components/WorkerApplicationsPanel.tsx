import React from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useApplication } from "@/contexts/ApplicationContext";
import { useAuth } from "@/contexts/AuthContext";

export const WorkerApplicationsPanel: React.FC = () => {
  const { userProfile } = useAuth();
  const { getApplicationsByWorker } = useApplication();

  const applications = getApplicationsByWorker("worker-1");

  const getStatusBadge = (
    status: "draft" | "submitted" | "under_review" | "accepted" | "rejected"
  ) => {
    const statusConfig = {
      draft: { bg: "bg-slate-100", text: "text-slate-700", label: "Draft" },
      submitted: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        label: "Submitted",
      },
      under_review: {
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        label: "Under Review",
      },
      accepted: { bg: "bg-green-100", text: "text-green-700", label: "Accepted" },
      rejected: { bg: "bg-red-100", text: "text-red-700", label: "Rejected" },
    };

    const config = statusConfig[status];
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getStatusIcon = (
    status: "draft" | "submitted" | "under_review" | "accepted" | "rejected"
  ) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "submitted":
        return <FileText className="w-5 h-5 text-blue-600" />;
      case "under_review":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <FileText className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          My Applications
        </h2>
        <p className="text-slate-600">
          Track your job applications and their status
        </p>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 mb-4">No applications yet</p>
          <a
            href="/find-work"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            Browse Jobs
          </a>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((application) => (
            <div
              key={application.id}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              {/* Header Row */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(application.status)}
                    <h3 className="text-lg font-semibold text-slate-900">
                      {application.jobTitle}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">
                    with {application.employer}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(application.status)}
                </div>
              </div>

              {/* Application Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-slate-200">
                <div>
                  <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                    Applied On
                  </p>
                  <p className="text-sm text-slate-900 font-medium mt-1">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                    Availability
                  </p>
                  <p className="text-sm text-slate-900 font-medium mt-1">
                    {application.availability.daysPerWeek}d/wk
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                    Skills Confirmed
                  </p>
                  <p className="text-sm text-slate-900 font-medium mt-1">
                    {application.confirmSkills.length}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                    Status Last Updated
                  </p>
                  <p className="text-sm text-slate-900 font-medium mt-1">
                    {new Date(application.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Application Content Preview */}
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-1">
                    Your Introduction
                  </p>
                  <p className="text-sm text-slate-700 line-clamp-2">
                    {application.introduction}
                  </p>
                </div>

                {application.references.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-slate-600 uppercase tracking-wide mb-1">
                      References Provided
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {application.references.map((ref) => (
                        <span
                          key={ref.id}
                          className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                        >
                          {ref.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex gap-2 pt-4 border-t border-slate-200">
                <button className="flex-1 px-4 py-2 rounded-lg border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Details
                </button>

                {application.status === "draft" && (
                  <>
                    <button className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
                      Continue Editing
                    </button>
                    <button className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}

                {application.status === "submitted" && (
                  <button className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors">
                    Withdraw Application
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Summary */}
      {applications.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
              Total Applications
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              {applications.length}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
              Submitted
            </p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {applications.filter((a) => a.status !== "draft").length}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
              Under Review
            </p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {applications.filter((a) => a.status === "under_review").length}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-600 uppercase tracking-wide">
              Accepted
            </p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {applications.filter((a) => a.status === "accepted").length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerApplicationsPanel;
