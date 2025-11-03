import React from "react";
import { Users } from "lucide-react";
import { Placeholder } from "./Placeholder";

export default function HireWorkers() {
  return (
    <Placeholder
      icon={<Users className="w-16 h-16 text-natural-green" />}
      title="Hire Workers"
      description="Browse verified worker profiles, filter by skills and location, and start building your team. Find trustworthy professionals for your projects."
    />
  );
}
