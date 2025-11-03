import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";

interface PlaceholderProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ title, description, icon }) => {
  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            {icon && <div className="mb-6 flex justify-center">{icon}</div>}
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              {description}
            </p>
            
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Placeholder;
