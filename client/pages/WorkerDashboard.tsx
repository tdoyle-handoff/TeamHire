import React from "react";
import { Users } from "lucide-react";
import { Placeholder } from "./Placeholder";

export default function WorkerDashboard() {
  return (
    <Placeholder
      icon={<Users className="w-16 h-16 text-primary" />}
      title="Worker Dashboard"
      description="View your profile, saved jobs, applications, and messages. This page will show your complete dashboard with all your work opportunities and communications."
    />
  );
}
