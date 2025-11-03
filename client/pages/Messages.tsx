import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useMessages } from "@/hooks/useMessages";
import { Search, Send, Paperclip, X, Clock, Check } from "lucide-react";

export default function Messages() {
  const { user } = useAuth();
  const { conversations, messages, fetchMessages, sendMessage, loading } =
    useMessages();
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
      <div className="h-[calc(100vh-80px)] bg-white flex">
        {/* Conversations List */}
        {!showChat && (
          <div className="w-full md:w-96 border-r border-slate-200 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-slate-200">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">
                Messages
              </h1>

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
            <div className="p-4 border-t border-slate-200 space-y-2">
              {/* Attached Files */}
              {attachedFiles.length > 0 && (
                <div className="space-y-2">
                  {attachedFiles.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-slate-50 p-2 rounded border border-slate-200"
                    >
                      <div className="flex items-center gap-2">
                        <Paperclip className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-700">
                          {file.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          ({(file.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <button
                        onClick={() => removeAttachment(idx)}
                        className="p-1 hover:bg-slate-200 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Input Area */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
                />

                {/* File Upload */}
                <label className="p-2 hover:bg-slate-100 rounded cursor-pointer transition-colors">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    multiple
                  />
                  <Paperclip className="w-5 h-5 text-slate-600" />
                </label>

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="p-2 bg-[#24405A] text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ) : !selectedConversation && !isSmallScreen ? (
          <div className="flex-1 flex items-center justify-center bg-slate-50">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Select a conversation
              </h2>
              <p className="text-slate-600">
                Choose a conversation from the list to start messaging
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}
