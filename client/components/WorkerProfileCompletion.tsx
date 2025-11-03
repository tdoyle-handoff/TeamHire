import React, { useState, useRef } from "react";
import { Camera, Video, Eye, EyeOff, Save, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface WorkerProfileCompletionProps {
  onComplete?: () => void;
}

export const WorkerProfileCompletion: React.FC<
  WorkerProfileCompletionProps
> = ({ onComplete }) => {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [videoIntro, setVideoIntro] = useState<string | null>(null);
  const [anonymityPreferences, setAnonymityPreferences] = useState({
    hideLastName: true,
    hideAddress: true,
    hideAge: true,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Video must be less than 50MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setVideoIntro(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: "Your profile has been updated",
      });

      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save profile",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">
          Complete Your Worker Profile
        </h3>
        <p className="text-sm text-blue-800">
          A complete profile helps you get more job opportunities. You can
          choose to stay mostly anonymous until you're hired.
        </p>
      </div>

      {/* Profile Photo */}
      <div className="border rounded-lg p-6">
        <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Camera className="w-5 h-5" />
          Profile Photo
        </h4>

        <div className="flex gap-4 items-start">
          <div className="w-24 h-24 bg-slate-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <Camera className="w-8 h-8 text-slate-400" />
            )}
          </div>

          <div className="flex-1">
            <p className="text-sm text-slate-600 mb-3">
              Optional. A professional photo helps employers trust you.
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-slate-200 text-slate-900 rounded-md text-sm font-medium hover:bg-slate-300 transition-colors"
            >
              {profilePhoto ? "Change Photo" : "Upload Photo"}
            </button>
            {profilePhoto && (
              <button
                onClick={() => setProfilePhoto(null)}
                className="ml-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Remove
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Video Intro */}
      <div className="border rounded-lg p-6">
        <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Video className="w-5 h-5" />
          Video Intro (30 seconds)
        </h4>

        <p className="text-sm text-slate-600 mb-4">
          Optional. A short intro video helps employers get to know you better.
          Say your name, mention your top skills, and why you're great to work
          with.
        </p>

        {videoIntro ? (
          <div className="mb-4 bg-slate-100 rounded-lg p-4">
            <p className="text-sm text-slate-600 mb-2">Video uploaded ✓</p>
            <button
              onClick={() => setVideoIntro(null)}
              className="px-4 py-2 bg-slate-200 text-slate-900 rounded-md text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Remove Video
            </button>
          </div>
        ) : (
          <>
            <input
              ref={videoInputRef}
              type="file"
              accept="video/*"
              onChange={handleVideoUpload}
              className="hidden"
            />
            <button
              onClick={() => videoInputRef.current?.click()}
              className="w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 font-medium hover:border-slate-400 transition-colors flex items-center justify-center gap-2"
            >
              <Video className="w-5 h-5" />
              Upload Video
            </button>
          </>
        )}
      </div>

      {/* Anonymity Preferences */}
      <div className="border rounded-lg p-6">
        <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
          <Eye className="w-5 h-5" />
          Privacy Preferences
        </h4>

        <p className="text-sm text-slate-600 mb-4">
          Choose what information is visible to employers before they hire you.
          You can always share more later.
        </p>

        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={anonymityPreferences.hideLastName}
              onChange={(e) =>
                setAnonymityPreferences({
                  ...anonymityPreferences,
                  hideLastName: e.target.checked,
                })
              }
              className="w-5 h-5 rounded border-slate-300"
            />
            <div>
              <p className="font-medium text-slate-900 text-sm">
                Show first name only
              </p>
              <p className="text-xs text-slate-600">
                Last name hidden until hired
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={anonymityPreferences.hideAddress}
              onChange={(e) =>
                setAnonymityPreferences({
                  ...anonymityPreferences,
                  hideAddress: e.target.checked,
                })
              }
              className="w-5 h-5 rounded border-slate-300"
            />
            <div>
              <p className="font-medium text-slate-900 text-sm">
                Hide exact address
              </p>
              <p className="text-xs text-slate-600">
                Show neighborhood/area only until hired
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={anonymityPreferences.hideAge}
              onChange={(e) =>
                setAnonymityPreferences({
                  ...anonymityPreferences,
                  hideAge: e.target.checked,
                })
              }
              className="w-5 h-5 rounded border-slate-300"
            />
            <div>
              <p className="font-medium text-slate-900 text-sm">
                Hide age/date of birth
              </p>
              <p className="text-xs text-slate-600">
                Age not visible until hired
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="w-full px-6 py-3 bg-primary text-white font-medium rounded-lg hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" />
        {isSaving ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
};

export default WorkerProfileCompletion;
