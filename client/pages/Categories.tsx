import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";

const categories = [
  { name: "Cleaning", description: "Homes • Offices", icon: "🧹" },
  { name: "General Labor", description: "Moving • Setup", icon: "💪" },
  { name: "Caregiving", description: "Senior • Child", icon: "❤️" },
  { name: "Handyman", description: "Repairs • Install", icon: "🔧" },
  { name: "Hospitality", description: "Events • Kitchen", icon: "🍽️" },
  { name: "Landscaping", description: "Yards • Gardens", icon: "🌱" },
  { name: "Tutoring", description: "Academic • Skills", icon: "📚" },
  { name: "Pet Care", description: "Dog Walking • Sitting", icon: "🐕" },
];

export default function Categories() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900">
            Job Categories
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-slate-600">
            Browse thousands of verified jobs across all categories
          </p>
          <div className="mt-8">
            <Link
              to="/find-work"
              className="inline-flex items-center justify-center rounded-md bg-[#24405A] px-6 py-3 text-white font-medium hover:opacity-95 transition-all"
            >
              Browse all jobs
            </Link>
          </div>
        </div>
      </section>

      {/* All Categories Grid */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/find-work?cat=${cat.name.toLowerCase().replace(" ", "-")}`}
                className="group rounded-lg border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <p className="font-semibold text-slate-900 text-lg">{cat.name}</p>
                <p className="text-sm text-slate-600 mt-1">{cat.description}</p>
                <div className="mt-4 flex items-center text-sm text-[#24405A] font-medium group-hover:gap-1 transition-all">
                  View jobs
                  <span className="ml-1">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-slate-900">2,800+</p>
              <p className="text-slate-600 mt-2">Active workers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-900">1,200+</p>
              <p className="text-slate-600 mt-2">Jobs available</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-slate-900">4.8★</p>
              <p className="text-slate-600 mt-2">Average rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            Find your next opportunity
          </h2>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/find-work"
              className="inline-flex items-center justify-center rounded-md bg-[#24405A] px-5 py-3 text-white font-medium hover:opacity-95 transition-all"
            >
              Browse jobs
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
