
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Profile";
import { Subscription } from "./pages/Subscription";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <SignedIn>
                  <Index />
                </SignedIn>
                <SignedOut>
                  <Navigate to="/login" replace />
                </SignedOut>
              </Layout>
            }
          />
          <Route
            path="/assessments"
            element={
              <Layout>
                <SignedIn>
                  <Index />
                </SignedIn>
              </Layout>
            }
          />
          <Route
            path="/nutritionist"
            element={
              <Layout>
                <SignedIn>
                  <Index />
                </SignedIn>
              </Layout>
            }
          />
          <Route
            path="/reports"
            element={
              <Layout>
                <SignedIn>
                  <Index />
                </SignedIn>
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <SignedIn>
                  <Settings />
                </SignedIn>
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <SignedIn>
                  <Profile />
                </SignedIn>
              </Layout>
            }
          />
          <Route
            path="/subscription"
            element={
              <Layout>
                <SignedIn>
                  <Subscription />
                </SignedIn>
              </Layout>
            }
          />
          <Route
            path="/support"
            element={
              <Layout>
                <SignedIn>
                  <Index />
                </SignedIn>
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <SignedOut>
                  <Login />
                </SignedOut>
                <SignedIn>
                  <Navigate to="/dashboard" replace />
                </SignedIn>
              </>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
