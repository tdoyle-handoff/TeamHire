import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { X, Plus } from "lucide-react";
import { JobCategory } from "@shared/types";

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

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TIME_BLOCKS = [
  "6am-9am",
  "9am-12pm",
  "12pm-3pm",
  "3pm-6pm",
  "6pm-9pm",
  "9pm-12am",
];

export default function PostJob() {
  const navigate = useNavigate();

  // Form state
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<JobCategory>("Carpentry");
  const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [locationCityArea, setLocationCityArea] = useState("");
  const [payMin, setPayMin] = useState(15);
  const [payMax, setPayMax] = useState(25);
  const [startDate, setStartDate] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [timeBlocks, setTimeBlocks] = useState<string[]>([]);
  const [languageRequirements, setLanguageRequirements] = useState<string[]>(["English"]);
  const [requireBackgroundCheck, setRequireBackgroundCheck] = useState(false);
  const [requireIntroVideo, setRequireIntroVideo] = useState(false);
  const [requireReferences, setRequireReferences] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addSkill = () => {
    if (skillInput.trim() && !skillsRequired.includes(skillInput.trim())) {
      setSkillsRequired([...skillsRequired, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkillsRequired(skillsRequired.filter((s) => s !== skill));
  };

  const toggleLanguage = (language: string) => {
    if (languageRequirements.includes(language)) {
      setLanguageRequirements(languageRequirements.filter((l) => l !== language));
    } else {
      setLanguageRequirements([...languageRequirements, language]);
    }
  };

  const toggleDayOfWeek = (day: string) => {
    if (daysOfWeek.includes(day)) {
      setDaysOfWeek(daysOfWeek.filter((d) => d !== day));
    } else {
      setDaysOfWeek([...daysOfWeek, day]);
    }
  };

  const toggleTimeBlock = (block: string) => {
    if (timeBlocks.includes(block)) {
      setTimeBlocks(timeBlocks.filter((t) => t !== block));
    } else {
      setTimeBlocks([...timeBlocks, block]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobTitle.trim() || !description.trim() || !locationCityArea.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    if (skillsRequired.length === 0) {
      alert("Please add at least one skill requirement");
      return;
    }

    if (daysOfWeek.length === 0 || timeBlocks.length === 0 || !startDate) {
      alert("Please set a schedule");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Job Posted:", {
        jobTitle,
        description,
        category,
        skillsRequired,
        locationCityArea,
        payRangeHourly: { min: payMin, max: payMax },
        schedule: {
          startDate: new Date(startDate),
          daysOfWeek,
          timeBlocks,
        },
        languageRequirements,
        requireBackgroundCheck,
        requireIntroVideo,
        requireReferences,
      });

      setIsSubmitting(false);
      navigate("/employer-dashboard", {
        state: { message: "Job posted successfully!" },
      });
    }, 1000);
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
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Job Title and Category */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="jobTitle" className="block text-sm font-semibold text-slate-900 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="jobTitle"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g., House Cleaning - 3 Bedroom Home"
                  className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-slate-900 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as JobCategory)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A]"
                >
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
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the job, responsibilities, and what you're looking for..."
                rows={5}
                className="w-full px-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Location and Pay */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <label htmlFor="location" className="block text-sm font-semibold text-slate-900 mb-2">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  value={locationCityArea}
                  onChange={(e) => setLocationCityArea(e.target.value)}
                  placeholder="e.g., San Francisco, CA"
                  className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="payMin" className="block text-sm font-semibold text-slate-900 mb-2">
                  Min Pay/hr <span className="text-red-500">*</span>
                </label>
                <input
                  id="payMin"
                  type="number"
                  min="0"
                  step="1"
                  value={payMin}
                  onChange={(e) => setPayMin(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="payMax" className="block text-sm font-semibold text-slate-900 mb-2">
                  Max Pay/hr <span className="text-red-500">*</span>
                </label>
                <input
                  id="payMax"
                  type="number"
                  min="0"
                  step="1"
                  value={payMax}
                  onChange={(e) => setPayMax(parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
                  required
                />
              </div>
            </div>

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
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="e.g., House Cleaning, Detail Oriented"
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors font-medium"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skillsRequired.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 bg-[#24405A] text-white px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Language Requirements */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-3">
                Language Requirements
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {LANGUAGES.map((language) => (
                  <label
                    key={language}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={languageRequirements.includes(language)}
                      onChange={() => toggleLanguage(language)}
                      className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A]"
                    />
                    <span className="text-sm text-slate-700">{language}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Schedule <span className="text-red-500">*</span>
              </h3>

              <div className="space-y-6">
                {/* Start Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-2">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Days of Week */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Days of Week <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {DAYS_OF_WEEK.map((day) => (
                      <label
                        key={day}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={daysOfWeek.includes(day)}
                          onChange={() => toggleDayOfWeek(day)}
                          className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A]"
                        />
                        <span className="text-sm text-slate-700">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Time Blocks */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">
                    Time Blocks <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {TIME_BLOCKS.map((block) => (
                      <label
                        key={block}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={timeBlocks.includes(block)}
                          onChange={() => toggleTimeBlock(block)}
                          className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A]"
                        />
                        <span className="text-sm text-slate-700">{block}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Requirements
              </h3>

              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireBackgroundCheck}
                    onChange={(e) => setRequireBackgroundCheck(e.target.checked)}
                    className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A] mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Require Background Check
                    </p>
                    <p className="text-xs text-slate-600">
                      Workers must have a completed background check
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireIntroVideo}
                    onChange={(e) => setRequireIntroVideo(e.target.checked)}
                    className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A] mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Require Intro Video
                    </p>
                    <p className="text-xs text-slate-600">
                      Workers must submit an introduction video
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={requireReferences}
                    onChange={(e) => setRequireReferences(e.target.checked)}
                    className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A] mt-1"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      Require References
                    </p>
                    <p className="text-xs text-slate-600">
                      Workers must provide professional references
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-6 border-t border-slate-200">
              <button
                type="button"
                onClick={() => navigate("/employer-dashboard")}
                className="flex-1 px-6 py-3 border border-slate-300 text-slate-900 font-semibold rounded-md hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-[#24405A] text-white font-semibold rounded-md hover:opacity-95 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? "Posting..." : "Post Job"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
}
