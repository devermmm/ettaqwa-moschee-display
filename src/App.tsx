import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gebetszeiten" element={<PrayerTimesLayout />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/posts" element={<AdminPostManagement />} />
          <Route path="/admin/prayer-times" element={<AdminPrayerTimes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
