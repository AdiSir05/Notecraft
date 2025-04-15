
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSongContext } from "@/contexts/SongContext";
import { useNavigate } from "react-router-dom";

interface CreateSongButtonProps {
  folderId?: string;
  type?: 'library' | 'studio';
}

export const CreateSongButton = ({ folderId, type = 'library' }: CreateSongButtonProps) => {
  const { createSong } = useSongContext();
  const navigate = useNavigate();
  
  const handleCreateSong = () => {
    const folderToUse = folderId || (type === 'studio' ? 'studio' : 'library');
    const newSong = createSong("New Song", "", folderToUse);
    navigate(`/song/${newSong.id}`);
  };

  return (
    <Button
      onClick={handleCreateSong}
      className="w-full bg-notecraft-gold hover:bg-notecraft-gold/90 text-white"
    >
      <PlusCircle className="mr-2 h-4 w-4" />
      Create New Song
    </Button>
  );
};
