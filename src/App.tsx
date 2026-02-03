import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MobileApp from "./pages/MobileApp";
import PrayerTimesLayout from "./pages/PrayerTimesLayout";
import AboutUs from "./pages/AboutUs";
import Projects from "./pages/Projects";
import Courses from "./pages/Courses";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Auth from "./pages/Auth";
import AdminPanel from "./pages/AdminPanel";
import AdminPostManagement from "./pages/AdminPostManagement";
import AdminPrayerTimes from "./pages/AdminPrayerTimes";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Mobile App Route - für native iOS/Android App (ohne Navbar/Footer) */}
          <Route path="/app" element={<MobileApp />} />
          
          {/* Website Routes - mit Navbar/Footer */}
          <Route path="/" element={<><Navbar /><Index /><Footer /></>} />
          <Route path="/gebetszeiten" element={<><Navbar /><PrayerTimesLayout /><Footer /></>} />
          <Route path="/about" element={<><Navbar /><AboutUs /><Footer /></>} />
          <Route path="/projects" element={<><Navbar /><Projects /><Footer /></>} />
          <Route path="/courses" element={<><Navbar /><Courses /><Footer /></>} />
          <Route path="/news" element={<><Navbar /><News /><Footer /></>} />
          <Route path="/news/:id" element={<><Navbar /><NewsDetail /><Footer /></>} />
          <Route path="/auth" element={<><Navbar /><Auth /><Footer /></>} />
          <Route path="/admin" element={<><Navbar /><AdminPanel /><Footer /></>} />
          <Route path="/admin/posts" element={<><Navbar /><AdminPostManagement /><Footer /></>} />
          <Route path="/admin/prayer-times" element={<><Navbar /><AdminPrayerTimes /><Footer /></>} />
          <Route path="/privacy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
          <Route path="*" element={<><Navbar /><NotFound /><Footer /></>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
