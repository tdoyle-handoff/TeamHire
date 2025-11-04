import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Filter, X, ChevronDown } from "lucide-react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { ReadAloudButton } from "@/components/ReadAloudButton";
import { useToast } from "@/hooks/use-toast";

interface Worker {
  id: string;
  displayName: string;
  bio?: string;
  location: string;
  hourlyRate?: number;
  rating?: number;
  reviewCount?: number;
  skills: string[];
  languages: string[];
  verified: boolean;
  experience?: string;
}

const demoWorkers: Worker[] = [
  {
    id: "1",
    displayName: "Maria G.",
    bio: "Professional house cleaner with 8 years of experience",
    location: "San Francisco, CA",
    hourlyRate: 20,
    rating: 4.9,
    reviewCount: 127,
    skills: ["House Cleaning", "Detail Oriented", "COVID Safe"],
    languages: ["Spanish", "English"],
    verified: true,
    experience: "8 years",
  },
  {
    id: "2",
    displayName: "James K.",
    bio: "Reliable driver with CDL license and excellent safety record",
    location: "Oakland, CA",
    hourlyRate: 18,
    rating: 4.8,
    reviewCount: 95,
    skills: ["Driving", "Vehicle Maintenance", "Customer Service"],
    languages: ["English"],
    verified: true,
    experience: "5 years",
  },
  {
    id: "3",
    displayName: "Rosa M.",
    bio: "Experienced nanny and childcare provider",
    location: "San Jose, CA",
    hourlyRate: 22,
    rating: 4.95,
    reviewCount: 203,
    skills: ["Childcare", "First Aid Certified", "Bilingual"],
    languages: ["Spanish", "English"],
    verified: true,
    experience: "10 years",
  },
  {
    id: "4",
    displayName: "David L.",
    bio: "Skilled handyman for home repairs and maintenance",
    location: "Berkeley, CA",
    hourlyRate: 25,
    rating: 4.7,
    reviewCount: 84,
    skills: ["Carpentry", "Plumbing", "Electrical Basics"],
    languages: ["English"],
    verified: true,
    experience: "12 years",
  },
  {
    id: "5",
    displayName: "Amara T.",
    bio: "Event coordinator and setup specialist",
    location: "San Francisco, CA",
    hourlyRate: 19,
    rating: 4.85,
    reviewCount: 112,
    skills: ["Event Setup", "Organization", "Team Coordination"],
    languages: ["English", "French"],
    verified: true,
    experience: "6 years",
  },
  {
    id: "6",
    displayName: "Chen W.",
    bio: "Professional landscaper and grounds maintenance",
    location: "Palo Alto, CA",
    hourlyRate: 21,
    rating: 4.75,
    reviewCount: 156,
    skills: ["Landscaping", "Lawn Care", "Equipment Operation"],
    languages: ["Mandarin", "English"],
    verified: true,
    experience: "9 years",
  },
];

export default function HireWorkers() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const locations = [
    "All Locations",
    ...new Set(demoWorkers.map((w) => w.location)),
  ];
  const allSkills = [...new Set(demoWorkers.flatMap((w) => w.skills))].sort();

  const filteredWorkers = useMemo(() => {
    return demoWorkers.filter((worker) => {
      const matchesSearch =
        worker.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.skills.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesLocation =
        selectedLocation === "All Locations" ||
        worker.location === selectedLocation;

      const matchesSkills =
        selectedSkills.length === 0 ||
        selectedSkills.some((skill) => worker.skills.includes(skill));

      const matchesRating = (worker.rating || 0) >= minRating;

      return matchesSearch && matchesLocation && matchesSkills && matchesRating;
    });
  }, [searchQuery, selectedLocation, selectedSkills, minRating]);

  const toggleSkillFilter = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedLocation("All Locations");
    setSelectedSkills([]);
    setMinRating(0);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Browse Verified Workers
            </h1>
            <p className="text-lg text-slate-600">
              Find and hire skilled, verified professionals for your projects.
              Browse profiles, check ratings, and message top candidates.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search workers by name, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-6 bg-white border border-slate-200 rounded-lg space-y-6">
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24405A]"
                >
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Skills Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Skills
                </label>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => toggleSkillFilter(skill)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        selectedSkills.includes(skill)
                          ? "bg-[#24405A] text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">
                  Minimum Rating: {minRating}+ stars
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={minRating}
                  onChange={(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Worker Cards Grid */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {filteredWorkers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">
                No workers match your criteria.
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
              {filteredWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <h3 className="font-semibold text-slate-900 text-lg">
                            {worker.displayName}
                          </h3>
                          <ReadAloudButton
                            text={`${worker.displayName}. ${worker.bio}`}
                            size="md"
                          />
                        </div>
                        <p className="text-sm text-slate-600 mt-1">
                          {worker.experience} of experience
                        </p>
                      </div>
                      {worker.verified && (
                        <div className="text-sm font-medium text-[#3BA55C] bg-[#3BA55C]/10 px-2 py-1 rounded">
                          ✓ Verified
                        </div>
                      )}
                    </div>

                    {/* Bio */}
                    {worker.bio && (
                      <p className="text-sm text-slate-600 mt-2">
                        {worker.bio}
                      </p>
                    )}
                  </div>

                  {/* Location & Rating */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span>{worker.location}</span>
                    </div>
                    {worker.rating && (
                      <div className="flex items-center gap-2 text-sm">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.round(worker.rating!)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-medium text-slate-900">
                          {worker.rating}
                        </span>
                        <span className="text-slate-500">
                          ({worker.reviewCount} reviews)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Skills */}
                  <div className="mb-4 pb-4 border-t border-slate-200">
                    <p className="text-xs font-medium text-slate-600 mb-2">
                      Skills
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {worker.skills.slice(0, 3).map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {worker.skills.length > 3 && (
                        <span className="text-xs text-slate-600 px-2 py-1">
                          +{worker.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  {worker.languages.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-slate-600 mb-2">
                        Languages
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {worker.languages.map((lang, i) => (
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

                  {/* Hourly Rate */}
                  {worker.hourlyRate && (
                    <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm font-medium text-slate-900">
                        ${worker.hourlyRate}/hr
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-slate-200">
                    <button
                      onClick={() => {
                        if (!user) {
                          window.location.href = "/sign-in";
                          return;
                        }
                        toast({
                          title: "Coming Soon",
                          description: "View profile feature coming soon",
                        });
                      }}
                      className="flex-1 px-4 py-2 rounded-md bg-slate-100 text-slate-900 text-sm font-medium hover:bg-slate-200 transition-all"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        if (!user) {
                          window.location.href = "/sign-in";
                          return;
                        }
                        toast({
                          title: "Coming Soon",
                          description: "Messaging feature coming soon",
                        });
                      }}
                      className="flex-1 px-4 py-2 rounded-md bg-[#24405A] text-white text-sm font-medium hover:opacity-95 transition-all"
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredWorkers.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-slate-600">
                Showing {filteredWorkers.length} of {demoWorkers.length} workers
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
