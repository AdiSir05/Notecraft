import { useState } from "react";
import { Song } from "@/types";
import { useSongContext } from "@/contexts/SongContext";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SongSection } from "@/components/songs/SongSection";

interface SongEditorProps {
  song: Song;
}

export const SongEditor = ({ song }: SongEditorProps) => {
  const { updateSong, addSectionToSong, removeSectionFromSong } = useSongContext();
  const [editTitle, setEditTitle] = useState(song.title);
  const [editArtist, setEditArtist] = useState(song.artist || "");

  const handleUpdateTitle = () => {
    updateSong({
      ...song,
      title: editTitle
    });
  };

  const handleUpdateArtist = () => {
    updateSong({
      ...song,
      artist: editArtist
    });
  };

  const handleDeleteSection = (sectionId: string) => {
    removeSectionFromSong(song.id, sectionId);
  };

  return (
    <div className="p-4">
      <div className="mb-6 text-center">
        <Input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleUpdateTitle}
          className="text-3xl text-notecraft-gold font-script text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Input
          value={editArtist}
          onChange={(e) => setEditArtist(e.target.value)}
          onBlur={handleUpdateArtist}
          placeholder="Artist"
          className="text-sm uppercase tracking-wider text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-notecraft-brown/70"
        />
      </div>

      <div className="space-y-6">
        {song.sections.map((section) => (
          <div key={section.id} className="relative">
            <div className="absolute right-0 top-0">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleDeleteSection(section.id)}
                className="h-6 w-6 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <SongSection 
              key={section.id} 
              songId={song.id} 
              section={section} 
            />
          </div>
        ))}
        
        <Button
          variant="outline"
          onClick={() => addSectionToSong(song.id)}
          className="border-notecraft-brown/30 text-notecraft-brown hover:bg-notecraft-brown/10 flex items-center w-full justify-center"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>
    </div>
  );
};
