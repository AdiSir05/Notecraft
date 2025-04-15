
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PlusCircle, ChevronLeft, Search } from "lucide-react";
import { useSongContext } from "@/contexts/SongContext";
import { Header } from "@/components/layout/Header";
import { MenuSidebar } from "@/components/layout/MenuSidebar";
import { SongCard } from "@/components/songs/SongCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const FolderPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { folders, getFolderSongs, createSong } = useSongContext();
  
  const folder = folders.find(f => f.id === id);
  const folderSongs = getFolderSongs(id || "");
  
  const filteredSongs = searchQuery
    ? folderSongs.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (song.artist && song.artist.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : folderSongs;
  
  const handleCreateSong = () => {
    const newSong = createSong("New Song", "", id);
    navigate(`/song/${newSong.id}`);
  };
  
  if (!folder) {
    return (
      <div className="min-h-screen flex flex-col bg-notecraft-light">
        <Header />
        
        <main className="flex-1 container mx-auto px-4 py-6 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-medium text-notecraft-brown mb-4">Folder not found</h2>
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
        title={folder.name}
        toggleMenu={() => setMenuOpen(!menuOpen)} 
      />
      <MenuSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-md">
        <div className="flex justify-start mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-notecraft-brown"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-notecraft-brown/60 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search songs..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-4 mb-6">
          {filteredSongs.length > 0 ? (
            filteredSongs.map(song => (
              <SongCard key={song.id} song={song} />
            ))
          ) : (
            <div className="text-center py-8 text-notecraft-brown/60">
              {searchQuery ? "No songs match your search" : "No songs in this folder yet"}
            </div>
          )}
        </div>
        
        <Button
          onClick={handleCreateSong}
          className="w-full bg-notecraft-gold hover:bg-notecraft-gold/90 text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Song
        </Button>
      </main>
    </div>
  );
};

export default FolderPage;
