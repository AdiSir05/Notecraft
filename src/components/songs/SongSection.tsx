
import { useState } from "react";
import { SongSection as SongSectionType } from "@/types";
import { useSongContext } from "@/contexts/SongContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";
import { LyricsLine } from "@/components/songs/LyricsLine";

interface SongSectionProps {
  songId: string;
  section: SongSectionType;
}

export const SongSection = ({ songId, section }: SongSectionProps) => {
  const { updateSectionName, addLineToSection, removeLineFromSection } = useSongContext();
  const [sectionName, setSectionName] = useState(section.name);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSectionName(e.target.value);
  };

  const handleNameBlur = () => {
    updateSectionName(songId, section.id, sectionName);
  };

  const handleDeleteLine = (lineId: string) => {
    removeLineFromSection(songId, section.id, lineId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-notecraft-brown/10">
      <Input
        value={sectionName}
        onChange={handleNameChange}
        onBlur={handleNameBlur}
        className="font-medium text-notecraft-brown mb-3 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-notecraft-brown/5 transition-colors text-lg"
      />
      
      <div className="space-y-4">
        {section.lines.map((line) => (
          <div key={line.id} className="relative pl-6">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => handleDeleteLine(line.id)}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 h-6 w-6 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
            <LyricsLine 
              songId={songId} 
              sectionId={section.id} 
              line={line} 
            />
          </div>
        ))}
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => addLineToSection(songId, section.id)}
        className="mt-3 text-notecraft-brown/70 hover:text-notecraft-brown hover:bg-notecraft-brown/10"
      >
        <PlusCircle className="h-3 w-3 mr-1" />
        Add Line
      </Button>
    </div>
  );
};
