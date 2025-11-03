import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useMessages } from "@/hooks/useMessages";
import { Search, Send, Paperclip, X, Clock, Check, MessageSquare, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Messages() {
  const { user, userProfile } = useAuth();
  const { conversations, messages, fetchMessages, sendMessage, loading } =
    useMessages();
  const [activeTab, setActiveTab] = useState<"messages" | "applications">("messages");
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<
    Array<{ name: string; size: number; type: string }>
  >([]);

  const selectedConversation = conversations.find(
    (c) => c.id === selectedConversationId
  );
  const isSmallScreen = window.innerWidth < 768;
  const showChat = !isSmallScreen || selectedConversationId;

  const filteredConversations = conversations.filter((conv) =>
    conv.other_participant?.displayName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
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

  // Mock applications data for workers
  const mockWorkerApplications = [
    {
      id: "1",
      jobTitle: "House Cleaning - 3 Bedroom Home",
      employer: "Sarah M.",
      appliedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "reviewing" as const,
      message: "Interested in your cleaning service",
    },
    {
      id: "2",
      jobTitle: "General Labor - Warehouse Setup",
      employer: "BuildRight Construction",
      appliedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: "accepted" as const,
      message: "Great! We'd like to hire you",
    },
    {
      id: "3",
      jobTitle: "Kitchen Prep Cook – Evening Shift",
      employer: "Fresh Bowl Restaurant",
      appliedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      status: "pending" as const,
      message: null,
    },
  ];

  // Mock applications data for employers
  const mockEmployerApplications = [
    {
      id: "101",
      jobTitle: "Residential Cleaner – 2 Days/Week – Upper Manhattan",
      applicantName: "Maria G.",
      applicantEmail: "maria.g@example.com",
      appliedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: "reviewing" as const,
      rating: 4.8,
      verified: true,
    },
    {
      id: "102",
      jobTitle: "Residential Cleaner – 2 Days/Week – Upper Manhattan",
      applicantName: "James L.",
      applicantEmail: "james.l@example.com",
      appliedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      status: "accepted" as const,
      rating: 4.5,
      verified: true,
    },
    {
      id: "103",
      jobTitle: "Kitchen Prep Cook – Afternoon Shift",
      applicantName: "David M.",
      applicantEmail: "david.m@example.com",
      appliedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      status: "pending" as const,
      rating: 4.2,
      verified: false,
    },
  ];

  if (!user) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Sign in to view messages
            </h1>
            <p className="text-slate-600">
              You need to be logged in to access your messages
            </p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Dashboard
            </h1>
            <p className="text-slate-600">
              Manage your messages and applications
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-slate-200 flex gap-8">
            <button
              onClick={() => setActiveTab("messages")}
              className={cn(
                "pb-3 font-medium transition-colors flex items-center gap-2",
                activeTab === "messages"
                  ? "text-[#24405A] border-b-2 border-[#24405A]"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <MessageSquare className="w-5 h-5" />
              Messages
              {conversations.length > 0 && (
                <span className="ml-2 px-2 py-0.5 bg-slate-200 rounded-full text-xs font-semibold">
                  {conversations.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("applications")}
              className={cn(
                "pb-3 font-medium transition-colors flex items-center gap-2",
                activeTab === "applications"
                  ? "text-[#24405A] border-b-2 border-[#24405A]"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              <FileText className="w-5 h-5" />
              {userProfile?.role === "employer"
                ? "Received Applications"
                : "My Applications"}
              <span className="ml-2 px-2 py-0.5 bg-slate-200 rounded-full text-xs font-semibold">
                {userProfile?.role === "employer"
                  ? mockEmployerApplications.length
                  : mockWorkerApplications.length}
              </span>
            </button>
          </div>

          {/* Content */}
          {activeTab === "messages" ? (
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div className="h-[600px] flex">
                {/* Conversations List */}
                {!showChat && (
                  <div className="w-full md:w-96 border-r border-slate-200 flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-200">
                      {/* Search */}
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search conversations..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Conversations */}
                    <div className="flex-1 overflow-y-auto">
                      {loading ? (
                        <div className="p-4 text-center text-slate-500">
                          Loading conversations...
                        </div>
                      ) : filteredConversations.length === 0 ? (
                        <div className="p-4 text-center text-slate-500">
                          No conversations yet
                        </div>
                      ) : (
                        filteredConversations.map((conversation) => (
                          <button
                            key={conversation.id}
                            onClick={() => handleSelectConversation(conversation.id)}
                            className={`w-full p-4 border-b border-slate-100 text-left hover:bg-slate-50 transition-colors ${
                              selectedConversationId === conversation.id
                                ? "bg-blue-50"
                                : ""
                            }`}
                          >
                            <div className="flex items-start justify-between mb-1">
                              <h3 className="font-semibold text-slate-900">
                                {conversation.other_participant?.displayName}
                              </h3>
                              {conversation.unread_count ? (
                                <span className="bg-[#24405A] text-white text-xs font-semibold px-2 py-1 rounded-full">
                                  {conversation.unread_count}
                                </span>
                              ) : null}
                            </div>
                            <p className="text-sm text-slate-600 truncate">
                              {conversation.last_message || "No messages yet"}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(
                                conversation.last_message_at
                              ).toLocaleDateString()}
                            </p>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Chat Area */}
                {showChat && selectedConversation ? (
                  <div className="flex-1 flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                      {isSmallScreen && (
                        <button
                          onClick={() => setSelectedConversationId(null)}
                          className="mr-3 p-1 hover:bg-slate-100 rounded"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                      <div>
                        <h2 className="text-lg font-bold text-slate-900">
                          {selectedConversation.other_participant?.displayName}
                        </h2>
                        <p className="text-xs text-slate-500">
                          {selectedConversation.other_participant?.email}
                        </p>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-slate-500">
                          No messages yet. Start the conversation!
                        </div>
                      ) : (
                        messages.map((message) => {
                          const isOwn = message.sender_id === user.id;
                          return (
                            <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                              <div
                                className={`max-w-xs px-4 py-2 rounded-lg ${
                                  isOwn
                                    ? "bg-[#24405A] text-white"
                                    : "bg-slate-100 text-slate-900"
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>

                                {/* Attachments */}
                                {message.attachments &&
                                  message.attachments.length > 0 && (
                                    <div className="mt-2 space-y-1">
                                      {message.attachments.map((att) => (
                                        <a
                                          key={att.id}
                                          href={att.file_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className={`flex items-center gap-2 text-xs underline ${
                                            isOwn
                                              ? "text-blue-100"
                                              : "text-blue-600"
                                          }`}
                                        >
                                          <Paperclip className="w-3 h-3" />
                                          {att.file_name}
                                        </a>
                                      ))}
                                    </div>
                                  )}

                                {/* Timestamp and Read Status */}
                                <div
                                  className={`flex items-center justify-end gap-1 mt-1 text-xs ${
                                    isOwn ? "text-blue-100" : "text-slate-500"
                                  }`}
                                >
                                  <span>
                                    {new Date(message.created_at).toLocaleTimeString(
                                      [],
                                      {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      }
                                    )}
                                  </span>
                                  {isOwn && (
                                    <>
                                      {message.read_at ? (
                                        <Check className="w-3 h-3" />
                                      ) : (
                                        <Clock className="w-3 h-3" />
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-slate-200">
                      {/* Attachments */}
                      {attachedFiles.length > 0 && (
                        <div className="mb-3 space-y-2">
                          {attachedFiles.map((file, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between bg-slate-100 p-2 rounded text-sm"
                            >
                              <span className="text-slate-700">{file.name}</span>
                              <button
                                onClick={() => removeAttachment(idx)}
                                className="text-slate-400 hover:text-slate-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Input Area */}
                      <div className="flex gap-2">
                        <div className="flex-1 relative">
                          <input
                            type="text"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                            placeholder="Type a message..."
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24405A]"
                          />
                          <input
                            type="file"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="file-input"
                          />
                          <label
                            htmlFor="file-input"
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
                          >
                            <Paperclip className="w-5 h-5" />
                          </label>
                        </div>
                        <button
                          onClick={handleSendMessage}
                          className="p-2 bg-[#24405A] text-white rounded-lg hover:opacity-90 transition-all"
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-slate-500">
                    <div className="text-center">
                      <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        Select a conversation
                      </h2>
                      <p className="text-slate-600">
                        Choose a conversation from the list to start messaging
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Applications Tab
            <div className="space-y-4">
              {userProfile?.role === "employer" ? (
                // Employer view - Received Applications
                mockEmployerApplications.length === 0 ? (
                  <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      No applications yet
                    </h3>
                    <p className="text-slate-600">
                      Workers who apply to your job postings will appear here
                    </p>
                  </div>
                ) : (
                  mockEmployerApplications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">
                            {app.jobTitle}
                          </h3>
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm text-slate-600">
                              {app.applicantName}
                            </p>
                            {app.verified && (
                              <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium">
                                ✓ Verified
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500">
                            {app.applicantEmail}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium flex-shrink-0 ${
                            app.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : app.status === "reviewing"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {app.status === "accepted"
                            ? "Hired ✓"
                            : app.status === "reviewing"
                            ? "Under Review"
                            : "New"}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-medium text-slate-900">
                            {app.rating}
                          </span>
                          <span className="text-xs text-slate-500">rating</span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Applied {app.appliedDate.toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-[#24405A] text-white font-medium rounded-md hover:opacity-90 transition-all text-sm">
                          View Profile
                        </button>
                        <button className="px-4 py-2 bg-slate-200 text-slate-900 font-medium rounded-md hover:bg-slate-300 transition-all text-sm">
                          Message
                        </button>
                      </div>
                    </div>
                  ))
                )
              ) : (
                // Worker view - My Applications
                mockWorkerApplications.length === 0 ? (
                  <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">
                      No applications yet
                    </h3>
                    <p className="text-slate-600">
                      Start applying to jobs to see your applications here
                    </p>
                  </div>
                ) : (
                  mockWorkerApplications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-900 mb-1">
                            {app.jobTitle}
                          </h3>
                          <p className="text-sm text-slate-600 mb-3">
                            {app.employer}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium flex-shrink-0 ${
                            app.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : app.status === "reviewing"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {app.status === "accepted"
                            ? "Accepted ✓"
                            : app.status === "reviewing"
                            ? "Under Review"
                            : "Pending"}
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 mb-4">
                        Applied {app.appliedDate.toLocaleDateString()}
                      </p>

                      {app.message && (
                        <div className="bg-slate-50 rounded-lg p-3 mb-4 border border-slate-200">
                          <p className="text-sm text-slate-700 font-medium mb-1">
                            Message from employer:
                          </p>
                          <p className="text-sm text-slate-600">{app.message}</p>
                        </div>
                      )}

                      <button className="px-4 py-2 bg-[#24405A] text-white font-medium rounded-md hover:opacity-90 transition-all text-sm">
                        View Details
                      </button>
                    </div>
                  ))
                )
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
