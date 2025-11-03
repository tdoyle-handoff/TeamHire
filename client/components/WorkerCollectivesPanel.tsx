import React, { useState } from "react";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Share2,
  Star,
  MapPin,
  X,
  Save,
  Copy,
} from "lucide-react";
import { useCollective, CollectiveMember, WorkerCollective } from "@/contexts/CollectiveContext";
import { useToast } from "@/hooks/use-toast";

export const WorkerCollectivesPanel: React.FC = () => {
  const { collectives, createCollective, updateCollective, deleteCollective, addMemberToCollective, removeMemberFromCollective } = useCollective();
  const { toast } = useToast();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCollective, setEditingCollective] = useState<WorkerCollective | null>(null);
  const [showMemberForm, setShowMemberForm] = useState<string | null>(null);
  const [copiedInviteId, setCopiedInviteId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
  });

  const [memberData, setMemberData] = useState({
    name: "",
    role: "",
    hourlyRate: "",
  });

  const handleCreateCollective = () => {
    if (!formData.name || !formData.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newCollective: WorkerCollective = {
      id: `collective-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      location: formData.location,
      members: [],
      createdDate: new Date().toISOString().split("T")[0],
      createdBy: "current-user",
      isPublic: false,
    };

    createCollective(newCollective);
    setFormData({ name: "", description: "", location: "" });
    setShowCreateForm(false);

    toast({
      title: "Success",
      description: "Collective created successfully!",
    });
  };

  const handleAddMember = (collectiveId: string) => {
    if (!memberData.name || !memberData.role || !memberData.hourlyRate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newMember: CollectiveMember = {
      id: `member-${Date.now()}`,
      name: memberData.name,
      role: memberData.role,
      hourlyRate: parseFloat(memberData.hourlyRate),
      joinedDate: new Date().toISOString().split("T")[0],
    };

    addMemberToCollective(collectiveId, newMember);
    setMemberData({ name: "", role: "", hourlyRate: "" });
    setShowMemberForm(null);

    toast({
      title: "Success",
      description: "Member added to collective!",
    });
  };

  const handleRemoveMember = (collectiveId: string, memberId: string) => {
    removeMemberFromCollective(collectiveId, memberId);
    toast({
      title: "Success",
      description: "Member removed from collective",
    });
  };

  const handleDeleteCollective = (id: string) => {
    if (confirm("Are you sure you want to delete this collective?")) {
      deleteCollective(id);
      toast({
        title: "Success",
        description: "Collective deleted",
      });
    }
  };

  const handleCopyInvite = (collectiveId: string) => {
    const inviteLink = `${window.location.origin}/join-collective/${collectiveId}`;
    navigator.clipboard.writeText(inviteLink);
    setCopiedInviteId(collectiveId);
    setTimeout(() => setCopiedInviteId(null), 2000);
    toast({
      title: "Copied",
      description: "Invite link copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Worker Collectives
          </h2>
          <p className="text-slate-600 mt-1">
            Team up with other workers and market yourselves together
          </p>
        </div>
        <button
          onClick={() => {
            setShowCreateForm(true);
            setEditingCollective(null);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Collective
        </button>
      </div>

      {/* Create/Edit Form */}
      {showCreateForm && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <h3 className="font-semibold text-slate-900">
            {editingCollective ? "Edit Collective" : "Create New Collective"}
          </h3>

          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Collective Name (e.g., Quick Clean Team)"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
          />

          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe your collective's strengths and experience..."
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm resize-none"
            rows={3}
          />

          <input
            type="text"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            placeholder="Service Location (e.g., Los Angeles, CA)"
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
          />

          <div className="flex gap-2">
            <button
              onClick={handleCreateCollective}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Create
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setFormData({ name: "", description: "", location: "" });
              }}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Collectives List */}
      <div className="space-y-4">
        {collectives.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 mb-4">No collectives yet</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Create your first collective
            </button>
          </div>
        ) : (
          collectives.map((collective) => (
            <div
              key={collective.id}
              className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition-colors"
            >
              {/* Collective Header */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {collective.name}
                    </h3>
                    <p className="text-slate-600 mt-1">
                      {collective.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyInvite(collective.id)}
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Copy invite link"
                    >
                      <Copy className={copiedInviteId === collective.id ? "w-5 h-5 text-green-600" : "w-5 h-5"} />
                    </button>
                    <button
                      onClick={() => handleDeleteCollective(collective.id)}
                      className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete collective"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    {collective.location}
                  </div>
                  {collective.sharedRating && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Star className="w-4 h-4 text-yellow-400" />
                      {collective.sharedRating.toFixed(1)} ({collective.totalReviews || 0} reviews)
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="w-4 h-4" />
                    {collective.members.length} member{collective.members.length !== 1 ? "s" : ""}
                  </div>
                </div>
              </div>

              {/* Members Section */}
              <div className="p-6 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-900">Team Members</h4>
                  <button
                    onClick={() => setShowMemberForm(collective.id)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Member
                  </button>
                </div>

                {/* Add Member Form */}
                {showMemberForm === collective.id && (
                  <div className="bg-white border border-blue-200 rounded-lg p-4 mb-4 space-y-3">
                    <input
                      type="text"
                      value={memberData.name}
                      onChange={(e) =>
                        setMemberData({ ...memberData, name: e.target.value })
                      }
                      placeholder="Member Name"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                    />
                    <input
                      type="text"
                      value={memberData.role}
                      onChange={(e) =>
                        setMemberData({ ...memberData, role: e.target.value })
                      }
                      placeholder="Role (e.g., Lead, Specialist)"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                    />
                    <input
                      type="number"
                      value={memberData.hourlyRate}
                      onChange={(e) =>
                        setMemberData({ ...memberData, hourlyRate: e.target.value })
                      }
                      placeholder="Hourly Rate"
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-blue-500 focus:outline-none text-sm"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddMember(collective.id)}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                      >
                        Add Member
                      </button>
                      <button
                        onClick={() => {
                          setShowMemberForm(null);
                          setMemberData({ name: "", role: "", hourlyRate: "" });
                        }}
                        className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Members List */}
                {collective.members.length === 0 ? (
                  <p className="text-slate-600 text-sm">No members yet</p>
                ) : (
                  <div className="space-y-2">
                    {collective.members.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-slate-900">
                            {member.name}
                          </p>
                          <p className="text-sm text-slate-600">
                            {member.role} • ${member.hourlyRate}/hr
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            handleRemoveMember(collective.id, member.id)
                          }
                          className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Collective Actions */}
              <div className="p-6 flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  View Public Profile
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkerCollectivesPanel;
