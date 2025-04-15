import { useState } from "react";
import { Search } from "lucide-react";
import { useSongContext } from "@/contexts/SongContext";
import { Header } from "@/components/layout/Header";
import { MenuSidebar } from "@/components/layout/MenuSidebar";
import { SongCard } from "@/components/songs/SongCard";
import { Input } from "@/components/ui/input";

export const LibraryPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getSongsByType } = useSongContext();
  
  const librarySongs = getSongsByType('library');
  
  const filteredSongs = searchQuery
    ? librarySongs.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (song.artist && song.artist.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : librarySongs;

  return (
    <div className="min-h-screen flex flex-col bg-notecraft-light">
      <Header 
        title="Library" 
        toggleMenu={() => setMenuOpen(!menuOpen)} 
      />
      <MenuSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-md">
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
        
        <div className="grid grid-cols-1 gap-4">
          {filteredSongs.length > 0 ? (
            filteredSongs.map(song => (
              <SongCard key={song.id} song={song} />
            ))
          ) : (
            <div className="text-center py-8 text-notecraft-brown/60">
              {searchQuery ? "No songs match your search" : "No songs yet"}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LibraryPage;
