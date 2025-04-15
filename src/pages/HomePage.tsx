
import { Link } from "react-router-dom";
import { Search, Music, FileMusic, PlusCircle } from "lucide-react";
import { AppWrapper } from "@/components/common/AppWrapper";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSongContext } from "@/contexts/SongContext";
import { useNavigate } from "react-router-dom";
import { FolderSelectionDialog } from "@/components/common/FolderSelectionDialog";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchSongs, createSong } = useSongContext();
  const navigate = useNavigate();
  const [showFolderDialog, setShowFolderDialog] = useState(false);
  
  const filteredSongs = searchQuery ? searchSongs(searchQuery) : [];
  
  const handleCreateSong = (folderId: string) => {
    const newSong = createSong("New Song", "", folderId);
    navigate(`/song/${newSong.id}`);
  };

  return (
    <AppWrapper>
      <main className="flex-1 flex flex-col items-center px-4 py-8 container mx-auto max-w-md">
        <h1 className="text-notecraft-gold font-script text-8xl mb-10 text-center drop-shadow-lg animate-fade-in">Notecraft</h1>
        
        <div className="relative w-full mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-notecraft-brown/60 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search songs..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          {searchQuery && filteredSongs.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-md shadow-lg border border-notecraft-brown/20 z-10 max-h-60 overflow-y-auto">
              {filteredSongs.map(song => (
                <Link
                  key={song.id}
                  to={`/song/${song.id}`}
                  className="block px-4 py-2 hover:bg-notecraft-brown/10 text-notecraft-brown"
                >
                  <div className="flex items-center">
                    <Music className="h-4 w-4 mr-2 opacity-70" />
                    <div>
                      <div className="font-medium">{song.title}</div>
                      {song.artist && (
                        <div className="text-xs text-notecraft-brown/60">{song.artist}</div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <Link 
          to="/folders"
          className="bg-notecraft-brown text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 w-full mb-6"
        >
          <div className="p-8 flex flex-col items-center justify-center">
            <FileMusic className="h-8 w-8 mb-2 opacity-80" />
            <h2 className="text-2xl font-serif">Song Library</h2>
          </div>
        </Link>
        
        <button 
          onClick={() => setShowFolderDialog(true)}
          className="bg-notecraft-gold text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 w-full"
        >
          <div className="p-8 flex flex-col items-center justify-center">
            <PlusCircle className="h-8 w-8 mb-2 opacity-80" />
            <h2 className="text-2xl font-serif">Create New Song</h2>
          </div>
        </button>

        <FolderSelectionDialog
          isOpen={showFolderDialog}
          onClose={() => setShowFolderDialog(false)}
          onFolderSelect={handleCreateSong}
        />
      </main>
    </AppWrapper>
  );
};

export default HomePage;
