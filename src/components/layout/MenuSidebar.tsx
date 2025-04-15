
import { Folder, Music, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSongContext } from "@/contexts/SongContext";
import { cn } from "@/lib/utils";

interface MenuSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuSidebar = ({ isOpen, onClose }: MenuSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { folders, searchSongs } = useSongContext();
  
  const filteredSongs = searchQuery ? searchSongs(searchQuery) : [];
  
  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 transition-opacity z-40 max-w-[390px] mx-auto",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      <div 
        className={cn(
          "fixed top-0 left-0 h-full bg-white border-r border-notecraft-brown/20 shadow-lg transition-all duration-300 z-50 w-[280px] max-w-[390px]",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-notecraft-brown/60 h-4 w-4" />
            <input
              type="text"
              placeholder="Search songs..."
              className="w-full pl-9 pr-4 py-2 rounded-md border border-notecraft-brown/30 focus:outline-none focus:ring-1 focus:ring-notecraft-gold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {searchQuery && filteredSongs.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm text-notecraft-brown/70 mb-2">Search Results</h3>
              <div className="space-y-1">
                {filteredSongs.map(song => (
                  <Link
                    key={song.id}
                    to={`/song/${song.id}`}
                    className="block px-2 py-1 hover:bg-notecraft-brown/10 rounded text-notecraft-brown"
                    onClick={onClose}
                  >
                    <Music className="inline-block mr-2 h-4 w-4" />
                    {song.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-1 mb-4">
            {folders
              .filter(folder => folder.type === 'library' || folder.type === 'studio')
              .map(folder => (
                <Link
                  key={folder.id}
                  to={`/folder/${folder.id}`}
                  className="flex items-center px-2 py-1.5 hover:bg-notecraft-brown/10 rounded text-notecraft-brown"
                  onClick={onClose}
                >
                  <Folder className="mr-2 h-4 w-4" />
                  <span className="text-sm">{folder.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
