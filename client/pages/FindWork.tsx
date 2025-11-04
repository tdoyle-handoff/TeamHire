import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  DollarSign,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { JobPost } from "@shared/types";
import { ReadAloudButton } from "@/components/ReadAloudButton";
import { ApplicationModal } from "@/components/ApplicationModal";
import { MessageModal } from "@/components/MessageModal";
import { useToast } from "@/hooks/use-toast";

// Demo jobs data
const demoJobs: JobPost[] = [
  {
    id: "1",
    title: "House Cleaning - 3 Bedroom Home",
    category: "Residential Cleaning",
    description: "Looking for reliable cleaner for recurring weekly service",
    skillsRequired: ["House Cleaning", "Detail Oriented"],
    languageRequirements: ["English"],
    licensesRequired: [],
    payRangeHourly: { min: 18, max: 22 },
    locationCityArea: "San Francisco, CA",
    schedule: {
      startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      daysOfWeek: ["Monday", "Friday"],
      timeBlocks: ["9am-12pm"],
    },
    requireIntroVideo: false,
    requireBackgroundCheck: true,
    requireReferences: false,
    employerVerificationLevel: "verified",
    status: "open",
    employerId: "emp1",
    employerName: "Sarah M.",
    applicantCount: 8,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "General Labor - Warehouse Setup",
    category: "General Construction Labor",
    description: "Help setting up new warehouse facility",
    skillsRequired: ["Heavy Lifting", "Teamwork", "Physical Fitness"],
    languageRequirements: ["English"],
    licensesRequired: ["Forklift License"],
    payRangeHourly: { min: 16, max: 20 },
    locationCityArea: "Oakland, CA",
    schedule: {
      startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      daysOfWeek: ["Monday", "Tuesday", "Wednesday"],
      timeBlocks: ["7am-3pm"],
    },
    requireIntroVideo: false,
    requireBackgroundCheck: false,
    requireReferences: true,
    employerVerificationLevel: "basic",
    status: "open",
    employerId: "emp2",
    employerName: "Tech Logistics Inc.",
    applicantCount: 12,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Handyman Services - Home Repairs",
    category: "Handyman / Maintenance",
    description: "Various repairs and maintenance needed",
    skillsRequired: ["General Repair", "Carpentry", "Plumbing"],
    languageRequirements: ["English"],
    licensesRequired: ["Electrical License"],
    payRangeHourly: { min: 25, max: 35 },
    locationCityArea: "Berkeley, CA",
    schedule: {
      startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      daysOfWeek: ["Saturday"],
      timeBlocks: ["9am-2pm"],
    },
    requireIntroVideo: true,
    requireBackgroundCheck: true,
    requireReferences: true,
    employerVerificationLevel: "verified",
    status: "open",
    employerId: "emp3",
    employerName: "Alex H.",
    applicantCount: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Caregiving - Elderly Companion",
    category: "Elder Care / Companion",
    description: "Companionship and light assistance",
    skillsRequired: ["Compassion", "Patience", "Communication"],
    languageRequirements: ["English", "Spanish"],
    licensesRequired: ["First Aid Certification"],
    payRangeHourly: { min: 20, max: 28 },
    locationCityArea: "San Jose, CA",
    schedule: {
      startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      daysOfWeek: ["Daily"],
      timeBlocks: ["2pm-6pm"],
    },
    requireIntroVideo: true,
    requireBackgroundCheck: true,
    requireReferences: true,
    employerVerificationLevel: "verified",
    status: "open",
    employerId: "emp4",
    employerName: "Family Care Services",
    applicantCount: 3,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    title: "Restaurant Service - Kitchen Help",
    category: "Line Cook / Prep Cook",
    description: "Fast-paced restaurant kitchen environment",
    skillsRequired: ["Food Prep", "Teamwork", "Cleanliness"],
    languageRequirements: ["English"],
    licensesRequired: ["Food Handler License"],
    payRangeHourly: { min: 16, max: 18 },
    locationCityArea: "San Francisco, CA",
    schedule: {
      startDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      daysOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday"],
      timeBlocks: ["5pm-11pm"],
    },
    requireIntroVideo: false,
    requireBackgroundCheck: false,
    requireReferences: false,
    employerVerificationLevel: "basic",
    status: "open",
    employerId: "emp5",
    employerName: "Marina Restaurant Group",
    applicantCount: 15,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
  },
  {
    id: "6",
    title: "Landscaping - Residential Garden Work",
    category: "Landscaping / Lawn Care",
    description: "Lawn maintenance and garden design",
    skillsRequired: ["Landscaping", "Gardening", "Equipment Operation"],
    languageRequirements: ["English"],
    licensesRequired: [],
    payRangeHourly: { min: 18, max: 26 },
    locationCityArea: "Palo Alto, CA",
    schedule: {
      startDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
      daysOfWeek: ["Saturday", "Sunday"],
      timeBlocks: ["8am-12pm"],
    },
    requireIntroVideo: false,
    requireBackgroundCheck: true,
    requireReferences: false,
    employerVerificationLevel: "verified",
    status: "open",
    employerId: "emp6",
    employerName: "John D.",
    applicantCount: 7,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
];

const CATEGORY_GROUPS = [
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

const ALL_CATEGORIES = CATEGORY_GROUPS.flatMap((g) => g.subcategories);

const LOCATIONS = [
  "All Locations",
  "San Francisco, CA",
  "Oakland, CA",
  "Berkeley, CA",
  "San Jose, CA",
  "Palo Alto, CA",
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

const LICENSES = [
  "Driver's License",
  "Commercial Driver's License (CDL)",
  "Forklift License",
  "Electrical License",
  "Plumbing License",
  "HVAC License",
  "First Aid Certification",
  "CPR Certification",
  "Food Handler License",
  "OSHA Certification",
  "Commercial License",
];

export default function FindWork() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [minPay, setMinPay] = useState(0);
  const [maxPay, setMaxPay] = useState(50);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [selectedJobForMessage, setSelectedJobForMessage] = useState<JobPost | null>(null);

  const handleApplyNow = (job: JobPost) => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    setSelectedJob(job);
    setApplicationModalOpen(true);
  };

  const handleMessage = (job: JobPost) => {
    if (!user) {
      navigate("/sign-in");
      return;
    }
    setSelectedJobForMessage(job);
    setMessageModalOpen(true);
  };

  // Filter jobs based on all criteria
  const filteredJobs = useMemo(() => {
    return demoJobs.filter((job) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skillsRequired.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      // Category filter
      const matchesCategory =
        selectedCategory === "All Categories" ||
        job.category === selectedCategory ||
        (selectedCategory !== "All Categories" &&
          job.category === selectedCategory);

      // Location filter
      const matchesLocation =
        selectedLocation === "All Locations" ||
        job.locationCityArea === selectedLocation;

      // Pay range filter
      const matchesPay =
        job.payRangeHourly.min >= minPay && job.payRangeHourly.max <= maxPay;

      // Language filter
      const matchesLanguage =
        selectedLanguages.length === 0 ||
        selectedLanguages.some((lang) =>
          job.languageRequirements.includes(lang),
        );

      // License filter
      const matchesLicense =
        selectedLicenses.length === 0 ||
        selectedLicenses.some((license) =>
          (job.licensesRequired || []).includes(license),
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesPay &&
        matchesLanguage &&
        matchesLicense
      );
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedLocation,
    minPay,
    maxPay,
    selectedLanguages,
    selectedLicenses,
  ]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedLocation("All Locations");
    setMinPay(0);
    setMaxPay(50);
    setSelectedLanguages([]);
    setSelectedLicenses([]);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[#FAFAFA] border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 mb-4">
            <h1 className="text-3xl font-bold text-slate-900">Find Work</h1>
            <ReadAloudButton
              text={`Find Work. Browse ${demoJobs.length} verified job opportunities from trusted employers`}
              size="lg"
            />
          </div>
          <p className="text-slate-600">
            Browse {demoJobs.length} verified job opportunities from trusted
            employers
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white sticky top-16 z-30 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Bar */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search jobs by title, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Toggle and Reset */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
            >
              <Filter className="h-4 w-4" />
              Filters{" "}
              {filteredJobs.length !== demoJobs.length &&
                `(${demoJobs.length - filteredJobs.length} hidden)`}
            </button>
            {(searchQuery ||
              selectedCategory !== "All Categories" ||
              selectedLocation !== "All Locations" ||
              minPay > 0 ||
              maxPay < 50 ||
              selectedLanguages.length > 0 ||
              selectedLicenses.length > 0) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            )}
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              {/* Main Filters Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A]"
                  >
                    <option value="All Categories">All Categories</option>
                    {CATEGORY_GROUPS.map((group) => (
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

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#24405A]"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Min Pay Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Min Pay: ${minPay}/hr
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={minPay}
                    onChange={(e) => setMinPay(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Max Pay Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Max Pay: ${maxPay}/hr
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={maxPay}
                    onChange={(e) => setMaxPay(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Language and License Filters Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Language Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Languages
                  </label>
                  <div className="border border-slate-200 rounded-md p-3 max-h-48 overflow-y-auto">
                    {LANGUAGES.map((language) => (
                      <label
                        key={language}
                        className="flex items-center gap-2 cursor-pointer mb-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLanguages.includes(language)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLanguages([
                                ...selectedLanguages,
                                language,
                              ]);
                            } else {
                              setSelectedLanguages(
                                selectedLanguages.filter((l) => l !== language),
                              );
                            }
                          }}
                          className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A]"
                        />
                        <span className="text-sm text-slate-700">
                          {language}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* License Filter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Licenses Required
                  </label>
                  <div className="border border-slate-200 rounded-md p-3 max-h-48 overflow-y-auto">
                    {LICENSES.map((license) => (
                      <label
                        key={license}
                        className="flex items-center gap-2 cursor-pointer mb-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLicenses.includes(license)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLicenses([
                                ...selectedLicenses,
                                license,
                              ]);
                            } else {
                              setSelectedLicenses(
                                selectedLicenses.filter((l) => l !== license),
                              );
                            }
                          }}
                          className="w-4 h-4 border-slate-300 rounded focus:ring-[#24405A]"
                        />
                        <span className="text-sm text-slate-700">
                          {license}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Job Listings */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">
                No jobs match your search criteria.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center rounded-md bg-[#24405A] px-4 py-2 text-white font-medium hover:opacity-95 transition-all"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <h3 className="font-semibold text-slate-900 text-lg line-clamp-2">
                            {job.title}
                          </h3>
                          <ReadAloudButton
                            text={`${job.title}. ${job.description}`}
                            size="md"
                          />
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          {job.employerName}
                        </p>
                      </div>
                      {job.employerVerificationLevel === "verified" && (
                        <div className="text-sm font-medium text-[#3BA55C] bg-[#3BA55C]/10 px-2 py-1 rounded">
                          ✓ Verified
                        </div>
                      )}
                    </div>

                    {/* Category */}
                    <span className="inline-block px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded mt-2">
                      {job.category}
                    </span>
                  </div>

                  {/* Location & Pay */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{job.locationCityArea}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                      <DollarSign className="w-4 h-4" />
                      <span>
                        ${job.payRangeHourly.min} - ${job.payRangeHourly.max}/hr
                      </span>
                    </div>
                  </div>

                  {/* Skills & Languages & Licenses */}
                  <div className="mb-4 pb-4 border-t border-slate-200">
                    {/* Skills */}
                    <div className="mb-3">
                      <p className="text-xs font-medium text-slate-600 mb-1">
                        Skills
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {job.skillsRequired.slice(0, 2).map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skillsRequired.length > 2 && (
                          <span className="text-xs text-slate-600 px-2 py-1">
                            +{job.skillsRequired.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Languages */}
                    {job.languageRequirements.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-medium text-slate-600 mb-1">
                          Languages
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {job.languageRequirements.map((lang, i) => (
                            <span
                              key={i}
                              className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Licenses */}
                    {job.licensesRequired &&
                      job.licensesRequired.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-slate-600 mb-1">
                            Licenses
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {job.licensesRequired.map((license, i) => (
                              <span
                                key={i}
                                className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded"
                              >
                                {license}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4 text-xs text-slate-600">
                    {job.requireIntroVideo && (
                      <span className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3BA55C]" />
                        Video
                      </span>
                    )}
                    {job.requireBackgroundCheck && (
                      <span className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3BA55C]" />
                        Background check
                      </span>
                    )}
                    {job.requireReferences && (
                      <span className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#3BA55C]" />
                        References
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-slate-200">
                    <button
                      onClick={() => handleApplyNow(job)}
                      className="flex-1 px-4 py-2 rounded-md bg-[#24405A] text-white text-sm font-medium hover:opacity-95 transition-all"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => handleMessage(job)}
                      className="flex-1 px-4 py-2 rounded-md bg-slate-100 text-slate-900 text-sm font-medium hover:bg-slate-200 transition-all"
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredJobs.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-slate-600">
                Showing {filteredJobs.length} of {demoJobs.length} jobs
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <ApplicationModal
          job={selectedJob}
          isOpen={applicationModalOpen}
          onClose={() => {
            setApplicationModalOpen(false);
            setSelectedJob(null);
          }}
          onSubmit={() => {
            toast({
              title: "Success!",
              description: "Application submitted successfully",
            });
          }}
        />
      )}

      {/* Message Modal */}
      {selectedJobForMessage && (
        <MessageModal
          isOpen={messageModalOpen}
          onClose={() => {
            setMessageModalOpen(false);
            setSelectedJobForMessage(null);
          }}
          job={selectedJobForMessage}
          onMessageSent={() => {
            toast({
              title: "Message sent!",
              description: `Your message to ${selectedJobForMessage.employerName} has been sent.`,
            });
            navigate("/messages");
          }}
        />
      )}
    </Layout>
  );
}
