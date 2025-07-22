import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import StudentDashboard from "pages/student-dashboard";
import AiCareerCoachChat from "pages/ai-career-coach-chat";
import AdminDashboard from "pages/admin-dashboard";
import LearningResources from "pages/learning-resources";
import CareerDiscoveryFlow from "pages/career-discovery-flow";
import UniversityFinder from "pages/university-finder";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/ai-career-coach-chat" element={<AiCareerCoachChat />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/learning-resources" element={<LearningResources />} />
        <Route path="/career-discovery-flow" element={<CareerDiscoveryFlow />} />
        <Route path="/university-finder" element={<UniversityFinder />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;