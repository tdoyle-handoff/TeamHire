import React, { useState } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Save,
  FileText,
  Video,
  Users,
  Calendar,
  CheckSquare,
  AlertCircle,
  Loader,
} from "lucide-react";
import { useApplication, JobApplication, ApplicationReference } from "@/contexts/ApplicationContext";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ApplicationFormProps {
  jobId: string;
  jobTitle: string;
  employer: string;
  requirements?: {
    requireIntroVideo?: boolean;
    requireReferences?: boolean;
    requireBackgroundCheck?: boolean;
  };
  onSubmit?: () => void;
}

const STEPS = [
  { number: 1, title: "Introduction", icon: FileText },
  { number: 2, title: "Video & References", icon: Video },
  { number: 3, title: "Availability", icon: Calendar },
  { number: 4, title: "Skills & Background", icon: CheckSquare },
  { number: 5, title: "Review & Submit", icon: AlertCircle },
];

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  jobId,
  jobTitle,
  employer,
  requirements = {},
  onSubmit,
}) => {
  const { userProfile } = useAuth();
  const { submitApplication, saveDraft } = useApplication();
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Partial<JobApplication>>({
    jobId,
    jobTitle,
    employer,
    workerId: "current-user",
    workerName: userProfile?.displayName || "",
    introduction: "",
    references: [],
    availability: {
      startDate: "",
      daysPerWeek: 3,
      hoursPerDay: 8,
    },
    confirmSkills: [],
    backgroundCheckConsent: false,
  });

  const [newReference, setNewReference] = useState<Partial<ApplicationReference>>(
    { name: "", title: "", company: "", phone: "", email: "" }
  );
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const handleAddReference = () => {
    if (
      newReference.name &&
      newReference.title &&
      newReference.company &&
      newReference.phone &&
      newReference.email
    ) {
      const ref: ApplicationReference = {
        id: `ref-${Date.now()}`,
        name: newReference.name,
        title: newReference.title,
        company: newReference.company,
        phone: newReference.phone,
        email: newReference.email,
      };
      setFormData({
        ...formData,
        references: [...(formData.references || []), ref],
      });
      setNewReference({
        name: "",
        title: "",
        company: "",
        phone: "",
        email: "",
      });
      toast({
        title: "Success",
        description: "Reference added",
      });
    }
  };

  const handleRemoveReference = (refId: string) => {
    setFormData({
      ...formData,
      references: (formData.references || []).filter((r) => r.id !== refId),
    });
  };

  const handleSkillToggle = (skill: string) => {
    const skills = formData.confirmSkills || [];
    if (skills.includes(skill)) {
      setFormData({
        ...formData,
        confirmSkills: skills.filter((s) => s !== skill),
      });
    } else {
      setFormData({
        ...formData,
        confirmSkills: [...skills, skill],
      });
    }
  };

  const handleNextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    saveDraft(formData);
    toast({
      title: "Success",
      description: "Application saved as draft",
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.introduction ||
      !formData.availability?.startDate ||
      formData.confirmSkills?.length === 0
    ) {
      toast({
        title: "Error",
        description: "Please complete all required fields",
        variant: "destructive",
      });
      return;
    }

    if (requirements.requireReferences && !formData.references?.length) {
      toast({
        title: "Error",
        description: "At least one reference is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      submitApplication(formData as JobApplication);
      toast({
        title: "Success!",
        description: "Your application has been submitted",
      });

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          {STEPS.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <button
                onClick={() => setCurrentStep(step.number)}
                disabled={step.number > currentStep}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all ${
                  step.number === currentStep
                    ? "bg-blue-600 text-white scale-110"
                    : step.number < currentStep
                      ? "bg-green-600 text-white"
                      : "bg-slate-200 text-slate-600"
                }`}
              >
                {step.number < currentStep ? "✓" : step.number}
              </button>

              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step.number < currentStep
                      ? "bg-green-600"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900">
            {STEPS[currentStep - 1].title}
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Step {currentStep} of {STEPS.length}
          </p>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-6 min-h-96">
        {/* Step 1: Introduction */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Cover Letter / Introduction *
              </label>
              <textarea
                value={formData.introduction || ""}
                onChange={(e) =>
                  setFormData({ ...formData, introduction: e.target.value })
                }
                placeholder="Tell the employer why you're interested in this position and what makes you a great fit..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none resize-none"
                rows={6}
              />
              <p className="text-xs text-slate-600 mt-2">
                {(formData.introduction || "").length} / 500 characters
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Video & References */}
        {currentStep === 2 && (
          <div className="space-y-6">
            {/* Video Introduction */}
            {requirements.requireIntroVideo && (
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Video Introduction (Required)
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  {videoFile ? (
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-slate-900">
                        {videoFile.name}
                      </p>
                      <button
                        onClick={() => setVideoFile(null)}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <>
                      <Video className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600 mb-3">
                        Record or upload a brief introduction (max 2 minutes)
                      </p>
                      <label className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 cursor-pointer">
                        Choose File
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* References */}
            {requirements.requireReferences && (
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-3">
                  References (Required)
                </label>

                {/* Add Reference Form */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 space-y-3">
                  <input
                    type="text"
                    value={newReference.name || ""}
                    onChange={(e) =>
                      setNewReference({ ...newReference, name: e.target.value })
                    }
                    placeholder="Reference Name"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                  />
                  <input
                    type="text"
                    value={newReference.title || ""}
                    onChange={(e) =>
                      setNewReference({ ...newReference, title: e.target.value })
                    }
                    placeholder="Title/Position"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                  />
                  <input
                    type="text"
                    value={newReference.company || ""}
                    onChange={(e) =>
                      setNewReference({
                        ...newReference,
                        company: e.target.value,
                      })
                    }
                    placeholder="Company/Organization"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                  />
                  <input
                    type="tel"
                    value={newReference.phone || ""}
                    onChange={(e) =>
                      setNewReference({ ...newReference, phone: e.target.value })
                    }
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                  />
                  <input
                    type="email"
                    value={newReference.email || ""}
                    onChange={(e) =>
                      setNewReference({ ...newReference, email: e.target.value })
                    }
                    placeholder="Email Address"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                  />
                  <button
                    onClick={handleAddReference}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Add Reference
                  </button>
                </div>

                {/* References List */}
                <div className="space-y-2">
                  {(formData.references || []).map((ref) => (
                    <div
                      key={ref.id}
                      className="bg-white border border-slate-200 rounded-lg p-3 flex items-start justify-between"
                    >
                      <div className="text-sm">
                        <p className="font-medium text-slate-900">{ref.name}</p>
                        <p className="text-slate-600">{ref.title}</p>
                        <p className="text-slate-600">{ref.company}</p>
                      </div>
                      <button
                        onClick={() => handleRemoveReference(ref.id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Availability */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                value={formData.availability?.startDate || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availability: {
                      ...formData.availability!,
                      startDate: e.target.value,
                    },
                  })
                }
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Days Per Week *
                </label>
                <select
                  value={formData.availability?.daysPerWeek || 3}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availability: {
                        ...formData.availability!,
                        daysPerWeek: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <option key={day} value={day}>
                      {day} days
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Hours Per Day *
                </label>
                <select
                  value={formData.availability?.hoursPerDay || 8}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availability: {
                        ...formData.availability!,
                        hoursPerDay: parseInt(e.target.value),
                      },
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                >
                  {[2, 4, 6, 8, 10, 12].map((hour) => (
                    <option key={hour} value={hour}>
                      {hour} hours
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Skills & Background */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-3">
                Confirm Your Skills *
              </label>
              <p className="text-sm text-slate-600 mb-3">
                Select the skills you have for this position
              </p>
              <div className="space-y-2">
                {["Heavy Lifting", "Teamwork", "Physical Fitness"].map(
                  (skill) => (
                    <label
                      key={skill}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.confirmSkills?.includes(skill) || false}
                        onChange={() => handleSkillToggle(skill)}
                        className="w-4 h-4 rounded border-slate-300"
                      />
                      <span className="text-sm text-slate-900">{skill}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            {requirements.requireBackgroundCheck && (
              <div>
                <label className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-300 hover:border-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.backgroundCheckConsent || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        backgroundCheckConsent: e.target.checked,
                      })
                    }
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  <span className="text-sm text-slate-900 font-medium">
                    I consent to a background check *
                  </span>
                </label>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Review & Submit */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">
                Application Summary
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ Introduction provided</li>
                {requirements.requireIntroVideo && videoFile && (
                  <li>✓ Video introduction uploaded</li>
                )}
                {requirements.requireReferences &&
                  formData.references?.length && (
                    <li>✓ {formData.references.length} reference(s) added</li>
                  )}
                <li>✓ Availability confirmed</li>
                {formData.confirmSkills?.length && (
                  <li>✓ {formData.confirmSkills.length} skill(s) confirmed</li>
                )}
                {requirements.requireBackgroundCheck &&
                  formData.backgroundCheckConsent && (
                    <li>✓ Background check consent provided</li>
                  )}
              </ul>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-900 mb-2">
                Position Details
              </h4>
              <p className="text-sm text-slate-600">
                <strong>Position:</strong> {jobTitle}
              </p>
              <p className="text-sm text-slate-600">
                <strong>Employer:</strong> {employer}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex gap-3">
        <button
          onClick={handlePreviousStep}
          disabled={currentStep === 1}
          className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <button
          onClick={handleSaveDraft}
          className="px-6 py-2 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 flex items-center gap-2 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Draft
        </button>

        {currentStep === STEPS.length ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="ml-auto px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {isSubmitting ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Submit Application"
            )}
          </button>
        ) : (
          <button
            onClick={handleNextStep}
            className="ml-auto px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 flex items-center gap-2 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;
