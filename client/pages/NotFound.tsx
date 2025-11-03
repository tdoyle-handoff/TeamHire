import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              The page you're looking for doesn't exist. Check the URL and try again,
              or return to the home page.
            </p>

            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Home
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
