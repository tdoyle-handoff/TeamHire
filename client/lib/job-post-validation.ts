export interface JobPostFormData {
  jobTitle: string;
  category: string;
  description: string;
  location: string;
  payType: 'hourly' | 'fixed';
  payMin: number;
  payMax: number;
  variableHours: boolean;
  hoursPerPeriod: number;
  hoursPeriodType: 'week' | 'month';
  skillsRequired: string[];
  certifications: string[];
  experienceLevel: string;
  requireTools: boolean;
  toolsDescription: string;
  requireTransportation: boolean;
  noLanguageRequirement: boolean;
  languageRequirements: string[];
  requireBackgroundCheck: boolean;
  requireIntroVideo: boolean;
  requireReferences: boolean;
}

export interface StepErrors {
  [key: string]: string;
}

export const validateStep1 = (data: Partial<JobPostFormData>): StepErrors => {
  const errors: StepErrors = {};

  if (!data.jobTitle?.trim()) {
    errors.jobTitle = 'Job title is required';
  }

  if (!data.category?.trim()) {
    errors.category = 'Category is required';
  }

  if (!data.description?.trim()) {
    errors.description = 'Job description is required';
  } else if (data.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters';
  }

  if (!data.location?.trim()) {
    errors.location = 'Location is required';
  }

  if (!data.payType) {
    errors.payType = 'Pay type is required';
  }

  if (!data.payMin || data.payMin < 0) {
    errors.payMin = 'Minimum pay is required and must be >= 0';
  }

  if (!data.payMax || data.payMax < 0) {
    errors.payMax = 'Maximum pay is required and must be >= 0';
  }

  if (data.payMin && data.payMax && data.payMin > data.payMax) {
    errors.payMax = 'Maximum pay must be greater than or equal to minimum pay';
  }

  return errors;
};

export const validateStep2 = (data: Partial<JobPostFormData>): StepErrors => {
  const errors: StepErrors = {};

  if (!data.skillsRequired || data.skillsRequired.length === 0) {
    errors.skillsRequired = 'At least one skill is required';
  }

  return errors;
};

export const validateStep3 = (data: Partial<JobPostFormData>): StepErrors => {
  const errors: StepErrors = {};

  if (!data.requireBackgroundCheck) {
    errors.requireBackgroundCheck = 'Background check requirement must be specified';
  }

  if (!data.requireIntroVideo) {
    errors.requireIntroVideo = 'Intro video requirement must be specified';
  }

  if (!data.requireReferences) {
    errors.requireReferences = 'References requirement must be specified';
  }

  if (!data.noLanguageRequirement && (!data.languageRequirements || data.languageRequirements.length === 0)) {
    errors.languageRequirements = 'Language requirements must be specified';
  }

  return errors;
};

export const isStep1Valid = (data: Partial<JobPostFormData>): boolean => {
  return Object.keys(validateStep1(data)).length === 0;
};

export const isStep2Valid = (data: Partial<JobPostFormData>): boolean => {
  return Object.keys(validateStep2(data)).length === 0;
};

export const isStep3Valid = (data: Partial<JobPostFormData>): boolean => {
  return Object.keys(validateStep3(data)).length === 0;
};
