import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  DollarSign,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { JobPost } from "@shared/types";

// Demo jobs data
const demoJobs: JobPost[] = [
  {
    id: "1",
    title: "House Cleaning - 3 Bedroom Home",
    category: "Residential Cleaning",
    description: "Looking for reliable cleaner for recurring weekly service",
    skillsRequired: ["House Cleaning", "Detail Oriented"],
    languageRequirements: ["English"],
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
    category: "Caregiving",
    description: "Companionship and light assistance",
    skillsRequired: ["Compassion", "Patience", "Communication"],
    languageRequirements: ["English", "Spanish"],
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
    category: "Hospitality",
    description: "Fast-paced restaurant kitchen environment",
    skillsRequired: ["Food Prep", "Teamwork", "Cleanliness"],
    languageRequirements: ["English"],
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
    category: "General Labor",
    description: "Lawn maintenance and garden design",
    skillsRequired: ["Landscaping", "Gardening", "Equipment Operation"],
    languageRequirements: ["English"],
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
];

const ALL_CATEGORIES = CATEGORY_GROUPS.flatMap((g) => g.subcategories);

const LOCATIONS = ["All Locations", "San Francisco, CA", "Oakland, CA", "Berkeley, CA", "San Jose, CA", "Palo Alto, CA"];

export default function FindWork() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [minPay, setMinPay] = useState(0);
  const [maxPay, setMaxPay] = useState(50);
  const [showFilters, setShowFilters] = useState(false);

  // Filter jobs based on all criteria
  const filteredJobs = useMemo(() => {
    return demoJobs.filter((job) => {
      // Search query filter
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skillsRequired.some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Category filter
      const matchesCategory =
        selectedCategory === "All Categories" ||
        job.category === selectedCategory ||
        (selectedCategory !== "All Categories" && job.category === selectedCategory);

      // Location filter
      const matchesLocation =
        selectedLocation === "All Locations" ||
        job.locationCityArea === selectedLocation;

      // Pay range filter
      const matchesPay =
        job.payRangeHourly.min >= minPay && job.payRangeHourly.max <= maxPay;

      return matchesSearch && matchesCategory && matchesLocation && matchesPay;
    });
  }, [searchQuery, selectedCategory, selectedLocation, minPay, maxPay]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedLocation("All Locations");
    setMinPay(0);
    setMaxPay(50);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[#FAFAFA] border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Find Work</h1>
          <p className="text-slate-600">
            Browse {demoJobs.length} verified job opportunities from trusted employers
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
              Filters {filteredJobs.length !== demoJobs.length && `(${demoJobs.length - filteredJobs.length} hidden)`}
            </button>
            {(searchQuery || selectedCategory !== "All Categories" || selectedLocation !== "All Locations" || minPay > 0 || maxPay < 50) && (
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
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
                      <div>
                        <h3 className="font-semibold text-slate-900 text-lg line-clamp-2">
                          {job.title}
                        </h3>
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

                  {/* Skills */}
                  <div className="mb-4 pb-4 border-t border-slate-200">
                    <div className="flex flex-wrap gap-2 mt-3">
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
                    <button className="flex-1 px-4 py-2 rounded-md bg-[#24405A] text-white text-sm font-medium hover:opacity-95 transition-all">
                      Apply Now
                    </button>
                    <button className="flex-1 px-4 py-2 rounded-md bg-slate-100 text-slate-900 text-sm font-medium hover:bg-slate-200 transition-all">
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
    </Layout>
  );
}
