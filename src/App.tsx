import { useEffect } from "react";
import { BrowserRouter, HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { BASE_PATH } from "./basePath";
import SeoSync from "./components/SeoSync";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Challenge from "./pages/Challenge";
import Project from "./pages/Project";
import Architecture from "./pages/Architecture";
import Technology from "./pages/Technology";
import Platform from "./pages/Platform";
import DashboardPage from "./pages/DashboardPage";
import MobileAppPage from "./pages/MobileAppPage";
import IntelligencePage from "./pages/IntelligencePage";
import Indicators from "./pages/Indicators";
import DataSourcesPage from "./pages/DataSourcesPage";
import RelatedProjectsPage from "./pages/RelatedProjectsPage";
import References from "./pages/References";
import BlogPage from "./pages/BlogPage";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [location.key]);
  return null;
}

/* Clean URLs need a server; when the site is opened straight from disk
 * (file://) fall back to hash routing so menu links resolve locally.
 * Over HTTP the router is mounted under BASE_PATH so the same build works
 * at the domain root and under a sub-path (e.g. GitHub project pages). */
const isFile = window.location.protocol === "file:";
const Router = isFile ? HashRouter : BrowserRouter;
const routerProps = isFile ? {} : { basename: BASE_PATH || undefined };

export default function App() {
  return (
    <Router {...routerProps}>
      <SeoSync />
      <ScrollToTop />
      <div className="flex min-h-screen flex-col bg-cream">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/challenge" element={<Challenge />} />
            <Route path="/about/project" element={<Project />} />
            <Route path="/about/architecture" element={<Architecture />} />
            <Route path="/about/technology" element={<Technology />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/platform/dashboard" element={<DashboardPage />} />
            <Route path="/platform/mobile-app" element={<MobileAppPage />} />
            <Route path="/platform/intelligence" element={<IntelligencePage />} />
            <Route path="/indicators" element={<Indicators />} />
            <Route path="/resources/data-sources" element={<DataSourcesPage />} />
            <Route path="/resources/related-projects" element={<RelatedProjectsPage />} />
            <Route path="/resources/references" element={<References />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
