
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSongContext } from "@/contexts/SongContext";
import { Header } from "@/components/layout/Header";
import { MenuSidebar } from "@/components/layout/MenuSidebar";
import { SongEditor } from "@/components/songs/SongEditor";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Trash2 } from "lucide-react";

export const SongPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { songs, deleteSong, setCurrentSong } = useSongContext();
  
  const song = songs.find(s => s.id === id);
  
  useEffect(() => {
    if (song) {
      setCurrentSong(song);
    }
    
    return () => {
      setCurrentSong(null);
    };
  }, [song, setCurrentSong]);
  
  const handleDeleteSong = () => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      deleteSong(id!);
      navigate(-1);
    }
  };
  
  if (!song) {
    return (
      <div className="min-h-screen flex flex-col bg-notecraft-light">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-medium text-notecraft-brown mb-4">Song not found</h2>
            <Button onClick={() => navigate(-1)}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-notecraft-light">
      <Header 
        title={song.title}
        toggleMenu={() => setMenuOpen(!menuOpen)} 
      />
      <MenuSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-md">
        <div className="flex justify-between mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-notecraft-brown"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <Button
            variant="ghost"
            onClick={handleDeleteSong}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <SongEditor song={song} />
      </main>
    </div>
  );
};

export default SongPage;
