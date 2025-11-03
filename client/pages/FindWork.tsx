import React from "react";
import { Briefcase } from "lucide-react";
import { Placeholder } from "./Placeholder";

export default function FindWork() {
  return (
    <Placeholder
      icon={<Briefcase className="w-16 h-16 text-primary" />}
      title="Find Work"
      description="Browse available jobs from verified employers. Filter by location, pay, skills, and more. This page will show all current job opportunities."
    />
  );
}
