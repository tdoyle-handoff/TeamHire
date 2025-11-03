import React from "react";
import { Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  role,
  rating,
}) => {
  return (
    <div className="bg-white border border-border rounded-xl p-6">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-warm-neutral fill-warm-neutral" : "text-muted"
            }`}
          />
        ))}
      </div>
      <p className="text-muted-foreground mb-4 italic">"{quote}"</p>
      <div>
        <p className="font-semibold text-foreground">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  );
};

export default Testimonial;
