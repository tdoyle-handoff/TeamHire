import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { JobListingCard } from "@/components/JobListingCard";
import { VerificationBadge } from "@/components/VerificationBadge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Briefcase, Users, TrendingUp, Heart, Key } from "lucide-react";

export default function Home() {
  const [mode, setMode] = useState<"find" | "post">("find");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSearchJobs = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(
      `/find-work${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""}`,
    );
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/post-job", { state: { jobTitle, jobLocation } });
  };

  return (
    <Layout>
      {/* Search & Quick Action */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Find Work or Hire Talent
            </h2>
            <p className="text-slate-600">
              Search for jobs by title or skill, or post your opportunity
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setMode("find")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                mode === "find"
                  ? "bg-[#24405A] text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              Find Work
            </button>
            <button
              onClick={() => setMode("post")}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                mode === "post"
                  ? "bg-[#3BA55C] text-white"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              Post a Job
            </button>
          </div>

          {/* Search/Post Forms */}
          <div className="max-w-2xl">
            {mode === "find" ? (
              <form onSubmit={handleSearchJobs} className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search jobs by title or skills... (e.g., cleaning, construction, kitchen)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#24405A]"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#24405A] text-white font-medium rounded-md hover:opacity-95 transition-all"
                  >
                    Search Jobs
                  </button>
                  <Link
                    to="/find-work"
                    className="flex-1 px-6 py-3 bg-slate-200 text-slate-900 font-medium rounded-md hover:bg-slate-300 transition-all text-center"
                  >
                    Browse All
                  </Link>
                </div>
              </form>
            ) : (
              <form onSubmit={handlePostJob} className="space-y-3">
                <input
                  type="text"
                  placeholder="Job title (e.g., House Cleaning, General Labor)"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#3BA55C]"
                />
                <input
                  type="text"
                  placeholder="Location (e.g., San Francisco, CA)"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#3BA55C]"
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-[#3BA55C] text-white font-medium rounded-md hover:opacity-95 transition-all"
                  >
                    Post Job
                  </button>
                  <Link
                    to="/post-job"
                    className="flex-1 px-6 py-3 bg-slate-200 text-slate-900 font-medium rounded-md hover:bg-slate-300 transition-all text-center"
                  >
                    Full Form
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              {t("categories.title")}
            </h2>
            <p className="text-lg text-slate-600">{t("categories.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skilled Trades */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-lg">
                  🔧
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Skilled Trades
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Build, fix, and create with hands-on expertise
                  </p>
                </div>
              </div>
              <ul className="space-y-1 mb-4 text-sm text-slate-600">
                <li>• Carpentry</li>
                <li>• Electrical</li>
                <li>• Plumbing</li>
              </ul>
              <Link
                to="/find-work"
                className="text-xs font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                View all jobs →
              </Link>
            </div>

            {/* Home & Property */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-lg">
                  🏠
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Home & Property
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Maintain and improve homes and outdoor spaces
                  </p>
                </div>
              </div>
              <ul className="space-y-1 mb-4 text-sm text-slate-600">
                <li>• Residential Cleaning</li>
                <li>• Handyman</li>
                <li>• Home Health Aide</li>
              </ul>
              <Link
                to="/find-work"
                className="text-xs font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                View all jobs →
              </Link>
            </div>

            {/* Hospitality & Food */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-lg">
                  🍽️
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Hospitality & Food
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Support kitchens, guests, and event experiences
                  </p>
                </div>
              </div>
              <ul className="space-y-1 mb-4 text-sm text-slate-600">
                <li>• Line Cook / Prep Cook</li>
                <li>• Server / Waitstaff</li>
                <li>• Housekeeping</li>
              </ul>
              <Link
                to="/find-work"
                className="text-xs font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                View all jobs →
              </Link>
            </div>

            {/* Caregiving & Personal Support */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center text-lg">
                  ❤️
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Caregiving & Personal Support
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Assist children, seniors, and individuals in need
                  </p>
                </div>
              </div>
              <ul className="space-y-1 mb-4 text-sm text-slate-600">
                <li>• Childcare / Nanny</li>
                <li>• Elder Care</li>
                <li>• Home Companion</li>
              </ul>
              <Link
                to="/find-work"
                className="text-xs font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                View all jobs →
              </Link>
            </div>

            {/* Facilities & Maintenance */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center text-lg">
                  🔑
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Facilities & Maintenance
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Keep buildings and environments safe and functional
                  </p>
                </div>
              </div>
              <ul className="space-y-1 mb-4 text-sm text-slate-600">
                <li>• Janitorial</li>
                <li>• Security Guard</li>
                <li>• Building Maintenance</li>
              </ul>
              <Link
                to="/find-work"
                className="text-xs font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                View all jobs →
              </Link>
            </div>

            {/* Retail & Customer Service */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-lg">
                  💳
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Retail & Customer Service
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Engage with customers and support retail operations
                  </p>
                </div>
              </div>
              <ul className="space-y-1 mb-4 text-sm text-slate-600">
                <li>• Cashier</li>
                <li>• Sales Associate</li>
                <li>• Customer Service</li>
              </ul>
              <Link
                to="/find-work"
                className="text-xs font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                View all jobs →
              </Link>
            </div>

            {/* Construction */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-lg">
                  🏗️
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Construction
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Work on building, infrastructure, and repair projects
                  </p>
                </div>
              </div>
              <ul className="space-y-1 mb-4 text-sm text-slate-600">
                <li>• General Labor</li>
                <li>• Equipment Operator</li>
                <li>• Site Cleanup</li>
              </ul>
              <Link
                to="/find-work"
                className="text-xs font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                View all jobs →
              </Link>
            </div>

            {/* Beauty & Wellness */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-lg">
                  💇
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Beauty & Wellness
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Provide services for personal care and grooming
                  </p>
                </div>
              </div>
              <ul className="space-y-1 mb-4 text-sm text-slate-600">
                <li>• Hairstylist</li>
                <li>• Barber</li>
                <li>• Massage Therapist</li>
              </ul>
              <Link
                to="/find-work"
                className="text-xs font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                View all jobs →
              </Link>
            </div>

            {/* Creative & Media */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-lg">
                  🎨
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Creative & Media
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Contribute to visual, written, and digital projects
                  </p>
                </div>
              </div>
              <ul className="space-y-1 mb-4 text-sm text-slate-600">
                <li>• Photographer</li>
                <li>• Graphic Designer</li>
                <li>• Video Editor</li>
              </ul>
              <Link
                to="/find-work"
                className="text-xs font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                View all jobs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust, Safety & Transparency */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              {t("safety.title")}
            </h2>
            <p className="text-lg text-slate-600">{t("safety.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Verified Ecosystem */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">✅</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">
                    Verified Employers & Workers
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">
                    {t("safety.verified")}
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Employers verified by business license</li>
                    <li>• Optional worker background checks</li>
                    <li>• Rating system for ongoing verification</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🛡️</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-lg mb-3">
                    Verification Levels
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <VerificationBadge level={1} showLabel={true} />
                    </div>
                    <div className="flex items-center gap-2">
                      <VerificationBadge level={2} showLabel={true} />
                    </div>
                    <div className="flex items-center gap-2">
                      <VerificationBadge level={3} showLabel={true} />
                    </div>
                    <div className="flex items-center gap-2">
                      <VerificationBadge level={4} showLabel={true} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fair Wages & Transparency */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">💰</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">
                    Fair Wages & Clear Terms
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">
                    {t("safety.fairWages")}
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Pay, hours, and location disclosed upfront</li>
                    <li>• No hidden fees or surprise costs</li>
                    <li>• Fair Hiring Pledge on every listing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Privacy & Safety */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">🔒</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">
                    Privacy by Default
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">
                    Last name and address optional until hire
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• First name only until accepted</li>
                    <li>• Optional anonymity for sensitive situations</li>
                    <li>• Moderated messaging system</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Worker Ratings */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">⭐</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">
                    Worker Reputation System
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">
                    Build your professional reputation
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• 5-star rating system for reliability</li>
                    <li>• Skills verification portfolio</li>
                    <li>• Video intro instead of resume</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Employer Ratings */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">📊</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-lg mb-2">
                    Employer Accountability
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">
                    {t("safety.ratings")}
                  </p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>• Ratings for safety and communication</li>
                    <li>• Fair Hiring Pledge certification</li>
                    <li>• Review history visibility</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Essential Jobs, Dignified Opportunities
            </h2>
            <p className="text-lg text-slate-600">
              Browse verified jobs with transparent pay, fair employers, and
              worker protections.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <JobListingCard
              id="1"
              title="Residential Cleaner – 2 Days/Week"
              employer="GreenClean Services"
              location="Upper Manhattan, NY"
              payMin={20}
              payMax={25}
              schedule="Flexible Days"
              verificationLevel={1}
              languages={["English", "Spanish"]}
              idRequired={false}
            />

            <JobListingCard
              id="2"
              title="General Laborer – Construction Site"
              employer="BuildRight Construction"
              location="Brooklyn, NY"
              payMin={22}
              payMax={28}
              schedule="Full-Time"
              verificationLevel={2}
              languages={["English", "Spanish", "Creole"]}
              idRequired={false}
            />

            <JobListingCard
              id="3"
              title="Kitchen Prep Cook – Evening Shift"
              employer="Fresh Bowl Restaurant"
              location="Midtown, Manhattan"
              payMin={18}
              payMax={22}
              schedule="Evening, Part-Time"
              verificationLevel={1}
              languages={["English", "Spanish"]}
              idRequired={false}
            />
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/find-work"
              className="inline-flex items-center justify-center rounded-md bg-[#24405A] px-6 py-3 text-white font-medium hover:opacity-95 transition-all"
            >
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            Work with dignity. Hire with trust.
          </h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/post-job"
              className="inline-flex items-center justify-center rounded-md bg-[#3BA55C] px-5 py-3 text-white font-medium hover:opacity-95 transition-all"
            >
              {t("cta.postJob")}
            </Link>
            <Link
              to="/find-work"
              className="inline-flex items-center justify-center rounded-md bg-[#24405A] px-5 py-3 text-white font-medium hover:opacity-95 transition-all"
            >
              {t("cta.findWork")}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
