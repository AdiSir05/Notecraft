
import { useState } from "react";
import { SongSection as SongSectionType } from "@/types";
import { useSongContext } from "@/contexts/SongContext";
import { LyricsLine } from "@/components/songs/LyricsLine";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Check } from "lucide-react";

interface SongSectionProps {
  songId: string;
  section: SongSectionType;
}

export const SongSection = ({ songId, section }: SongSectionProps) => {
  const { addLineToSection, updateSong } = useSongContext();
  const [editingName, setEditingName] = useState(false);
  const [sectionName, setSectionName] = useState(section.name);

  const handleSaveSectionName = () => {
    updateSong({
      id: songId,
      sections: [{
        ...section,
        name: sectionName
      }]
    } as any); // Type shortcut for demo purposes
    setEditingName(false);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center mb-2">
        {editingName ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              className="text-sm font-medium px-2 py-1 border border-notecraft-brown/30 rounded focus:outline-none focus:ring-1 focus:ring-notecraft-gold"
              autoFocus
            />
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={handleSaveSectionName}
              className="h-8 w-8 text-notecraft-brown"
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <>
            <h3 className="text-sm font-medium text-notecraft-brown">{section.name}</h3>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={() => setEditingName(true)}
              className="h-8 w-8 ml-1 text-notecraft-brown/60 hover:text-notecraft-brown"
            >
              <Edit className="h-3 w-3" />
            </Button>
          </>
        )}
      </div>
      
      <div className="space-y-4">
        {section.lines.map((line) => (
          <LyricsLine
            key={line.id}
            songId={songId}
            sectionId={section.id}
            line={line}
          />
        ))}
        
        <Button
          variant="ghost"
          onClick={() => addLineToSection(songId, section.id)}
          className="text-notecraft-brown/60 hover:text-notecraft-brown hover:bg-notecraft-brown/10 flex items-center w-full justify-center"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Line
        </Button>
      </div>
    </div>
  );
};
