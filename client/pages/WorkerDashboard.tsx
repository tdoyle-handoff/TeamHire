import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { WorkerProfileCompletion } from "@/components/WorkerProfileCompletion";
import { WorkerProfile } from "@/components/WorkerProfile";
import { WorkerCollectivesPanel } from "@/components/WorkerCollectivesPanel";
import { WorkerApplicationsPanel } from "@/components/WorkerApplicationsPanel";
import { useAuth } from "@/contexts/AuthContext";
import { useMessages } from "@/hooks/useMessages";
import { Briefcase, CheckCircle, MessageSquare, Search, Send, Paperclip, X, Clock, Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WorkerDashboard() {
  const { user, userProfile } = useAuth();
  const { conversations, messages, fetchMessages, sendMessage, loading } = useMessages();
  const [profileComplete, setProfileComplete] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<Array<{ name: string; size: number; type: string }>>([]);

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId);
  const isSmallScreen = window.innerWidth < 768;
  const showChat = !isSmallScreen || selectedConversationId;

  const filteredConversations = conversations.filter((conv) =>
    conv.other_participant?.displayName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    fetchMessages(conversationId);
  };

  const handleSendMessage = async () => {
    if (!selectedConversationId || !messageText.trim()) return;

    try {
      await sendMessage(selectedConversationId, messageText.trim(), []);
      setMessageText("");
      setAttachedFiles([]);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setAttachedFiles([...attachedFiles, ...newFiles]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome, {userProfile?.displayName}!
          </h1>
          <p className="text-slate-600">
            Manage your profile, applications, and opportunities.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 bg-white rounded-lg border border-slate-200 border-b-0">
          <div className="flex gap-4 border-b border-slate-200 px-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-4 py-3 font-medium text-sm border-b-2 -mb-px transition-colors whitespace-nowrap ${
                activeTab === "dashboard"
                  ? "text-slate-900 border-blue-600"
                  : "text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("your-jobs")}
              className={`px-4 py-3 font-medium text-sm border-b-2 -mb-px transition-colors whitespace-nowrap flex items-center gap-2 ${
                activeTab === "your-jobs"
                  ? "text-slate-900 border-blue-600"
                  : "text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Your Jobs
              {conversations.length > 0 && (
                <span className="ml-1 px-2 py-0.5 bg-slate-200 rounded-full text-xs font-semibold">
                  {conversations.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={`px-4 py-3 font-medium text-sm border-b-2 -mb-px transition-colors whitespace-nowrap ${
                activeTab === "applications"
                  ? "text-slate-900 border-blue-600"
                  : "text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              Applications
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-4 py-3 font-medium text-sm border-b-2 -mb-px transition-colors whitespace-nowrap ${
                activeTab === "profile"
                  ? "text-slate-900 border-blue-600"
                  : "text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("collectives")}
              className={`px-4 py-3 font-medium text-sm border-b-2 -mb-px transition-colors whitespace-nowrap ${
                activeTab === "collectives"
                  ? "text-slate-900 border-blue-600"
                  : "text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              Collectives
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <>
            {/* Profile Completion Section */}
            {!profileComplete && (
              <div className="mb-8 bg-white rounded-lg border border-slate-200 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">
                      Complete Your Profile
                    </h2>
                    <p className="text-slate-600 mb-4">
                      A complete profile increases your chances of getting
                      hired. Add a photo, video intro, and set your privacy
                      preferences.
                    </p>
                    <WorkerProfileCompletion
                      onComplete={() => setProfileComplete(true)}
                    />
                  </div>
                </div>
              </div>
            )}

            {profileComplete && (
              <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900">
                    Profile Complete!
                  </h3>
                  <p className="text-sm text-green-700">
                    You're all set to start applying for jobs.
                  </p>
                </div>
              </div>
            )}

            {/* Dashboard Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Applications
                </h3>
                <p className="text-3xl font-bold text-primary">0</p>
                <p className="text-sm text-slate-600 mt-1">
                  Active applications
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Saved Jobs
                </h3>
                <p className="text-3xl font-bold text-primary">0</p>
                <p className="text-sm text-slate-600 mt-1">Jobs for later</p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900 mb-2">
                  Your Rating
                </h3>
                <p className="text-3xl font-bold text-primary">—</p>
                <p className="text-sm text-slate-600 mt-1">No ratings yet</p>
              </div>
            </div>

            {/* Placeholder Sections */}
            <div className="space-y-6">
              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Recent Applications
                </h3>
                <p className="text-slate-600 text-center py-8">
                  No applications yet. Start by browsing available jobs.
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-6">
                <h3 className="font-semibold text-slate-900 mb-4">
                  Messages & Communications
                </h3>
                <p className="text-slate-600 text-center py-8">
                  Your messages with employers will appear here.
                </p>
              </div>
            </div>
          </>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && <WorkerApplicationsPanel />}

        {/* Profile Tab */}
        {activeTab === "profile" && <WorkerProfile />}

        {/* Collectives Tab */}
        {activeTab === "collectives" && <WorkerCollectivesPanel />}
      </div>
    </Layout>
  );
}
