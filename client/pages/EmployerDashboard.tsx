import React from "react";
import { Briefcase } from "lucide-react";
import { Placeholder } from "./Placeholder";

export default function EmployerDashboard() {
  return (
    <Placeholder
      icon={<Briefcase className="w-16 h-16 text-natural-green" />}
      title="Employer Dashboard"
      description="Manage your job postings, view candidate profiles, filter applications, and communicate with workers. Everything you need to build your team."
    />
  );
}
