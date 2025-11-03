import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Search, Briefcase } from "lucide-react";

export default function Home() {
  const [mode, setMode] = useState<"find" | "post">("find");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const navigate = useNavigate();

  const handleSearchJobs = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/find-work${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""}`);
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/post-job", { state: { jobTitle, jobLocation } });
  };

  return (
    <Layout>

      {/* Hero */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Hire with confidence.{" "}
            <span className="text-[#3BA55C]">Work with respect.</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-slate-600">
            A safer marketplace for real jobs and real people. Verified profiles,
            clear expectations, fair hiring.
          </p>

          {/* Mode Toggle */}
          <div className="mt-8 flex justify-center gap-3 mb-6">
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
          <div className="mt-8 max-w-2xl mx-auto">
            {mode === "find" ? (
              <form onSubmit={handleSearchJobs} className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search jobs by title or skills..."
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
                  placeholder="Job title (e.g., House Cleaning)"
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

          {/* Trust bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#3BA55C]" />
              Verified employers
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#3BA55C]" />
              Optional background checks
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#3BA55C]" />
              Private by default
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Find work in your field
            </h2>
            <p className="text-lg text-slate-600">
              Browse opportunities across diverse industries and skill levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skilled Trades & Construction */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Skilled Trades & Construction
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-600">Carpentry</p>
                <p className="text-sm text-slate-600">Electrical</p>
                <p className="text-sm text-slate-600">Plumbing</p>
                <p className="text-sm text-slate-600">HVAC / Refrigeration</p>
                <p className="text-sm text-slate-600">Roofing / Framing</p>
                <p className="text-sm text-slate-600">Welding / Fabrication</p>
                <p className="text-sm text-slate-600">General Construction Labor</p>
                <p className="text-sm text-slate-600">+ 2 more</p>
              </div>
              <Link
                to="/find-work"
                className="inline-flex text-sm font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                Browse jobs →
              </Link>
            </div>

            {/* Home & Property Services */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Home & Property Services
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-600">Residential Cleaning</p>
                <p className="text-sm text-slate-600">Handyman / Maintenance</p>
                <p className="text-sm text-slate-600">Landscaping / Lawn Care</p>
                <p className="text-sm text-slate-600">Gardening / Tree Trimming</p>
                <p className="text-sm text-slate-600">Painting / Drywall</p>
                <p className="text-sm text-slate-600">Pool Maintenance</p>
                <p className="text-sm text-slate-600">Snow Removal</p>
                <p className="text-sm text-slate-600">+ 1 more</p>
              </div>
              <Link
                to="/find-work"
                className="inline-flex text-sm font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                Browse jobs →
              </Link>
            </div>

            {/* Hospitality & Food Service */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Hospitality & Food Service
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-600">Line Cook / Prep Cook</p>
                <p className="text-sm text-slate-600">Server / Waitstaff</p>
                <p className="text-sm text-slate-600">Bartender</p>
                <p className="text-sm text-slate-600">Dishwasher</p>
                <p className="text-sm text-slate-600">Host / Front Desk</p>
                <p className="text-sm text-slate-600">Housekeeping (Hotels, Airbnb)</p>
                <p className="text-sm text-slate-600">Catering & Events</p>
                <p className="text-sm text-slate-600">+ 1 more</p>
              </div>
              <Link
                to="/find-work"
                className="inline-flex text-sm font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                Browse jobs →
              </Link>
            </div>

            {/* Caregiving & Personal Support */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Caregiving & Personal Support
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-600">Childcare / Nanny</p>
                <p className="text-sm text-slate-600">Elder Care / Companion</p>
                <p className="text-sm text-slate-600">Home Health Aide</p>
                <p className="text-sm text-slate-600">Personal Care Assistant</p>
                <p className="text-sm text-slate-600">Pet Sitting / Dog Walking</p>
                <p className="text-sm text-slate-600">Housekeeper / Domestic Worker</p>
              </div>
              <Link
                to="/find-work"
                className="inline-flex text-sm font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                Browse jobs →
              </Link>
            </div>

            {/* Transportation & Logistics */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Transportation & Logistics
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-600">Delivery Driver</p>
                <p className="text-sm text-slate-600">Courier / Messenger</p>
                <p className="text-sm text-slate-600">Mover / Loader</p>
                <p className="text-sm text-slate-600">Forklift Operator</p>
                <p className="text-sm text-slate-600">Warehouse Associate</p>
                <p className="text-sm text-slate-600">Inventory Clerk</p>
                <p className="text-sm text-slate-600">Fleet Maintenance</p>
              </div>
              <Link
                to="/find-work"
                className="inline-flex text-sm font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                Browse jobs →
              </Link>
            </div>

            {/* Facilities & Operations */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Facilities & Operations
              </h3>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-slate-600">Janitorial / Custodial</p>
                <p className="text-sm text-slate-600">Security / Night Watch</p>
                <p className="text-sm text-slate-600">Building Maintenance</p>
                <p className="text-sm text-slate-600">Groundskeeping</p>
                <p className="text-sm text-slate-600">Mailroom / Logistics</p>
                <p className="text-sm text-slate-600">Equipment Technician</p>
              </div>
              <Link
                to="/find-work"
                className="inline-flex text-sm font-medium text-[#24405A] hover:text-[#24405A]/80 transition-colors"
              >
                Browse jobs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proof */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="rounded-lg border border-slate-200 p-6">
              <p className="text-4xl font-bold text-slate-900">2,800+</p>
              <p className="text-slate-600">Workers</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-6">
              <p className="text-4xl font-bold text-slate-900">1,200+</p>
              <p className="text-slate-600">Jobs posted</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-6">
              <p className="text-4xl font-bold text-slate-900">4.8★</p>
              <p className="text-slate-600">Average rating</p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <blockquote className="rounded-lg border border-slate-200 p-6 text-slate-700">
              "Clear expectations. Better hires."
              <br />
              <span className="text-sm text-slate-500">Ann K., Facilities</span>
            </blockquote>
            <blockquote className="rounded-lg border border-slate-200 p-6 text-slate-700">
              "I felt respected and safe."
              <br />
              <span className="text-sm text-slate-500">Luis M., Cleaner</span>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-semibold text-slate-900">
            Safety & privacy
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">Verification</h3>
              <p className="mt-2 text-slate-600">
                Employer and worker verification with visible badges.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">Background checks</h3>
              <p className="mt-2 text-slate-600">
                Optional for workers. Employers can require per job.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-slate-900">Privacy by default</h3>
              <p className="mt-2 text-slate-600">
                Last name and address optional. Moderated messaging.
              </p>
            </div>
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
              Post a job
            </Link>
            <Link
              to="/find-work"
              className="inline-flex items-center justify-center rounded-md bg-[#24405A] px-5 py-3 text-white font-medium hover:opacity-95 transition-all"
            >
              Find work
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
