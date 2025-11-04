import React, { useState } from "react";
import { X, Send } from "lucide-react";
import { JobPost } from "@shared/types";
import { useAuth } from "@/contexts/AuthContext";
import { useMessages } from "@/hooks/useMessages";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobPost;
  onMessageSent?: () => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  isOpen,
  onClose,
  job,
  onMessageSent,
}) => {
  const { user, userProfile } = useAuth();
  const { getOrCreateConversation, sendMessage } = useMessages();
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!messageText.trim()) {
      setError("Message cannot be empty");
      return;
    }

    if (!user) {
      setError("You must be logged in to send a message");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Creating conversation with employer:", job.employerId);

      // Create or get conversation with the employer
      const conversation = await getOrCreateConversation(
        job.employerId,
        job.id,
      );

      if (!conversation) {
        throw new Error("Failed to create conversation");
      }

      console.log("Conversation created/found:", conversation.id);

      // Send the message
      const result = await sendMessage(conversation.id, messageText.trim(), []);

      console.log("Message sent successfully:", result);

      // Reset and close
      setMessageText("");
      onMessageSent?.();
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send message";
      console.error("Message send error:", errorMessage, err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Message {job.employerName}
            </h2>
            <p className="text-xs text-slate-500 mt-1">{job.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4">
          {/* Job Summary */}
          <div className="bg-slate-50 rounded-lg p-4 mb-4">
            <p className="text-sm text-slate-600">
              <span className="font-medium text-slate-900">{job.title}</span>
              <br />
              <span className="text-xs">
                Posted by {job.employerName} • ${job.payRangeHourly.min}-$
                {job.payRangeHourly.max}/hr
              </span>
            </p>
          </div>

          {/* Message Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Your Message
            </label>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Introduce yourself and ask any questions about the job..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent resize-none"
              rows={5}
            />
            <p className="text-xs text-slate-500 mt-1">
              {messageText.length}/500 characters
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !messageText.trim()}
              className="flex-1 px-4 py-2 bg-[#24405A] text-white rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
