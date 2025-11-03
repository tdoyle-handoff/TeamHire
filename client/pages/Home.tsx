import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Briefcase,
  Clock,
  Shield,
  Video,
  MapPin,
  DollarSign,
  CheckCircle,
  Star,
  Zap,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { JobCard } from "@/components/JobCard";
import { WorkerCard } from "@/components/WorkerCard";
import { TrustBadge } from "@/components/TrustBadge";
import { AnimatedStatCard } from "@/components/AnimatedStatCard";
import { ScrollCue } from "@/components/ScrollCue";
import { Testimonial } from "@/components/Testimonial";
import { WorkerProfile, JobPost } from "@shared/types";

// Demo data
const demoJobs: JobPost[] = [
  {
    id: "1",
    title: "House Cleaning - 3 Bedroom Home",
    category: "Cleaning",
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
    category: "General Labor",
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
    category: "Handyman",
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

const demoWorkers: WorkerProfile[] = [
  {
    id: "w1",
    firstName: "Maria",
    lastName: "Garcia",
    alias: "Maria G.",
    cityArea: "San Francisco, CA",
    skills: ["House Cleaning", "Organization", "Detail Oriented"],
    languages: ["English", "Spanish"],
    experienceYears: 8,
    availability: {
      daysOfWeek: ["Monday", "Wednesday", "Friday"],
      timeBlocks: ["9am-5pm"],
    },
    payExpectationHourly: { min: 18, max: 22 },
    backgroundCheckStatus: "complete",
    references: [
      { type: "text", value: "Previous employer - Excellent references" },
    ],
    reliabilityScore: 95,
    profileVisibility: "publicMinimal",
    avatar: undefined,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: "w2",
    firstName: "James",
    lastName: "Wilson",
    alias: "James W.",
    cityArea: "Oakland, CA",
    skills: ["Heavy Lifting", "Equipment Operation", "Teamwork"],
    languages: ["English"],
    experienceYears: 12,
    availability: {
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      timeBlocks: ["6am-3pm"],
    },
    payExpectationHourly: { min: 16, max: 20 },
    backgroundCheckStatus: "complete",
    references: [
      { type: "text", value: "Construction supervisor - Top performer" },
    ],
    reliabilityScore: 92,
    profileVisibility: "publicMinimal",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  },
  {
    id: "w3",
    firstName: "Sofia",
    lastName: "Martinez",
    alias: "Sofia M.",
    cityArea: "San Jose, CA",
    skills: ["Caregiving", "Compassion", "Communication", "Cooking"],
    languages: ["English", "Spanish", "Portuguese"],
    experienceYears: 6,
    availability: {
      daysOfWeek: ["Daily"],
      timeBlocks: ["Flexible"],
    },
    payExpectationHourly: { min: 20, max: 28 },
    backgroundCheckStatus: "complete",
    references: [
      { type: "text", value: "Care agency - Excellent with elderly clients" },
    ],
    reliabilityScore: 98,
    profileVisibility: "publicMinimal",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
  },
  {
    id: "w4",
    firstName: "David",
    lastName: "Chen",
    alias: "David C.",
    cityArea: "Berkeley, CA",
    skills: ["Carpentry", "Plumbing", "Electrical", "General Repair"],
    languages: ["English", "Mandarin"],
    experienceYears: 15,
    availability: {
      daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      timeBlocks: ["8am-6pm"],
    },
    payExpectationHourly: { min: 30, max: 40 },
    backgroundCheckStatus: "complete",
    references: [
      { type: "text", value: "Home improvement contractor - Highly skilled" },
    ],
    reliabilityScore: 96,
    profileVisibility: "publicMinimal",
    introVideoUrl: "https://example.com/video1",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
  },
  {
    id: "w5",
    firstName: "Jennifer",
    lastName: "Lee",
    alias: "Jennifer L.",
    cityArea: "San Francisco, CA",
    skills: ["Kitchen Management", "Food Prep", "Teamwork", "Customer Service"],
    languages: ["English"],
    experienceYears: 4,
    availability: {
      daysOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      timeBlocks: ["4pm-11pm"],
    },
    payExpectationHourly: { min: 16, max: 18 },
    backgroundCheckStatus: "in_progress",
    references: [
      { type: "text", value: "Restaurant manager - Quick learner, reliable" },
    ],
    reliabilityScore: 88,
    profileVisibility: "publicMinimal",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
  },
  {
    id: "w6",
    firstName: "Carlos",
    lastName: "Rodriguez",
    alias: "Carlos R.",
    cityArea: "Palo Alto, CA",
    skills: ["Landscaping", "Gardening", "Equipment Operation", "Design"],
    languages: ["English", "Spanish"],
    experienceYears: 10,
    availability: {
      daysOfWeek: ["Saturday", "Sunday"],
      timeBlocks: ["8am-5pm"],
    },
    payExpectationHourly: { min: 20, max: 28 },
    backgroundCheckStatus: "complete",
    references: [
      {
        type: "text",
        value: "Landscape company owner - Dedicated professional",
      },
    ],
    reliabilityScore: 94,
    profileVisibility: "publicMinimal",
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000),
  },
];

export default function Home() {
  const [showMoreJobs, setShowMoreJobs] = useState(false);
  const [showMoreWorkers, setShowMoreWorkers] = useState(false);

  const displayedJobs = showMoreJobs ? demoJobs : demoJobs.slice(0, 3);
  const displayedWorkers = showMoreWorkers
    ? demoWorkers
    : demoWorkers.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-white to-secondary/5 py-16 md:py-28 overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-96 h-96 bg-natural-green rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-5 w-80 h-80 bg-muted-blue rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
              Work with dignity.{" "}
              <span className="text-natural-green">Hire with trust.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground font-medium mb-4">
              Connecting real people to real jobs — safely, fairly, and transparently.
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              Real people. Real skills. Safer matches. TeamHire replaces sketchy
              experiences with safety, respect, and transparency.
            </p>

            {/* Dual CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/find-work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-muted-blue text-white font-semibold rounded-xl hover:bg-muted-blue/90 hover:scale-105 transition-all shadow-lg hover:shadow-2xl"
              >
                <Briefcase className="w-5 h-5" />
                Find Work
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/hire-workers"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-natural-green text-white font-semibold rounded-xl hover:bg-natural-green/90 hover:scale-105 transition-all shadow-lg hover:shadow-2xl"
              >
                <Users className="w-5 h-5" />
                Hire Workers
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-6">
            <AnimatedStatCard number="2847" label="Workers" />
            <AnimatedStatCard number="1234" label="Jobs Posted" />
            <AnimatedStatCard number="94" label="Hire Rate %" />
            <AnimatedStatCard number="480" label="Avg Rating (÷100)" />
          </div>

          {/* Stats tagline */}
          <p className="text-center text-sm text-muted-foreground mb-8">
            Backed by verification, fairness, and community ratings.
          </p>

          {/* Scroll Cue */}
          <ScrollCue label="Learn how it works" />
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* How It Works */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent process designed to protect both workers and
              employers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Worker Flow */}
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">
                Create Your Profile
              </h3>
              <p className="text-muted-foreground text-sm">
                Share your skills and experience. Last name and address are
                optional—you control your privacy.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-natural-green/10 rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-natural-green" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">
                Apply to Jobs
              </h3>
              <p className="text-muted-foreground text-sm">
                Browse verified jobs and apply directly. Connect with employers
                who respect your time.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-warm-neutral/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-warm-neutral" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">
                Get Hired & Earn
              </h3>
              <p className="text-muted-foreground text-sm">
                Secure the job. After completion, both parties can leave ratings
                and reviews.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
            {/* Employer Flow */}
            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">
                Post a Job
              </h3>
              <p className="text-muted-foreground text-sm">
                Describe your needs. Request intro videos, background checks, or
                references.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-natural-green/10 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-natural-green" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">
                Vet Candidates
              </h3>
              <p className="text-muted-foreground text-sm">
                Review verified profiles, ratings, and communications. You're in
                control.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-warm-neutral/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-warm-neutral" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2">
                Hire with Confidence
              </h3>
              <p className="text-muted-foreground text-sm">
                Build relationships with reliable workers and watch your team
                grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built on Trust
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've designed every feature to protect your safety and privacy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <TrustBadge
              icon="verified"
              title="Verified Profiles"
              description="Optional background checks and video introductions build confidence on both sides."
            />
            <TrustBadge
              icon="privacy"
              title="Your Privacy Matters"
              description="Last name and address are optional. Share only what you choose with verified matches."
            />
            <TrustBadge
              icon="secure"
              title="Secure Platform"
              description="In-app messaging keeps personal contact private until you're both comfortable."
            />
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Why TeamHire is Different
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-natural-green flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">No exploitation.</strong>{" "}
                  Transparent pricing and fair terms.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-natural-green flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">Your control.</strong>{" "}
                  Optional data fields mean you decide what's shared.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-natural-green flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">
                    Real accountability.
                  </strong>{" "}
                  Verified reviews post-completion.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle className="w-5 h-5 text-natural-green flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-foreground">
                    Safe communication.
                  </strong>{" "}
                  In-app messaging with identity verification.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Jobs Hiring Now
              </h2>
              <p className="text-muted-foreground">
                Browse verified opportunities across the Bay Area
              </p>
            </div>
            <Link
              to="/jobs"
              className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={() => console.log("Apply clicked for job:", job.id)}
                onMessage={() =>
                  console.log("Message clicked for job:", job.id)
                }
              />
            ))}
          </div>

          {!showMoreJobs && demoJobs.length > 3 && (
            <div className="text-center">
              <button
                onClick={() => setShowMoreJobs(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-all"
              >
                Load More Jobs
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Workers */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Trusted Workers
              </h2>
              <p className="text-muted-foreground">
                Verified professionals ready to help with your project
              </p>
            </div>
            <Link
              to="/workers"
              className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {displayedWorkers.map((worker) => (
              <WorkerCard
                key={worker.id}
                worker={worker}
                onContact={() =>
                  console.log("Contact clicked for worker:", worker.id)
                }
                onViewProfile={() =>
                  console.log("View profile clicked for worker:", worker.id)
                }
              />
            ))}
          </div>

          {!showMoreWorkers && demoWorkers.length > 3 && (
            <div className="text-center">
              <button
                onClick={() => setShowMoreWorkers(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-all"
              >
                Load More Workers
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Real Stories. Real Results.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Workers and employers share their TeamHire experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            <Testimonial
              quote="TeamHire gave me respect and fair pay. No more sketchy conversations—everything was clear from the start."
              author="Maria G."
              role="House Cleaner • San Francisco"
              rating={5}
            />
            <Testimonial
              quote="I found reliable workers on my first try. The verification badges gave me peace of mind hiring."
              author="Sarah M."
              role="Homeowner • San Francisco"
              rating={5}
            />
            <Testimonial
              quote="The process is transparent and safe. I love that I can communicate with employers without giving out my personal info."
              author="David C."
              role="Handyman • Berkeley"
              rating={5}
            />
          </div>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              Join 2,847+ workers and 1,200+ employers who've found safer work connections
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-natural-green to-natural-green/90">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of workers and employers building safer work connections.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/find-work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-natural-green font-semibold rounded-xl hover:bg-white/90 hover:scale-105 transition-all"
              >
                Find Work
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/hire-workers"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 hover:scale-105 transition-all border border-white/30"
              >
                Hire Workers
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
              <Zap className="w-4 h-4" />
              <span>Join thousands building safer work connections</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
