
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PlusCircle, ChevronLeft, Search, Trash2 } from "lucide-react";
import { useSongContext } from "@/contexts/SongContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SongCard } from "@/components/songs/SongCard";
import { AppWrapper } from "@/components/common/AppWrapper";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export const FolderPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [songToDelete, setSongToDelete] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { folders, getFolderSongs, createSong, deleteSong } = useSongContext();
  const { toast } = useToast();
  
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

  const handleDeleteSong = (songId: string) => {
    setSongToDelete(songId);
  };

  const confirmDelete = () => {
    if (songToDelete) {
      deleteSong(songToDelete);
      toast({
        title: "Song deleted",
        description: "The song has been successfully deleted.",
      });
      setSongToDelete(null);
    }
  };
  
  if (!folder) {
    return (
      <AppWrapper>
        <main className="flex-1 container mx-auto px-4 py-6 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-medium text-notecraft-brown mb-4">Folder not found</h2>
            <Button onClick={() => navigate(-1)}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </main>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper title={folder.name}>
      <main className="flex-1 px-4 py-6">
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
        
        <div className="grid grid-cols-1 gap-4 mb-[76px]">
          {filteredSongs.length > 0 ? (
            filteredSongs.map(song => (
              <div key={song.id} className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteSong(song.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-notecraft-brown/60 hover:text-red-500" />
                </Button>
                <SongCard song={song} />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-notecraft-brown/60">
              {searchQuery ? "No songs match your search" : "No songs in this folder yet"}
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

        <AlertDialog open={!!songToDelete} onOpenChange={() => setSongToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the song.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setSongToDelete(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </AppWrapper>
  );
};

export default FolderPage;
