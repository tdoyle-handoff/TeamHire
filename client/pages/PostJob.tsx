import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { toast } from 'sonner';
import Step1 from '@/components/post-job/Step1';
import Step2 from '@/components/post-job/Step2';
import Step3 from '@/components/post-job/Step3';
import Step4 from '@/components/post-job/Step4';
import { JobPostFormData, StepErrors, isStep1Valid, isStep2Valid, isStep3Valid } from '@/lib/job-post-validation';

const STEPS = [
  { number: 1, title: 'About the Job' },
  { number: 2, title: 'Worker Requirements' },
  { number: 3, title: 'Conduct & Safety' },
  { number: 4, title: 'Preview & Publish' },
];

export default function PostJob() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const [formData, setFormData] = useState<Partial<JobPostFormData>>({
    jobTitle: '',
    category: '',
    description: '',
    location: '',
    payType: 'hourly',
    payMin: 15,
    payMax: 25,
    variableHours: false,
    hoursPerPeriod: 20,
    hoursPeriodType: 'week',
    skillsRequired: [],
    certifications: [],
    experienceLevel: 'No specific requirement',
    requireTools: false,
    toolsDescription: '',
    requireTransportation: false,
    noLanguageRequirement: false,
    languageRequirements: [],
    requireBackgroundCheck: false,
    requireIntroVideo: false,
    requireReferences: false,
  });

  const [errors, setErrors] = useState<StepErrors>({});

  const validateCurrentStep = async (): Promise<boolean> => {
    switch (currentStep) {
      case 1:
        return (window as any).__validateStep1?.() || isStep1Valid(formData);
      case 2:
        return (window as any).__validateStep2?.() || isStep2Valid(formData);
      case 3:
        return (window as any).__validateStep3?.() || isStep3Valid(formData);
      default:
        return true;
    }
  };

  const handleNextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSaveDraft = async () => {
    setIsSavingDraft(true);
    try {
      // TODO: Wire to your data/storage later
      console.log('Saving draft:', formData);
      toast.success('Draft saved successfully!');
    } catch (error) {
      toast.error('Failed to save draft');
    } finally {
      setIsSavingDraft(false);
    }
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Wire to your API/database later
      console.log('Publishing job:', formData);
      
      toast.success('Job posted successfully!');
      
      setTimeout(() => {
        navigate('/employer-dashboard', {
          state: { message: 'Job posted successfully!' },
        });
      }, 1500);
    } catch (error) {
      toast.error('Failed to post job');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSection = (step: number) => {
    setCurrentStep(step);
    window.scrollTo(0, 0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 4:
        return (
          <Step4
            formData={formData}
            onEditSection={handleEditSection}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <section className="bg-[#FAFAFA] border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Post a Job</h1>
          <p className="text-slate-600">
            Create a new job posting with detailed requirements and connect with
            qualified workers.
          </p>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Step Indicator */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {STEPS.map((step) => (
                <div
                  key={step.number}
                  className="flex-1 flex flex-col items-center"
                >
                  <button
                    type="button"
                    onClick={() => step.number < currentStep && setCurrentStep(step.number)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-all ${
                      currentStep === step.number
                        ? 'bg-[#24405A] text-white'
                        : step.number < currentStep
                        ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {step.number < currentStep ? '✓' : step.number}
                  </button>
                  <p className="text-xs sm:text-sm font-medium text-center text-slate-700 hidden sm:block">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#24405A] transition-all duration-300"
                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Summary Errors */}
          {Object.keys(errors).length > 0 && currentStep !== 4 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm font-semibold text-red-900 mb-2">Please fix the following errors:</p>
              <ul className="list-disc list-inside space-y-1">
                {Object.values(errors).map((error, idx) => (
                  <li key={idx} className="text-sm text-red-800">{error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Step Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePreviousStep}
                className="px-6 py-3 border border-slate-300 text-slate-900 font-semibold rounded-md hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={isSavingDraft}
                className="px-6 py-3 border border-slate-300 text-slate-900 font-semibold rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                {isSavingDraft ? 'Saving...' : 'Save Draft'}
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#24405A] text-white font-semibold rounded-md hover:opacity-95 transition-all disabled:opacity-50"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Job'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
