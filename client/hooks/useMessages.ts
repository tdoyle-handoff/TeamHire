import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

export interface Conversation {
  id: string;
  participant1_id: string;
  participant2_id: string;
  job_id?: string;
  last_message_at: string;
  created_at: string;
  updated_at: string;
  other_participant?: {
    id: string;
    displayName: string;
    email: string;
    avatar?: string;
  };
  unread_count?: number;
  last_message?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  read_at?: string;
  created_at: string;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  file_url: string;
  file_name: string;
  file_size: number;
  file_type: string;
}

export const useMessages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all conversations for current user
  const fetchConversations = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from("conversations")
        .select("*")
        .or(
          `participant1_id.eq.${user.id},participant2_id.eq.${user.id}`
        )
        .order("last_message_at", { ascending: false });

      if (fetchError) throw fetchError;

      // Fetch participant details and unread counts
      const enrichedConversations = await Promise.all(
        (data || []).map(async (conv) => {
          const otherId =
            conv.participant1_id === user.id
              ? conv.participant2_id
              : conv.participant1_id;

          const { data: profileData } = await supabase
            .from("user_profiles")
            .select("*")
            .eq("id", otherId)
            .single();

          // Count unread messages
          const { count } = await supabase
            .from("messages")
            .select("*", { count: "exact" })
            .eq("conversation_id", conv.id)
            .is("read_at", null)
            .neq("sender_id", user.id);

          // Get last message
          const { data: lastMsg } = await supabase
            .from("messages")
            .select("content")
            .eq("conversation_id", conv.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

          return {
            ...conv,
            other_participant: profileData,
            unread_count: count || 0,
            last_message: lastMsg?.content || "",
          };
        })
      );

      setConversations(enrichedConversations);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch conversations");
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from("messages")
        .select(`*, message_attachments(*)`)
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (fetchError) throw fetchError;

      setMessages(data || []);

      // Mark messages as read
      const unreadMessages = (data || []).filter(
        (m) => !m.read_at && m.sender_id !== user.id
      );

      if (unreadMessages.length > 0) {
        await supabase
          .from("messages")
          .update({ read_at: new Date().toISOString() })
          .in(
            "id",
            unreadMessages.map((m) => m.id)
          );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  // Send a message
  const sendMessage = async (
    conversationId: string,
    content: string,
    attachments?: MessageAttachment[]
  ) => {
    if (!user) return;

    try {
      const { data: messageData, error: msgError } = await supabase
        .from("messages")
        .insert([
          {
            conversation_id: conversationId,
            sender_id: user.id,
            content,
          },
        ])
        .select()
        .single();

      if (msgError) throw msgError;

      if (attachments && attachments.length > 0) {
        const attachmentInserts = attachments.map((att) => ({
          message_id: messageData.id,
          ...att,
        }));

        await supabase
          .from("message_attachments")
          .insert(attachmentInserts);
      }

      // Update conversation
      await supabase
        .from("conversations")
        .update({ last_message_at: new Date().toISOString() })
        .eq("id", conversationId);

      // Add to local state
      setMessages([...messages, messageData]);

      return messageData;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
      throw err;
    }
  };

  // Create or get conversation
  const getOrCreateConversation = async (
    otherUserId: string,
    jobId?: string
  ) => {
    if (!user) return;

    try {
      const { data: existing } = await supabase
        .from("conversations")
        .select("*")
        .or(
          `and(participant1_id.eq.${user.id},participant2_id.eq.${otherUserId}),and(participant1_id.eq.${otherUserId},participant2_id.eq.${user.id})`
        )
        .single();

      if (existing) return existing;

      // Create new conversation
      const { data: newConv, error: createError } = await supabase
        .from("conversations")
        .insert([
          {
            participant1_id: user.id,
            participant2_id: otherUserId,
            job_id: jobId,
          },
        ])
        .select()
        .single();

      if (createError) throw createError;

      return newConv;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create conversation");
      throw err;
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [user?.id]);

  return {
    conversations,
    messages,
    loading,
    error,
    fetchConversations,
    fetchMessages,
    sendMessage,
    getOrCreateConversation,
  };
};
