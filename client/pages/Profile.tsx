import React from "react";
import { Layout } from "@/components/Layout";
import { WorkerProfile } from "@/components/WorkerProfile";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      navigate("/sign-in");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {userProfile?.displayName}'s Profile
          </h1>
          <p className="text-slate-600">
            View and manage your professional profile
          </p>
        </div>

        {/* Profile Content */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <WorkerProfile />
        </div>
      </div>
    </Layout>
  );
}
