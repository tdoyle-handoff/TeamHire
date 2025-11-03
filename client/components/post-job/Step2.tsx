import React from 'react';
import { Plus, X } from 'lucide-react';
import { JobPostFormData, StepErrors, validateStep2 } from '@/lib/job-post-validation';

interface Step2Props {
  formData: Partial<JobPostFormData>;
  setFormData: (data: Partial<JobPostFormData>) => void;
  errors: StepErrors;
  setErrors: (errors: StepErrors) => void;
}

export default function Step2({ formData, setFormData, errors, setErrors }: Step2Props) {
  const [skillInput, setSkillInput] = React.useState('');
  const [certificationInput, setCertificationInput] = React.useState('');

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skillsRequired?.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skillsRequired: [...(formData.skillsRequired || []), skillInput.trim()],
      });
      setSkillInput('');
      const newErrors = { ...errors };
      delete newErrors.skillsRequired;
      setErrors(newErrors);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skillsRequired: formData.skillsRequired?.filter((s) => s !== skill) || [],
    });
  };

  const handleAddCertification = () => {
    if (certificationInput.trim() && !formData.certifications?.includes(certificationInput.trim())) {
      setFormData({
        ...formData,
        certifications: [...(formData.certifications || []), certificationInput.trim()],
      });
      setCertificationInput('');
    }
  };

  const handleRemoveCertification = (cert: string) => {
    setFormData({
      ...formData,
      certifications: formData.certifications?.filter((c) => c !== cert) || [],
    });
  };

  const handleChange = (field: keyof JobPostFormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    const newErrors = { ...errors };
    delete newErrors[field];
    setErrors(newErrors);
  };

  const handleValidate = () => {
    const stepErrors = validateStep2(formData);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  React.useEffect(() => {
    (window as any).__validateStep2 = handleValidate;
  }, [formData]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Worker Requirements</h2>

      {/* Skills Required */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Skills Required <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSkill();
              }
            }}
            placeholder="e.g., House Cleaning, Detail Oriented"
            className={`flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent ${
              errors.skillsRequired && formData.skillsRequired?.length === 0 ? 'border-red-500' : 'border-slate-200'
            }`}
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {errors.skillsRequired && formData.skillsRequired?.length === 0 && (
          <p className="text-red-500 text-sm mb-2">{errors.skillsRequired}</p>
        )}

        {formData.skillsRequired && formData.skillsRequired.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.skillsRequired.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 bg-[#24405A] text-white px-3 py-1 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:bg-white/20 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Certifications */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Certifications Required
        </label>
        <p className="text-xs text-slate-600 mb-3">Optional: Specify any required certifications</p>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={certificationInput}
            onChange={(e) => setCertificationInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCertification();
              }
            }}
            placeholder="e.g., CPR Certification, OSHA 30, Forklift License"
            className="flex-1 px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddCertification}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {formData.certifications && formData.certifications.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-sm"
              >
                {cert}
                <button
                  type="button"
                  onClick={() => handleRemoveCertification(cert)}
                  className="hover:bg-amber-200 rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Experience Level */}
      <div>
        <label htmlFor="experience" className="block text-sm font-semibold text-slate-900 mb-2">
          Minimum Experience Level
        </label>
        <select
          id="experience"
          value={formData.experienceLevel || 'No specific requirement'}
          onChange={(e) => handleChange('experienceLevel', e.target.value)}
          className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A]"
        >
          <option value="No specific requirement">No specific requirement</option>
          <option value="Entry level (no experience)">Entry level (no experience)</option>
          <option value="Less than 1 year">Less than 1 year</option>
          <option value="1-2 years">1-2 years</option>
          <option value="3-5 years">3-5 years</option>
          <option value="5+ years">5+ years</option>
          <option value="10+ years">10+ years</option>
        </select>
      </div>

      {/* Tools or Uniform */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Tools or Uniform
        </label>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.requireTools || false}
            onChange={(e) => handleChange('requireTools', e.target.checked)}
            className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A] mt-1"
          />
          <span className="text-sm text-slate-700">
            Worker must provide/wear tools or uniform
          </span>
        </label>
        {formData.requireTools && (
          <input
            type="text"
            value={formData.toolsDescription || ''}
            onChange={(e) => handleChange('toolsDescription', e.target.value)}
            placeholder="e.g., Steel-toed boots, hard hat, work gloves"
            className="mt-2 w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent text-sm"
          />
        )}
      </div>

      {/* Transportation */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.requireTransportation || false}
            onChange={(e) => handleChange('requireTransportation', e.target.checked)}
            className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A] mt-1"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Transportation Access Required
            </p>
            <p className="text-xs text-slate-600 mt-0.5">
              Worker must have reliable transportation for off-site work
            </p>
          </div>
        </label>
      </div>
    </div>
  );
}
