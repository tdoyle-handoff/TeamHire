import React, { useState, useRef } from "react";
import { Mic, Square, Play, Trash2, Send, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceNoteRecorderProps {
  onSubmit?: (audioBlob: Blob) => void;
  placeholder?: string;
}

export const VoiceNoteRecorder: React.FC<VoiceNoteRecorderProps> = ({
  onSubmit,
  placeholder = "Record a voice note...",
}) => {
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 300) {
            mediaRecorder.stop();
            setIsRecording(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

      toast({
        title: "Recording started",
        description: "Speak now...",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      toast({
        title: "Recording stopped",
        description: "Your voice note is ready",
      });
    }
  };

  const deleteRecording = () => {
    if (recordedAudio) {
      URL.revokeObjectURL(recordedAudio);
    }
    setRecordedAudio(null);
    setRecordingTime(0);
  };

  const handleSubmit = async () => {
    if (!recordedAudio || !audioChunksRef.current.length) {
      toast({
        title: "Error",
        description: "No recording available",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      if (onSubmit) {
        onSubmit(audioBlob);
      }

      toast({
        title: "Success",
        description: "Voice note sent!",
      });

      deleteRecording();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send voice note",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="space-y-3">
      {!recordedAudio ? (
        <>
          {/* Recording Controls */}
          <div className="flex gap-2">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <Mic className="w-5 h-5" />
                Start Recording
              </button>
            ) : (
              <>
                <button
                  onClick={stopRecording}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Square className="w-5 h-5" />
                  Stop Recording
                </button>
                <div className="px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-medium text-sm">
                  {formatTime(recordingTime)}
                </div>
              </>
            )}
          </div>
          {recordingTime > 0 && (
            <p className="text-xs text-slate-600">
              Maximum 5 minutes per recording
            </p>
          )}
        </>
      ) : (
        <>
          {/* Playback Controls */}
          <div className="flex gap-2 items-center">
            <button
              onClick={() => {
                if (audioRef.current) {
                  if (isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                  } else {
                    audioRef.current.play();
                    setIsPlaying(true);
                  }
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={deleteRecording}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>

          <audio
            ref={audioRef}
            src={recordedAudio}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-10 rounded-lg"
            controls
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            {isSubmitting ? "Sending..." : "Send Voice Note"}
          </button>
        </>
      )}
    </div>
  );
};

export default VoiceNoteRecorder;
