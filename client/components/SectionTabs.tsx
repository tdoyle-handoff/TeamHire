import React from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  sectionId: string;
}

interface SectionTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const SectionTabs: React.FC<SectionTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="border-b border-slate-200 bg-white sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                onTabChange(tab.id);
                const element = document.getElementById(tab.sectionId);
                element?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={cn(
                "px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px",
                activeTab === tab.id
                  ? "text-slate-900 border-[#24405A]"
                  : "text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionTabs;
