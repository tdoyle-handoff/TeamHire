import React from 'react';
import { X } from 'lucide-react';
import { JobPostFormData, StepErrors, validateStep3 } from '@/lib/job-post-validation';

interface Step3Props {
  formData: Partial<JobPostFormData>;
  setFormData: (data: Partial<JobPostFormData>) => void;
  errors: StepErrors;
  setErrors: (errors: StepErrors) => void;
}

const LANGUAGES = [
  "English",
  "Spanish",
  "Mandarin Chinese",
  "Hindi",
  "French",
  "Arabic",
  "Portuguese",
  "Russian",
  "Japanese",
  "Vietnamese",
  "Italian",
  "Korean",
  "German",
  "Polish",
  "Thai",
];

export default function Step3({ formData, setFormData, errors, setErrors }: Step3Props) {
  const [customLanguage, setCustomLanguage] = React.useState('');

  const handleChange = (field: keyof JobPostFormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    const newErrors = { ...errors };
    delete newErrors[field];
    setErrors(newErrors);
  };

  const handleToggleLanguage = (language: string) => {
    const currentLanguages = formData.languageRequirements || [];
    if (formData.noLanguageRequirement) {
      handleChange('noLanguageRequirement', false);
    }
    if (currentLanguages.includes(language)) {
      handleChange('languageRequirements', currentLanguages.filter((l) => l !== language));
    } else {
      handleChange('languageRequirements', [...currentLanguages, language]);
    }
  };

  const handleToggleNoLanguageRequirement = () => {
    handleChange('noLanguageRequirement', !formData.noLanguageRequirement);
    if (!formData.noLanguageRequirement) {
      handleChange('languageRequirements', []);
      setCustomLanguage('');
    }
  };

  const handleAddCustomLanguage = () => {
    if (customLanguage.trim() && !formData.languageRequirements?.includes(customLanguage.trim())) {
      handleChange('languageRequirements', [
        ...(formData.languageRequirements || []),
        customLanguage.trim(),
      ]);
      setCustomLanguage('');
      if (formData.noLanguageRequirement) {
        handleChange('noLanguageRequirement', false);
      }
    }
  };

  const handleRemoveLanguage = (language: string) => {
    handleChange('languageRequirements', formData.languageRequirements?.filter((l) => l !== language) || []);
  };

  const handleValidate = () => {
    const stepErrors = validateStep3(formData);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  React.useEffect(() => {
    (window as any).__validateStep3 = handleValidate;
  }, [formData]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Conduct & Safety</h2>

      {/* Background Check */}
      <div className="border border-slate-200 rounded-lg p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.requireBackgroundCheck || false}
            onChange={(e) => handleChange('requireBackgroundCheck', e.target.checked)}
            className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A] mt-1"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Require Background Check
            </p>
            <p className="text-xs text-slate-600 mt-0.5">
              Workers must have a completed background check
            </p>
          </div>
        </label>
      </div>

      {/* Intro Video */}
      <div className="border border-slate-200 rounded-lg p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.requireIntroVideo || false}
            onChange={(e) => handleChange('requireIntroVideo', e.target.checked)}
            className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A] mt-1"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Require Intro Video
            </p>
            <p className="text-xs text-slate-600 mt-0.5">
              Workers must submit an introduction video
            </p>
          </div>
        </label>
      </div>

      {/* References */}
      <div className="border border-slate-200 rounded-lg p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.requireReferences || false}
            onChange={(e) => handleChange('requireReferences', e.target.checked)}
            className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A] mt-1"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Require References
            </p>
            <p className="text-xs text-slate-600 mt-0.5">
              Workers must provide professional references
            </p>
          </div>
        </label>
      </div>

      {/* Language Requirements */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-3">
          Language Requirements <span className="text-red-500">*</span>
        </label>

        {/* No Requirement Option */}
        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.noLanguageRequirement || false}
              onChange={handleToggleNoLanguageRequirement}
              className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A]"
            />
            <span className="text-sm font-medium text-slate-700">
              No specific language requirement
            </span>
          </label>
        </div>

        {/* Language Checkboxes */}
        {!formData.noLanguageRequirement && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {LANGUAGES.map((language) => (
                <label
                  key={language}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.languageRequirements?.includes(language) || false}
                    onChange={() => handleToggleLanguage(language)}
                    className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A]"
                  />
                  <span className="text-sm text-slate-700">{language}</span>
                </label>
              ))}
            </div>

            {/* Custom Language Input */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Other language
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customLanguage}
                  onChange={(e) => setCustomLanguage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCustomLanguage();
                    }
                  }}
                  placeholder="e.g., Amharic, Hmong, Swahili"
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddCustomLanguage}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors font-medium text-sm"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Selected Languages Display */}
            {formData.languageRequirements && formData.languageRequirements.length > 0 && (
              <div className="mt-4 p-3 bg-slate-50 rounded-md">
                <p className="text-xs font-medium text-slate-600 mb-2">
                  Selected languages:
                </p>
                <div className="flex flex-wrap gap-2">
                  {formData.languageRequirements.map((lang) => (
                    <span
                      key={lang}
                      className="inline-flex items-center gap-1.5 bg-[#24405A] text-white px-2.5 py-1 rounded-full text-xs"
                    >
                      {lang}
                      <button
                        type="button"
                        onClick={() => handleRemoveLanguage(lang)}
                        className="hover:bg-white/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {errors.languageRequirements && (
          <p className="text-red-500 text-sm mt-2">{errors.languageRequirements}</p>
        )}
      </div>
    </div>
  );
}
