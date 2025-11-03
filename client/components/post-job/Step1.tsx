import React from 'react';
import { JobPostFormData, StepErrors, validateStep1 } from '@/lib/job-post-validation';

interface Step1Props {
  formData: Partial<JobPostFormData>;
  setFormData: (data: Partial<JobPostFormData>) => void;
  errors: StepErrors;
  setErrors: (errors: StepErrors) => void;
}

const JOB_CATEGORIES = [
  {
    category: "Skilled Trades & Construction",
    subcategories: [
      "Carpentry",
      "Electrical",
      "Plumbing",
      "HVAC / Refrigeration",
      "Masonry / Concrete",
      "Roofing / Framing",
      "Welding / Fabrication",
      "General Construction Labor",
      "Site Cleanup / Demolition",
    ],
  },
  {
    category: "Home & Property Services",
    subcategories: [
      "Residential Cleaning",
      "Handyman / Maintenance",
      "Landscaping / Lawn Care",
      "Gardening / Tree Trimming",
      "Painting / Drywall",
      "Pool Maintenance",
      "Snow Removal",
      "Pest Control",
    ],
  },
  {
    category: "Hospitality & Food Service",
    subcategories: [
      "Line Cook / Prep Cook",
      "Server / Waitstaff",
      "Bartender",
      "Dishwasher",
      "Host / Front Desk",
      "Housekeeping (Hotels, Airbnb)",
      "Catering & Events",
      "Barista / Café Assistant",
    ],
  },
  {
    category: "Caregiving & Personal Support",
    subcategories: [
      "Childcare / Nanny",
      "Elder Care / Companion",
      "Home Health Aide",
      "Personal Care Assistant",
      "Pet Sitting / Dog Walking",
      "Housekeeper / Domestic Worker",
    ],
  },
  {
    category: "Transportation & Logistics",
    subcategories: [
      "Delivery Driver",
      "Courier / Messenger",
      "Mover / Loader",
      "Forklift Operator",
      "Warehouse Associate",
      "Inventory Clerk",
      "Fleet Maintenance",
    ],
  },
  {
    category: "Facilities & Operations",
    subcategories: [
      "Janitorial / Custodial",
      "Security / Night Watch",
      "Building Maintenance",
      "Groundskeeping",
      "Mailroom / Logistics",
      "Equipment Technician",
    ],
  },
  {
    category: "Retail & Customer Service",
    subcategories: [
      "Cashier",
      "Sales Associate",
      "Stock Clerk",
      "Customer Service Representative",
    ],
  },
  {
    category: "Beauty & Wellness",
    subcategories: [
      "Hairstylist",
      "Barber",
      "Massage Therapist",
      "Esthetician",
    ],
  },
  {
    category: "Creative & Media",
    subcategories: [
      "Photographer",
      "Graphic Designer",
      "Video Editor",
      "Writer",
    ],
  },
];

export default function Step1({ formData, setFormData, errors, setErrors }: Step1Props) {
  const handleChange = (field: keyof JobPostFormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    // Clear error for this field when user starts typing
    const newErrors = { ...errors };
    delete newErrors[field];
    setErrors(newErrors);
  };

  const handleValidate = () => {
    const stepErrors = validateStep1(formData);
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  React.useEffect(() => {
    // Expose validation to parent
    (window as any).__validateStep1 = handleValidate;
  }, [formData]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">About the Job</h2>

      {/* Job Title */}
      <div>
        <label htmlFor="jobTitle" className="block text-sm font-semibold text-slate-900 mb-2">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          id="jobTitle"
          type="text"
          value={formData.jobTitle || ''}
          onChange={(e) => handleChange('jobTitle', e.target.value)}
          placeholder="e.g., House Cleaning - 3 Bedroom Home"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent ${
            errors.jobTitle ? 'border-red-500' : 'border-slate-200'
          }`}
        />
        {errors.jobTitle && <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-semibold text-slate-900 mb-2">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          value={formData.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] ${
            errors.category ? 'border-red-500' : 'border-slate-200'
          }`}
        >
          <option value="">Select a category</option>
          {JOB_CATEGORIES.map((group) => (
            <optgroup key={group.category} label={group.category}>
              {group.subcategories.map((subcat) => (
                <option key={subcat} value={subcat}>
                  {subcat}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-2">
          Job Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={formData.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe the job, responsibilities, and what you're looking for..."
          rows={5}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent resize-none ${
            errors.description ? 'border-red-500' : 'border-slate-200'
          }`}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Location */}
      <div>
        <label htmlFor="location" className="block text-sm font-semibold text-slate-900 mb-2">
          Location <span className="text-red-500">*</span>
        </label>
        <input
          id="location"
          type="text"
          value={formData.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="e.g., San Francisco, CA"
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent ${
            errors.location ? 'border-red-500' : 'border-slate-200'
          }`}
        />
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
      </div>

      {/* Pay Type */}
      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Pay Type <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payType"
              value="hourly"
              checked={formData.payType === 'hourly'}
              onChange={(e) => handleChange('payType', e.target.value as 'hourly' | 'fixed')}
              className="w-4 h-4"
            />
            <span className="text-sm text-slate-700">Hourly</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payType"
              value="fixed"
              checked={formData.payType === 'fixed'}
              onChange={(e) => handleChange('payType', e.target.value as 'hourly' | 'fixed')}
              className="w-4 h-4"
            />
            <span className="text-sm text-slate-700">Fixed Price</span>
          </label>
        </div>
        {errors.payType && <p className="text-red-500 text-sm mt-1">{errors.payType}</p>}
      </div>

      {/* Pay Range */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="payMin" className="block text-sm font-semibold text-slate-900 mb-2">
            {formData.payType === 'hourly' ? 'Min Pay/hr' : 'Total Pay'} <span className="text-red-500">*</span>
          </label>
          <input
            id="payMin"
            type="number"
            min="0"
            step="1"
            value={formData.payMin || ''}
            onChange={(e) => handleChange('payMin', parseFloat(e.target.value) || 0)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent ${
              errors.payMin ? 'border-red-500' : 'border-slate-200'
            }`}
          />
          {errors.payMin && <p className="text-red-500 text-sm mt-1">{errors.payMin}</p>}
        </div>

        <div>
          <label htmlFor="payMax" className="block text-sm font-semibold text-slate-900 mb-2">
            {formData.payType === 'hourly' ? 'Max Pay/hr' : 'Max Pay'} <span className="text-red-500">*</span>
          </label>
          <input
            id="payMax"
            type="number"
            min="0"
            step="1"
            value={formData.payMax || ''}
            onChange={(e) => handleChange('payMax', parseFloat(e.target.value) || 0)}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent ${
              errors.payMax ? 'border-red-500' : 'border-slate-200'
            }`}
          />
          {errors.payMax && <p className="text-red-500 text-sm mt-1">{errors.payMax}</p>}
        </div>
      </div>
    </div>
  );
}
