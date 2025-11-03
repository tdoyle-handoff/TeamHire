import React, { createContext, useContext, useState } from "react";

export interface CollectiveMember {
  id: string;
  name: string;
  role: string;
  hourlyRate: number;
  avatar?: string;
  joinedDate: string;
}

export interface WorkerCollective {
  id: string;
  name: string;
  description: string;
  members: CollectiveMember[];
  sharedRating?: number;
  totalReviews?: number;
  location: string;
  createdDate: string;
  createdBy: string;
  profileImage?: string;
  isPublic: boolean;
}

interface CollectiveContextType {
  collectives: WorkerCollective[];
  currentCollective: WorkerCollective | null;
  setCurrentCollective: (collective: WorkerCollective | null) => void;
  createCollective: (collective: WorkerCollective) => void;
  updateCollective: (id: string, updates: Partial<WorkerCollective>) => void;
  deleteCollective: (id: string) => void;
  addMemberToCollective: (
    collectiveId: string,
    member: CollectiveMember,
  ) => void;
  removeMemberFromCollective: (collectiveId: string, memberId: string) => void;
  getCollectiveById: (id: string) => WorkerCollective | undefined;
}

const CollectiveContext = createContext<CollectiveContextType | undefined>(
  undefined,
);

export const CollectiveProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collectives, setCollectives] = useState<WorkerCollective[]>([
    {
      id: "collective-1",
      name: "Quick Clean Team",
      description:
        "Professional cleaning service team with 5+ years experience",
      members: [
        {
          id: "member-1",
          name: "Maria Garcia",
          role: "Team Lead",
          hourlyRate: 30,
          joinedDate: "2023-01-15",
        },
        {
          id: "member-2",
          name: "Sofia Rodriguez",
          role: "Cleaner",
          hourlyRate: 25,
          joinedDate: "2023-03-20",
        },
        {
          id: "member-3",
          name: "Ana Martinez",
          role: "Cleaner",
          hourlyRate: 25,
          joinedDate: "2023-05-10",
        },
      ],
      sharedRating: 4.8,
      totalReviews: 47,
      location: "Los Angeles, CA",
      createdDate: "2023-01-15",
      createdBy: "user-1",
      isPublic: true,
    },
  ]);

  const [currentCollective, setCurrentCollective] =
    useState<WorkerCollective | null>(null);

  const createCollective = (collective: WorkerCollective) => {
    setCollectives([...collectives, collective]);
  };

  const updateCollective = (id: string, updates: Partial<WorkerCollective>) => {
    setCollectives(
      collectives.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    );
  };

  const deleteCollective = (id: string) => {
    setCollectives(collectives.filter((c) => c.id !== id));
    if (currentCollective?.id === id) {
      setCurrentCollective(null);
    }
  };

  const addMemberToCollective = (
    collectiveId: string,
    member: CollectiveMember,
  ) => {
    setCollectives(
      collectives.map((c) =>
        c.id === collectiveId ? { ...c, members: [...c.members, member] } : c,
      ),
    );
  };

  const removeMemberFromCollective = (
    collectiveId: string,
    memberId: string,
  ) => {
    setCollectives(
      collectives.map((c) =>
        c.id === collectiveId
          ? { ...c, members: c.members.filter((m) => m.id !== memberId) }
          : c,
      ),
    );
  };

  const getCollectiveById = (id: string) => {
    return collectives.find((c) => c.id === id);
  };

  return (
    <CollectiveContext.Provider
      value={{
        collectives,
        currentCollective,
        setCurrentCollective,
        createCollective,
        updateCollective,
        deleteCollective,
        addMemberToCollective,
        removeMemberFromCollective,
        getCollectiveById,
      }}
    >
      {children}
    </CollectiveContext.Provider>
  );
};

export const useCollective = () => {
  const context = useContext(CollectiveContext);
  if (!context) {
    throw new Error("useCollective must be used within CollectiveProvider");
  }
  return context;
};
