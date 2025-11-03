import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SignUp() {
  const navigate = useNavigate();
  const { signUp, error, clearError } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<"role" | "details">("role");
  const [role, setRole] = useState<"worker" | "employer" | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (selectedRole: "worker" | "employer") => {
    setRole(selectedRole);
    setStep("details");
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!displayName || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signUp(email, password, role!, displayName);
      toast({
        title: "Success",
        description: "Your account has been created successfully",
      });
      navigate(role === "employer" ? "/employer-dashboard" : "/dashboard");
    } catch (err) {
      toast({
        title: "Sign Up Failed",
        description:
          error || (err instanceof Error ? err.message : "An error occurred"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4 py-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
            <p className="text-slate-600 mt-2">Join TeamHire today</p>
          </div>

          {step === "role" ? (
            // Role Selection
            <div className="space-y-4">
              {/* Worker Option */}
              <button
                onClick={() => handleRoleSelect("worker")}
                className="w-full p-6 border-2 border-slate-200 rounded-lg hover:border-[#24405A] hover:bg-[#24405A]/5 transition-all text-left"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      I'm looking for work
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Find and apply to job opportunities
                    </p>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                </div>
              </button>

              {/* Employer Option */}
              <button
                onClick={() => handleRoleSelect("employer")}
                className="w-full p-6 border-2 border-slate-200 rounded-lg hover:border-[#3BA55C] hover:bg-[#3BA55C]/5 transition-all text-left"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      I'm hiring workers
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Post jobs and find talented workers
                    </p>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                </div>
              </button>

              {/* Sign In Link */}
              <p className="text-center text-slate-600 mt-6">
                Already have an account?{" "}
                <Link
                  to="/sign-in"
                  className="text-[#24405A] font-medium hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          ) : (
            // Account Details Form
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 space-y-6">
              {/* Back Button */}
              <button
                type="button"
                onClick={() => setStep("role")}
                className="text-sm text-slate-600 hover:text-slate-900 font-medium"
              >
                ← Back to role selection
              </button>

              {/* Role Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg w-fit">
                <CheckCircle className="w-4 h-4 text-[#3BA55C]" />
                <span className="text-sm font-medium text-slate-900 capitalize">
                  {role === "worker" ? "Looking for work" : "Hiring workers"}
                </span>
              </div>

              {/* Display Name */}
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-slate-900 mb-2">
                  Full Name
                </label>
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Must be at least 6 characters
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-900 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24405A] focus:border-transparent"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-2.5 bg-[#24405A] text-white font-medium rounded-lg hover:opacity-95 disabled:opacity-50 transition-all"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>

              {/* Terms */}
              <p className="text-xs text-slate-600 text-center">
                By signing up, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </form>
          )}
        </div>
      </section>
    </Layout>
  );
}
