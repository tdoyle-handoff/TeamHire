import React, { createContext, useContext, useState } from "react";

export interface ApplicationReference {
  id: string;
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  employer: string;
  workerId: string;
  workerName: string;
  status: "draft" | "submitted" | "under_review" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
  introduction: string;
  videoIntro?: string;
  references: ApplicationReference[];
  availability: {
    startDate: string;
    daysPerWeek: number;
    hoursPerDay: number;
  };
  confirmSkills: string[];
  backgroundCheckConsent: boolean;
  backgroundCheckPassed?: boolean;
}

interface ApplicationContextType {
  applications: JobApplication[];
  currentApplication: JobApplication | null;
  setCurrentApplication: (app: JobApplication | null) => void;
  submitApplication: (application: JobApplication) => void;
  updateApplication: (id: string, updates: Partial<JobApplication>) => void;
  getApplicationsByWorker: (workerId: string) => JobApplication[];
  getApplicationsByJob: (jobId: string) => JobApplication[];
  saveDraft: (application: Partial<JobApplication>) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: "app-1",
      jobId: "1",
      jobTitle: "House Cleaning - 3 Bedroom Home",
      employer: "Sarah M.",
      workerId: "worker-1",
      workerName: "Maria Garcia",
      status: "submitted",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      introduction:
        "I am a dedicated cleaner with 5+ years of experience in residential cleaning.",
      references: [
        {
          id: "ref-1",
          name: "John Smith",
          title: "Previous Employer",
          company: "Smith Residences",
          phone: "(555) 123-4567",
          email: "john@example.com",
        },
      ],
      availability: {
        startDate: "2024-02-01",
        daysPerWeek: 2,
        hoursPerDay: 3,
      },
      confirmSkills: ["House Cleaning", "Detail Oriented"],
      backgroundCheckConsent: true,
      backgroundCheckPassed: true,
    },
  ]);

  const [currentApplication, setCurrentApplication] =
    useState<JobApplication | null>(null);

  const submitApplication = (application: JobApplication) => {
    const newApp = {
      ...application,
      id: `app-${Date.now()}`,
      status: "submitted" as const,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setApplications([...applications, newApp]);
    setCurrentApplication(null);
  };

  const updateApplication = (id: string, updates: Partial<JobApplication>) => {
    setApplications(
      applications.map((app) =>
        app.id === id
          ? {
              ...app,
              ...updates,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : app
      )
    );
  };

  const getApplicationsByWorker = (workerId: string) => {
    return applications.filter((app) => app.workerId === workerId);
  };

  const getApplicationsByJob = (jobId: string) => {
    return applications.filter((app) => app.jobId === jobId);
  };

  const saveDraft = (application: Partial<JobApplication>) => {
    if (currentApplication?.id) {
      updateApplication(currentApplication.id, {
        ...application,
        status: "draft",
      });
    }
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        currentApplication,
        setCurrentApplication,
        submitApplication,
        updateApplication,
        getApplicationsByWorker,
        getApplicationsByJob,
        saveDraft,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplication must be used within ApplicationProvider"
    );
  }
  return context;
};
