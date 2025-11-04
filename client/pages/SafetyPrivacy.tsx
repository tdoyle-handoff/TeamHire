import React from "react";
import { Shield, Eye, Lock, CheckCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { TrustBadge } from "@/components/TrustBadge";

export default function SafetyPrivacy() {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Safety & Privacy
            </h1>
            <p className="text-lg text-muted-foreground">
              Your safety and privacy are our top priorities. Learn how Zipity
              protects you while building trust between workers and employers.
            </p>
          </div>

          {/* Privacy Controls */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-secondary/30 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Your Privacy
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Optional Personal Details
                    </h3>
                    <p className="text-muted-foreground">
                      Your last name and address are completely optional. You
                      can share them with verified matches only when you're
                      comfortable.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 pt-4 border-t border-border">
                  <Eye className="w-6 h-6 text-muted-blue flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Alias Support
                    </h3>
                    <p className="text-muted-foreground">
                      Use an alias in your public profile. Your real name is
                      revealed only to people you've matched with and both
                      parties have approved.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 pt-4 border-t border-border">
                  <Lock className="w-6 h-6 text-natural-green flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Private Until You Consent
                    </h3>
                    <p className="text-muted-foreground">
                      Your profile information is only visible to verified
                      employers or workers you've applied to or contacted.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust & Verification */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Trust & Verification
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <TrustBadge
                icon="verified"
                title="Background Checks"
                description="Optional for both workers and jobs. You control whether you complete one. Employers can require them for certain positions."
              />
              <TrustBadge
                icon="verified"
                title="Video Introductions"
                description="Workers can upload intro videos to build trust. Employers can request videos for certain roles. Always optional."
              />
              <TrustBadge
                icon="secure"
                title="References & Reviews"
                description="References can be uploaded or written. Reviews are only posted after work is completed, from verified accounts."
              />
              <TrustBadge
                icon="privacy"
                title="Verified Accounts"
                description="Badges show who's been verified. Email, phone, and identity verification help ensure authentic connections."
              />
            </div>
          </div>

          {/* In-App Messaging */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-white border border-border rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Secure In-App Messaging
              </h2>
              <p className="text-muted-foreground mb-6">
                All communication between workers and employers happens in-app.
                Your phone number and email address are never shared until both
                parties consent.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-natural-green flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">
                    Keep personal contact details private by default
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-natural-green flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">
                    Report and block users who make you uncomfortable
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-natural-green flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">
                    Verified profiles show trust badges and credentials
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Fair Work Guidelines */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-accent/10 border border-accent rounded-xl p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Fair Work Guidelines
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Fair Pay:</strong> All job
                  postings must include a clear pay range. Workers deserve to
                  know rates upfront.
                </p>
                <p>
                  <strong className="text-foreground">
                    Clear Expectations:
                  </strong>{" "}
                  Employers describe the work clearly. Workers can ask questions
                  before applying.
                </p>
                <p>
                  <strong className="text-foreground">
                    Respect Everyone's Time:
                  </strong>{" "}
                  Both parties are expected to communicate honestly and
                  promptly.
                </p>
                <p>
                  <strong className="text-foreground">
                    No Discrimination:
                  </strong>{" "}
                  We prohibit discrimination based on protected characteristics.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Policy Link */}
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground mb-4">
              For detailed information, please review our full{" "}
              <a
                href="#"
                className="text-primary font-semibold hover:underline"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-primary font-semibold hover:underline"
              >
                Terms of Service
              </a>
              .
            </p>
            <div className="bg-white border border-border rounded-lg p-6">
              <p className="text-sm text-muted-foreground">
                Have privacy concerns or want to report unsafe behavior?{" "}
                <a
                  href="mailto:safety@zipity.com"
                  className="text-primary font-semibold hover:underline"
                >
                  Contact our safety team
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
