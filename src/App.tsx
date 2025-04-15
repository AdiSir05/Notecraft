
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SongProvider } from "./contexts/SongContext";
import HomePage from "./pages/HomePage";
import LibraryPage from "./pages/LibraryPage";
import StudioPage from "./pages/StudioPage";
import SongPage from "./pages/SongPage";
import FolderPage from "./pages/FolderPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SongProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<Navigate to="/" replace />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/studio" element={<StudioPage />} />
            <Route path="/song/:id" element={<SongPage />} />
            <Route path="/folder/:id" element={<FolderPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SongProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
