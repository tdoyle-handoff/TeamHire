import React from 'react';
import { Edit2 } from 'lucide-react';
import { JobPostFormData } from '@/lib/job-post-validation';

interface Step4Props {
  formData: Partial<JobPostFormData>;
  onEditSection: (step: number) => void;
}

export default function Step4({ formData, onEditSection }: Step4Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Preview & Publish</h2>

      {/* About the Job */}
      <div className="border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">About the Job</h3>
          <button
            type="button"
            onClick={() => onEditSection(1)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Job Title</p>
            <p className="text-slate-900 font-medium">{formData.jobTitle || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Category</p>
            <p className="text-slate-900 font-medium">{formData.category || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Description</p>
            <p className="text-slate-900 whitespace-pre-wrap">{formData.description || '-'}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Location</p>
            <p className="text-slate-900 font-medium">{formData.location || '-'}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Pay Type</p>
              <p className="text-slate-900 font-medium">{formData.payType || '-'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Min Pay</p>
              <p className="text-slate-900 font-medium">${formData.payMin || '0'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-600 uppercase">Max Pay</p>
              <p className="text-slate-900 font-medium">${formData.payMax || '0'}</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Hours Required</p>
            <p className="text-slate-900 font-medium">
              {formData.variableHours ? 'Variable' : `${formData.hoursPerPeriod} hours per ${formData.hoursPeriodType}`}
            </p>
          </div>
        </div>
      </div>

      {/* Worker Requirements */}
      <div className="border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Worker Requirements</h3>
          <button
            type="button"
            onClick={() => onEditSection(2)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Skills Required</p>
            {formData.skillsRequired && formData.skillsRequired.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.skillsRequired.map((skill) => (
                  <span key={skill} className="inline-block bg-[#24405A] text-white px-2.5 py-1 rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-900">-</p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Certifications</p>
            {formData.certifications && formData.certifications.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.certifications.map((cert) => (
                  <span key={cert} className="inline-block bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full text-xs">
                    {cert}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-900">None specified</p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Experience Level</p>
            <p className="text-slate-900 font-medium">{formData.experienceLevel || 'No specific requirement'}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Tools or Uniform</p>
            <p className="text-slate-900 font-medium">
              {formData.requireTools ? (formData.toolsDescription || 'Required') : 'Not required'}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Transportation</p>
            <p className="text-slate-900 font-medium">
              {formData.requireTransportation ? 'Required' : 'Not required'}
            </p>
          </div>
        </div>
      </div>

      {/* Conduct & Safety */}
      <div className="border border-slate-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Conduct & Safety</h3>
          <button
            type="button"
            onClick={() => onEditSection(3)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Background Check</p>
            <p className="text-slate-900 font-medium">
              {formData.requireBackgroundCheck ? '✓ Required' : '✗ Not required'}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Intro Video</p>
            <p className="text-slate-900 font-medium">
              {formData.requireIntroVideo ? '✓ Required' : '✗ Not required'}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">References</p>
            <p className="text-slate-900 font-medium">
              {formData.requireReferences ? '✓ Required' : '✗ Not required'}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-slate-600 uppercase">Language Requirements</p>
            {formData.noLanguageRequirement ? (
              <p className="text-slate-900 font-medium">No specific requirement</p>
            ) : formData.languageRequirements && formData.languageRequirements.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {formData.languageRequirements.map((lang) => (
                  <span key={lang} className="inline-block bg-[#24405A] text-white px-2.5 py-1 rounded-full text-xs">
                    {lang}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-slate-900">-</p>
            )}
          </div>
        </div>
      </div>

      {/* Summary Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Ready to publish?</span> Once you publish this job, it will be visible to all workers on the platform. You can edit it anytime from your dashboard.
        </p>
      </div>
    </div>
  );
}
