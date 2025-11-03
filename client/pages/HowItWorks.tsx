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
                    <h3 className="font-semibold text-slate-900">Post your job</h3>
                    <p className="text-slate-600 mt-1">
                      Describe the work, set requirements (skills, language, background
                      check), and post to reach verified workers.
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
                    <h3 className="font-semibold text-slate-900">Review profiles</h3>
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
                    <h3 className="font-semibold text-slate-900">Confirm & rate</h3>
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
                    <h3 className="font-semibold text-slate-900">Create your profile</h3>
                    <p className="text-slate-600 mt-1">
                      Add your skills, experience, and availability. Last name and
                      address are optional—you control your privacy.
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
                    <h3 className="font-semibold text-slate-900">Browse & apply</h3>
                    <p className="text-slate-600 mt-1">
                      Find jobs that match your skills and schedule. Apply directly
                      and message verified employers.
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
                    <h3 className="font-semibold text-slate-900">Get hired & build reputation</h3>
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

      {/* Why TeamHire */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">
            Why TeamHire?
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
              <h3 className="font-semibold text-slate-900">Clear Expectations</h3>
              <p className="text-slate-600 mt-2">
                Jobs include pay ranges, hours, and clear requirements. No surprises.
              </p>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">Private by Default</h3>
              <p className="text-slate-600 mt-2">
                Last name and address are optional. Secure messaging keeps personal
                info private until you consent.
              </p>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">Real Reviews</h3>
              <p className="text-slate-600 mt-2">
                Reviews only posted after work is completed. Build reputation based on
                real interactions.
              </p>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">Fair Pricing</h3>
              <p className="text-slate-600 mt-2">
                Transparent rates. No hidden fees or surprise charges from either side.
              </p>
            </div>
            <div className="rounded-lg bg-white border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900">No Exploitation</h3>
              <p className="text-slate-600 mt-2">
                Designed to respect workers and employers equally. Dignity built in from
                the start.
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
