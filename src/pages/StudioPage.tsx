
import { useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import { useSongContext } from "@/contexts/SongContext";
import { SongCard } from "@/components/songs/SongCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { AppWrapper } from "@/components/common/AppWrapper";

export const StudioPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { getSongsByType, createSong } = useSongContext();
  const navigate = useNavigate();
  
  const studioSongs = getSongsByType('studio');
  
  const filteredSongs = searchQuery
    ? studioSongs.filter(song => 
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (song.artist && song.artist.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : studioSongs;
  
  const handleCreateSong = () => {
    const newSong = createSong("New Song");
    navigate(`/song/${newSong.id}`);
  };

  return (
    <AppWrapper title="Studio">
      <main className="flex-1 px-4 py-6">
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
              {searchQuery ? "No songs match your search" : "No songs yet"}
            </div>
          )}
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-notecraft-brown/10 max-w-[390px] mx-auto h-[76px]">
          <Button
            onClick={handleCreateSong}
            className="w-full bg-notecraft-gold hover:bg-notecraft-gold/90 text-white h-[44px]"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Song
          </Button>
        </div>
      </main>
    </AppWrapper>
  );
};

export default StudioPage;
