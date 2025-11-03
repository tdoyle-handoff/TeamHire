import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn, error, clearError } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await signIn(email, password);
      toast({
        title: "Success",
        description: "You have been signed in successfully",
      });
      navigate("/dashboard");
    } catch (err) {
      toast({
        title: "Sign In Failed",
        description:
          error || (err instanceof Error ? err.message : "An error occurred"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    clearError();

    setIsLoading(true);

    try {
      await signIn(demoEmail, demoPassword);
      toast({
        title: "Success",
        description: "Demo account signed in successfully",
      });
      navigate("/dashboard");
    } catch (err) {
      setEmail(demoEmail);
      setPassword(demoPassword);
      toast({
        title: "Demo Account Not Found",
        description:
          "Demo account credentials have been pre-filled. Please sign up first or try with your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Sign In</h1>
            <p className="text-slate-600 mt-2">Access your TeamHire account</p>
          </div>

          {/* Demo Login Buttons */}
          <div className="mb-6 space-y-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-900 mb-3">
              🎯 Quick Demo Login:
            </p>
            <button
              type="button"
              onClick={() =>
                handleDemoLogin("demo.employer@teamhire.com", "Demo123!@#")
              }
              disabled={isLoading}
              className="w-full px-4 py-2.5 bg-[#3BA55C] text-white font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-all text-sm"
            >
              👔 Demo Employer
            </button>
            <button
              type="button"
              onClick={() =>
                handleDemoLogin("demo.worker@teamhire.com", "Demo123!@#")
              }
              disabled={isLoading}
              className="w-full px-4 py-2.5 bg-[#24405A] text-white font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-all text-sm"
            >
              👷 Demo Worker
            </button>
            <p className="text-xs text-blue-700 mt-2">
              Demo credentials will be pre-filled and auto-login.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-sm p-8 space-y-6"
          >
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-900 mb-2"
              >
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-900 mb-2"
              >
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
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-slate-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              className="text-[#24405A] font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
