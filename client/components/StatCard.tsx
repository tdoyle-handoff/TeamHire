import React from "react";

interface StatCardProps {
  number: string | number;
  label: string;
}

export const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
        {number}
      </div>
      <p className="text-sm md:text-base text-muted-foreground">{label}</p>
    </div>
  );
};

export default StatCard;
