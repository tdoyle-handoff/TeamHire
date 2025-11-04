import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ViewModeProvider } from "@/contexts/ViewModeContext";
import { CollectiveProvider } from "@/contexts/CollectiveContext";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { ApplicationProvider } from "@/contexts/ApplicationContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import WorkerDashboard from "./pages/WorkerDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";
import SafetyPrivacy from "./pages/SafetyPrivacy";
import About from "./pages/About";
import FindWork from "./pages/FindWork";
import HireWorkers from "./pages/HireWorkers";
import PostJob from "./pages/PostJob";
import HowItWorks from "./pages/HowItWorks";
import Categories from "./pages/Categories";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Messages from "./pages/Messages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AccessibilityProvider>
          <ViewModeProvider>
            <CollectiveProvider>
              <ApplicationProvider>
                <AuthProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path="/dashboard" element={<WorkerDashboard />} />
                    <Route
                      path="/employer-dashboard"
                      element={<EmployerDashboard />}
                    />
                    <Route path="/safety-privacy" element={<SafetyPrivacy />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/find-work" element={<FindWork />} />
                    <Route path="/jobs" element={<FindWork />} />
                    <Route path="/hire-workers" element={<HireWorkers />} />
                    <Route path="/workers" element={<HireWorkers />} />
                    <Route path="/post-job" element={<PostJob />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
                </AuthProvider>
              </ApplicationProvider>
            </CollectiveProvider>
          </ViewModeProvider>
        </AccessibilityProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
