import React, { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, Settings, Shield, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

export type UserRole = "worker" | "employer" | null;

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const location = useLocation();

  const toggleRole = () => {
    setUserRole((prev) => {
      if (prev === "worker") return "employer";
      if (prev === "employer") return null;
      return "worker";
    });
  };

  const navLinks: Array<{ href: string; label: string; icon?: any }> = [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/categories", label: "Categories" },
    { href: "/safety-privacy", label: "Safety & Privacy", icon: Shield },
    { href: "/about", label: "About" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Logo showText={false} size="md" />
              <span className="text-xl font-bold text-foreground hidden sm:inline">
                TeamHire
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "text-sm font-medium transition-colors flex items-center gap-1.5",
                      isActive(link.href)
                        ? "text-primary border-b-2 border-primary pb-1"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {userRole && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-sm font-medium text-foreground">
                  <span className="capitalize">{userRole}</span>
                </div>
              )}

              <button
                onClick={toggleRole}
                className={cn(
                  "hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm",
                  userRole
                    ? "bg-secondary text-foreground hover:bg-secondary/80"
                    : "bg-primary text-white hover:bg-primary/90",
                )}
              >
                {userRole ? "Sign Out" : "Sign In"}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden flex flex-col gap-3 pt-3 border-t border-border">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg font-medium transition-colors text-sm",
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-secondary",
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={toggleRole}
                className={cn(
                  "w-full px-3 py-2 rounded-lg font-medium transition-all text-sm mt-2",
                  userRole
                    ? "bg-secondary text-foreground hover:bg-secondary/80"
                    : "bg-primary text-white hover:bg-primary/90",
                )}
              >
                {userRole ? "Sign Out" : "Sign In"}
              </button>
              {userRole && (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Logged in as:{" "}
                  <span className="capitalize font-medium">{userRole}</span>
                </div>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-muted mt-16 border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-muted-blue to-natural-green rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  TH
                </div>
                <span className="font-bold text-foreground">TeamHire</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Work with dignity. Hire with trust.
              </p>
            </div>

            {/* For Workers */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">
                For Workers
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-foreground transition-colors"
                  >
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-foreground transition-colors"
                  >
                    Your Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/safety-privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    Your Privacy
                  </Link>
                </li>
              </ul>
            </div>

            {/* For Employers */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">
                For Employers
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/workers"
                    className="hover:text-foreground transition-colors"
                  >
                    Find Workers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="hover:text-foreground transition-colors"
                  >
                    Your Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/post-job"
                    className="hover:text-foreground transition-colors"
                  >
                    Post a Job
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/safety-privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    Safety & Privacy
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:hello@teamhire.com"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground mb-6">
              <p>&copy; 2024 TeamHire. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="w-3.5 h-3.5 text-natural-green" />
              <span>Privacy Protected</span>
              <span>•</span>
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span>Verified Employers</span>
              <span>•</span>
              <CheckCircle className="w-3.5 h-3.5 text-natural-green" />
              <span>Fair Hiring Pledge</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
