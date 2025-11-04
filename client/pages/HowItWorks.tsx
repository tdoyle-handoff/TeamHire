import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Eye, Lock, CheckCircle } from "lucide-react";
import { Layout } from "@/components/Layout";

export default function HowItWorks() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            How It Works
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-slate-600">
            Simple, transparent process for workers and employers
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Employers */}
            <div className="rounded-lg border border-slate-200 p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                For employers
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#24405A] text-white font-semibold">
                      1
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Post your job
                    </h3>
                    <p className="text-slate-600 mt-1">
                      Describe the work, set requirements (skills, language,
                      background check), and post to reach verified workers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#24405A] text-white font-semibold">
                      2
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Review profiles
                    </h3>
                    <p className="text-slate-600 mt-1">
                      Browse worker profiles with ratings, intro videos, and
                      background check status. Message top candidates.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#24405A] text-white font-semibold">
                      3
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Confirm & rate
                    </h3>
                    <p className="text-slate-600 mt-1">
                      Hire your top choice and leave a verified review after
                      completion. Build your team reputation.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                to="/post-job"
                className="mt-8 inline-block rounded-md bg-[#3BA55C] px-6 py-3 text-white font-medium hover:opacity-95 transition-all"
              >
                Post a job
              </Link>
            </div>

            {/* Workers */}
            <div className="rounded-lg border border-slate-200 p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                For workers
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#24405A] text-white font-semibold">
                      1
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Create your profile
                    </h3>
                    <p className="text-slate-600 mt-1">
                      Add your skills, experience, and availability. Last name
                      and address are optional—you control your privacy.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#24405A] text-white font-semibold">
                      2
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Browse & apply
                    </h3>
                    <p className="text-slate-600 mt-1">
                      Find jobs that match your skills and schedule. Apply
                      directly and message verified employers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-[#24405A] text-white font-semibold">
                      3
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Get hired & build reputation
                    </h3>
                    <p className="text-slate-600 mt-1">
                      Complete the work and get a verified review. Build your
                      reputation and earn more opportunities.
                    </p>
                  </div>
                </div>
              </div>
              <Link
                to="/find-work"
                className="mt-8 inline-block rounded-md bg-[#24405A] px-6 py-3 text-white font-medium hover:opacity-95 transition-all"
              >
                Find work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Zipity */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">
            Why Zipity?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg bg-white border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">Verified & Safe</h3>
              <p className="text-slate-600 mt-2">
                Visible verification badges for employers and workers. Optional
                background checks for peace of mind.
              </p>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">
                Clear Expectations
              </h3>
              <p className="text-slate-600 mt-2">
                Jobs include pay ranges, hours, and clear requirements. No
                surprises.
              </p>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">
                Private by Default
              </h3>
              <p className="text-slate-600 mt-2">
                Last name and address are optional. Secure messaging keeps
                personal info private until you consent.
              </p>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">Real Reviews</h3>
              <p className="text-slate-600 mt-2">
                Reviews only posted after work is completed. Build reputation
                based on real interactions.
              </p>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">Fair Pricing</h3>
              <p className="text-slate-600 mt-2">
                Transparent rates. No hidden fees or surprise charges from
                either side.
              </p>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">No Exploitation</h3>
              <p className="text-slate-600 mt-2">
                Designed to respect workers and employers equally. Dignity built
                in from the start.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Privacy */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-semibold text-slate-900 mb-12 text-center">
            Safety & Privacy
          </h2>

          {/* Privacy Controls */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Your Privacy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg border border-slate-200 p-6">
                <Eye className="w-8 h-8 text-[#24405A] mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">
                  Optional Personal Details
                </h4>
                <p className="text-slate-600 text-sm">
                  Your last name and address are completely optional. Share them
                  with verified matches only when you're comfortable.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-6">
                <Eye className="w-8 h-8 text-[#24405A] mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">
                  Alias Support
                </h4>
                <p className="text-slate-600 text-sm">
                  Use an alias in your public profile. Your real name is
                  revealed only to matched parties who have both approved.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-6">
                <Lock className="w-8 h-8 text-[#24405A] mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">
                  Private Until You Consent
                </h4>
                <p className="text-slate-600 text-sm">
                  Your profile information is only visible to verified employers
                  or workers you've applied to or contacted.
                </p>
              </div>
            </div>
          </div>

          {/* Trust & Verification */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-slate-900 mb-6">
              Trust & Verification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg border border-slate-200 p-6">
                <Shield className="w-8 h-8 text-[#24405A] mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">
                  Background Checks
                </h4>
                <p className="text-slate-600 text-sm">
                  Optional for both workers and jobs. You control whether you
                  complete one. Employers can require them for certain
                  positions.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-6">
                <CheckCircle className="w-8 h-8 text-[#24405A] mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">
                  Video Introductions
                </h4>
                <p className="text-slate-600 text-sm">
                  Workers can upload intro videos to build trust. Employers can
                  request videos for certain roles. Always optional.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-6">
                <CheckCircle className="w-8 h-8 text-[#24405A] mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">
                  References & Reviews
                </h4>
                <p className="text-slate-600 text-sm">
                  References can be uploaded or written. Reviews are only posted
                  after work is completed, from verified accounts.
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 p-6">
                <Shield className="w-8 h-8 text-[#24405A] mb-3" />
                <h4 className="font-semibold text-slate-900 mb-2">
                  Verified Accounts
                </h4>
                <p className="text-slate-600 text-sm">
                  Badges show who's been verified. Email, phone, and identity
                  verification help ensure authentic connections.
                </p>
              </div>
            </div>
          </div>

          {/* Secure Messaging */}
          <div className="mb-12 rounded-lg bg-[#FAFAFA] border border-slate-200 p-8">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              Secure In-App Messaging
            </h3>
            <p className="text-slate-600 mb-6">
              All communication between workers and employers happens in-app.
              Your phone number and email address are never shared until both
              parties consent.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#3BA55C] flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  Keep personal contact details private by default
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#3BA55C] flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  Report and block users who make you uncomfortable
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#3BA55C] flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  Verified profiles show trust badges and credentials
                </span>
              </div>
            </div>
          </div>

          {/* Fair Work Guidelines */}
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-8">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              Fair Work Guidelines
            </h3>
            <div className="space-y-3 text-slate-700">
              <p>
                <strong>Fair Pay:</strong> All job postings must include a clear
                pay range. Workers deserve to know rates upfront.
              </p>
              <p>
                <strong>Clear Expectations:</strong> Employers describe the work
                clearly. Workers can ask questions before applying.
              </p>
              <p>
                <strong>Respect Everyone's Time:</strong> Both parties are
                expected to communicate honestly and promptly.
              </p>
              <p>
                <strong>No Discrimination:</strong> We prohibit discrimination
                based on protected characteristics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            Work with dignity. Hire with trust.
          </h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/find-work"
              className="inline-flex items-center justify-center rounded-md bg-[#24405A] px-5 py-3 text-white font-medium hover:opacity-95 transition-all"
            >
              Find work
            </Link>
            <Link
              to="/post-job"
              className="inline-flex items-center justify-center rounded-md bg-[#3BA55C] px-5 py-3 text-white font-medium hover:opacity-95 transition-all"
            >
              Post a job
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
