import React from "react";
import { Heart, Users, Award, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              About TeamHire
            </h1>
            <p className="text-xl text-muted-foreground">
              Dignifying blue-collar and non-degree work. Rebuilding trust
              between workers and employers.
            </p>
          </div>

          {/* Mission Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-primary/10 to-natural-green/10 rounded-xl p-8 md:p-12 border border-primary/20">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're on a mission to replace sketchy, dehumanizing hiring
                experiences with safety, respect, and transparency. Blue-collar
                and non-degree labor built this world—it deserves better than
                Craigslist and Indeed. TeamHire gives workers dignity and
                employers trustworthy candidates.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-border rounded-xl p-6">
                <Users className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  Human-Centered
                </h3>
                <p className="text-muted-foreground">
                  We treat everyone with respect. Workers are never commodities,
                  and employers deserve trustworthy partners.
                </p>
              </div>

              <div className="bg-white border border-border rounded-xl p-6">
                <Award className="w-8 h-8 text-natural-green mb-3" />
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  Transparent
                </h3>
                <p className="text-muted-foreground">
                  Clear pricing, clear terms, clear expectations. No hidden fees
                  or surprise requirements.
                </p>
              </div>

              <div className="bg-white border border-border rounded-xl p-6">
                <Lightbulb className="w-8 h-8 text-warm-neutral mb-3" />
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  Trustworthy
                </h3>
                <p className="text-muted-foreground">
                  Verification badges, secure messaging, and honest reviews
                  build trust that actually lasts.
                </p>
              </div>

              <div className="bg-white border border-border rounded-xl p-6">
                <Heart className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  Safe
                </h3>
                <p className="text-muted-foreground">
                  Your safety matters. Optional data fields, identity
                  verification, and anonymous applications.
                </p>
              </div>
            </div>
          </div>

          {/* The Problem */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              The Problem We're Solving
            </h2>
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-8">
              <p className="text-muted-foreground mb-4">
                Workers on Craigslist and Indeed face exploitation, scams, and
                no safety nets. Employers struggle to find reliable people
                without risking their time and money. Both sides deserve better.
              </p>
              <p className="text-muted-foreground mb-4">
                TeamHire changes this. By putting dignity first—protecting
                privacy, enabling verification, and building accountability—we
                create a marketplace where both workers and employers can trust
                each other.
              </p>
              <p className="text-muted-foreground">
                It's not just a job board. It's a movement to respect
                blue-collar work.
              </p>
            </div>
          </div>

          {/* Why Choose TeamHire */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Why Choose TeamHire?
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "For Workers",
                  points: [
                    "Keep your last name and address private",
                    "Control who sees your profile",
                    "Work with verified, respectful employers",
                    "Get paid fairly without hidden surprises",
                    "Build real reputation through honest reviews",
                  ],
                },
                {
                  title: "For Employers",
                  points: [
                    "Find verified, reliable workers",
                    "Request background checks, videos, references",
                    "Communicate securely in-app",
                    "Hire with confidence based on real reviews",
                    "Build long-term relationships with your team",
                  ],
                },
              ].map((section, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-border rounded-xl p-6"
                >
                  <h3 className="font-semibold text-foreground text-lg mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <span className="inline-block w-2 h-2 rounded-full bg-natural-green mt-2 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-3xl mx-auto text-center bg-secondary/30 rounded-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to be part of the movement?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join workers and employers who believe in dignity, respect, and
              trust.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/find-work"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all"
              >
                Find Work
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/hire-workers"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-natural-green text-white font-semibold rounded-xl hover:bg-natural-green/90 transition-all"
              >
                Hire Workers
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
