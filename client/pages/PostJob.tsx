import React from "react";
import { PlusCircle } from "lucide-react";
import { Placeholder } from "./Placeholder";

export default function PostJob() {
  return (
    <Placeholder
      icon={<PlusCircle className="w-16 h-16 text-natural-green" />}
      title="Post a Job"
      description="Create a new job posting with detailed requirements, pay range, and optional background check or intro video requirements. Connect with qualified workers today."
    />
  );
}
