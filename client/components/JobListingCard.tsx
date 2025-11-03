import React from "react";
import { Link } from "react-router-dom";
import { MapPin, DollarSign, Clock, CheckCircle } from "lucide-react";
import { VerificationBadge } from "@/components/VerificationBadge";

interface JobListingCardProps {
  id: string;
  title: string;
  employer: string;
  employerLogo?: string;
  location: string;
  payMin: number;
  payMax: number;
  currency?: string;
  schedule: string;
  verificationLevel: 1 | 2 | 3 | 4;
  languages: string[];
  idRequired: boolean;
}

export const JobListingCard: React.FC<JobListingCardProps> = ({
  id,
  title,
  employer,
  employerLogo,
  location,
  payMin,
  payMax,
  currency = "USD",
  schedule,
  verificationLevel,
  languages,
  idRequired,
}) => {
  const formatPay = () => {
    const format = (num: number) => `$${num.toLocaleString()}`;
    return `${format(payMin)} - ${format(payMax)}`;
  };

  return (
    <Link to={`/find-work?job=${id}`}>
      <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow cursor-pointer">
        {/* Header with employer logo and verification */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-start gap-3 flex-1">
            {employerLogo && (
              <img
                src={employerLogo}
                alt={employer}
                className="w-10 h-10 rounded-lg object-cover"
              />
            )}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
                {title}
              </h3>
              <p className="text-sm text-slate-600">{employer}</p>
            </div>
          </div>
          <VerificationBadge level={verificationLevel} showLabel={false} />
        </div>

        {/* Job details */}
        <div className="space-y-2 mb-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <DollarSign className="w-4 h-4 flex-shrink-0" />
            <span className="font-medium text-slate-900">{formatPay()}</span>
            <span className="text-xs">{currency}/hr</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{schedule}</span>
          </div>
        </div>

        {/* Languages and accessibility */}
        <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-slate-100">
          {languages.map((lang) => (
            <span
              key={lang}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
            >
              {lang}
            </span>
          ))}
          {!idRequired && (
            <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              No ID Required
            </span>
          )}
        </div>

        {/* Fair Hiring Pledge indicator */}
        <div className="text-xs text-slate-600 flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5 text-green-600" />
          Fair Hiring Pledge
        </div>
      </div>
    </Link>
  );
};

export default JobListingCard;
