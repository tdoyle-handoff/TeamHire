import React, { useState } from "react";
import {
  Briefcase,
  Trash2,
  Plus,
  Edit2,
  Save,
  X,
  Award,
  MapPin,
  DollarSign,
  Calendar,
  Star,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ReadAloudButton } from "@/components/ReadAloudButton";

interface Skill {
  id: string;
  name: string;
  endorsements?: number;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
}

interface Education {
  id: string;
  school: string;
  field: string;
  year?: string;
}

export const WorkerProfile: React.FC = () => {
  const { userProfile } = useAuth();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("overview");
  const [editingAbout, setEditingAbout] = useState(false);
  const [about, setAbout] = useState(
    userProfile?.bio || "Add a professional summary about yourself...",
  );
  const [tempAbout, setTempAbout] = useState(about);

  const [skills, setSkills] = useState<Skill[]>([
    { id: "1", name: "Heavy Equipment Operation", endorsements: 5 },
    { id: "2", name: "Construction", endorsements: 8 },
    { id: "3", name: "Safety Compliance", endorsements: 3 },
  ]);

  const [experience, setExperience] = useState<Experience[]>([
    {
      id: "1",
      title: "Construction Worker",
      company: "ABC Construction",
      startDate: "2022-01",
      endDate: "2024-01",
      isCurrent: false,
      description: "Worked on residential and commercial projects",
    },
    {
      id: "2",
      title: "Warehouse Associate",
      company: "XYZ Logistics",
      startDate: "2020-06",
      endDate: "2021-12",
      isCurrent: false,
      description: "Inventory management and order fulfillment",
    },
  ]);

  const [education, setEducation] = useState<Education[]>([
    {
      id: "1",
      school: "Trade School",
      field: "Heavy Equipment Operation Certification",
      year: "2021",
    },
  ]);

  const [newSkill, setNewSkill] = useState("");
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null,
  );
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null,
  );

  const [location, setLocation] = useState(userProfile?.location || "");
  const [hourlyRate, setHourlyRate] = useState("25");
  const [availability, setAvailability] = useState("Full-time");

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      const skill: Skill = {
        id: Date.now().toString(),
        name: newSkill,
        endorsements: 0,
      };
      setSkills([...skills, skill]);
      setNewSkill("");
      toast({
        title: "Success",
        description: "Skill added to your profile",
      });
    }
  };

  const handleRemoveSkill = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const handleAddExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      startDate: "",
      isCurrent: false,
      description: "",
    };
    setEditingExperience(newExp);
  };

  const handleSaveExperience = () => {
    if (editingExperience) {
      if (
        editingExperience.title &&
        editingExperience.company &&
        editingExperience.startDate
      ) {
        const existingIndex = experience.findIndex(
          (exp) => exp.id === editingExperience.id,
        );
        if (existingIndex > -1) {
          const updated = [...experience];
          updated[existingIndex] = editingExperience;
          setExperience(updated);
        } else {
          setExperience([...experience, editingExperience]);
        }
        setEditingExperience(null);
        toast({
          title: "Success",
          description: "Experience saved",
        });
      } else {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveExperience = (id: string) => {
    setExperience(experience.filter((exp) => exp.id !== id));
  };

  const handleAddEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: "",
      field: "",
    };
    setEditingEducation(newEdu);
  };

  const handleSaveEducation = () => {
    if (editingEducation) {
      if (editingEducation.school && editingEducation.field) {
        const existingIndex = education.findIndex(
          (edu) => edu.id === editingEducation.id,
        );
        if (existingIndex > -1) {
          const updated = [...education];
          updated[existingIndex] = editingEducation;
          setEducation(updated);
        } else {
          setEducation([...education, editingEducation]);
        }
        setEditingEducation(null);
        toast({
          title: "Success",
          description: "Education saved",
        });
      } else {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
      }
    }
  };

  const handleRemoveEducation = (id: string) => {
    setEducation(education.filter((edu) => edu.id !== id));
  };

  const handleSaveAbout = () => {
    setAbout(tempAbout);
    setEditingAbout(false);
    toast({
      title: "Success",
      description: "About section updated",
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8">
        <div className="flex gap-6 items-start">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-4xl font-bold text-white">
              {userProfile?.displayName?.charAt(0)?.toUpperCase() || "W"}
            </span>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">
              {userProfile?.displayName || "Worker Name"}
            </h1>
            <p className="text-lg text-slate-600 mb-4">Skilled Worker</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">
                  {location || "Add location"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">${hourlyRate}/hr</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">{availability}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-slate-600">No reviews yet</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-slate-200 border-b-0">
        <div className="flex gap-4 border-b border-slate-200 px-6">
          {[
            { id: "overview", label: "Overview" },
            { id: "skills", label: "Skills" },
            { id: "experience", label: "Experience" },
            { id: "education", label: "Education" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm border-b-2 -mb-px transition-colors ${
                activeTab === tab.id
                  ? "text-slate-900 border-blue-600"
                  : "text-slate-600 border-transparent hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* About Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-slate-900">About</h2>
                  <ReadAloudButton text={about} size="md" />
                </div>
                {!editingAbout && (
                  <button
                    onClick={() => {
                      setTempAbout(about);
                      setEditingAbout(true);
                    }}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                )}
              </div>

              {editingAbout ? (
                <div className="space-y-4">
                  <textarea
                    value={tempAbout}
                    onChange={(e) => setTempAbout(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none resize-none"
                    rows={4}
                    placeholder="Write a professional summary..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveAbout}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => setEditingAbout(false)}
                      className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-slate-700 leading-relaxed">{about}</p>
              )}
            </div>

            <hr className="border-slate-200" />

            {/* Quick Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">Quick Info</h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, State"
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Hourly Rate
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm text-slate-600 px-3">$</span>
                      <input
                        type="number"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        placeholder="25"
                        className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                      />
                      <span className="text-sm text-slate-600 px-3">/hr</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Availability
                    </label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                    >
                      <option>Full-time</option>
                      <option>Part-time</option>
                      <option>Contract</option>
                      <option>Temporary</option>
                      <option>Freelance</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-xl font-semibold text-slate-900">
                  Skills
                </h2>
                <ReadAloudButton
                  text={`Your skills: ${skills.map((s) => s.name).join(", ")}`}
                  size="md"
                />
              </div>

              {/* Add New Skill */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    placeholder="Add a new skill..."
                    className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2 flex items-center gap-2 group"
                  >
                    <span className="text-sm font-medium text-slate-900">
                      {skill.name}
                    </span>
                    {skill.endorsements ? (
                      <span className="text-xs text-slate-500">
                        ({skill.endorsements})
                      </span>
                    ) : null}
                    <button
                      onClick={() => handleRemoveSkill(skill.id)}
                      className="ml-1 text-slate-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-slate-900">
                  Experience
                </h2>
                <ReadAloudButton
                  text={`Your experience: ${experience.map((e) => `${e.title} at ${e.company}`).join(", ")}`}
                  size="md"
                />
              </div>
              <button
                onClick={handleAddExperience}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Experience
              </button>
            </div>

            {editingExperience && (
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-slate-900">
                  {editingExperience.id === ""
                    ? "New Experience"
                    : "Edit Experience"}
                </h3>

                <input
                  type="text"
                  value={editingExperience.title}
                  onChange={(e) =>
                    setEditingExperience({
                      ...editingExperience,
                      title: e.target.value,
                    })
                  }
                  placeholder="Job Title"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                />

                <input
                  type="text"
                  value={editingExperience.company}
                  onChange={(e) =>
                    setEditingExperience({
                      ...editingExperience,
                      company: e.target.value,
                    })
                  }
                  placeholder="Company"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="month"
                    value={editingExperience.startDate}
                    onChange={(e) =>
                      setEditingExperience({
                        ...editingExperience,
                        startDate: e.target.value,
                      })
                    }
                    placeholder="Start Date"
                    className="px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                  />

                  <input
                    type="month"
                    value={editingExperience.endDate || ""}
                    onChange={(e) =>
                      setEditingExperience({
                        ...editingExperience,
                        endDate: e.target.value,
                      })
                    }
                    placeholder="End Date"
                    disabled={editingExperience.isCurrent}
                    className="px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm disabled:bg-slate-100"
                  />
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingExperience.isCurrent}
                    onChange={(e) =>
                      setEditingExperience({
                        ...editingExperience,
                        isCurrent: e.target.checked,
                        endDate: e.target.checked ? undefined : "",
                      })
                    }
                    className="w-4 h-4 rounded border-slate-300"
                  />
                  <span className="text-sm text-slate-700">
                    I currently work here
                  </span>
                </label>

                <textarea
                  value={editingExperience.description}
                  onChange={(e) =>
                    setEditingExperience({
                      ...editingExperience,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your role and responsibilities..."
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm resize-none"
                  rows={3}
                />

                <div className="flex gap-2">
                  <button
                    onClick={handleSaveExperience}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingExperience(null)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {experience.map((exp) => (
                <div
                  key={exp.id}
                  className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {exp.title}
                      </h4>
                      <p className="text-sm text-slate-600">{exp.company}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 mb-2">
                    {new Date(exp.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}{" "}
                    -{" "}
                    {exp.isCurrent
                      ? "Present"
                      : new Date(exp.endDate || "").toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                          },
                        )}
                  </p>

                  <p className="text-sm text-slate-700">{exp.description}</p>

                  <button
                    onClick={() => setEditingExperience(exp)}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === "education" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-slate-900">
                  Education
                </h2>
                <ReadAloudButton
                  text={`Your education: ${education.map((e) => `${e.field} from ${e.school}`).join(", ")}`}
                  size="md"
                />
              </div>
              <button
                onClick={handleAddEducation}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <Plus className="w-4 h-4" />
                Add Education
              </button>
            </div>

            {editingEducation && (
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 space-y-3">
                <h3 className="font-semibold text-slate-900">
                  {editingEducation.id === ""
                    ? "New Education"
                    : "Edit Education"}
                </h3>

                <input
                  type="text"
                  value={editingEducation.school}
                  onChange={(e) =>
                    setEditingEducation({
                      ...editingEducation,
                      school: e.target.value,
                    })
                  }
                  placeholder="School or Organization"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                />

                <input
                  type="text"
                  value={editingEducation.field}
                  onChange={(e) =>
                    setEditingEducation({
                      ...editingEducation,
                      field: e.target.value,
                    })
                  }
                  placeholder="Field of Study or Certification"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                />

                <input
                  type="text"
                  value={editingEducation.year || ""}
                  onChange={(e) =>
                    setEditingEducation({
                      ...editingEducation,
                      year: e.target.value,
                    })
                  }
                  placeholder="Year (optional)"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                />

                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEducation}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={() => setEditingEducation(null)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="border border-slate-200 rounded-lg p-4 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {edu.field}
                      </h4>
                      <p className="text-sm text-slate-600">{edu.school}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveEducation(edu.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {edu.year && (
                    <p className="text-xs text-slate-500 mb-2">{edu.year}</p>
                  )}

                  <button
                    onClick={() => setEditingEducation(edu)}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerProfile;
