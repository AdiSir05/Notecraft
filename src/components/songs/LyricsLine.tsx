
import { useState, useRef } from "react";
import { SongLine } from "@/types";
import { useSongContext } from "@/contexts/SongContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { ChordSelector } from "@/components/songs/ChordSelector";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface LyricsLineProps {
  songId: string;
  sectionId: string;
  line: SongLine;
}

export const LyricsLine = ({ songId, sectionId, line }: LyricsLineProps) => {
  const { updateLyrics, addChordToLine, updateChord, removeChord } = useSongContext();
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const handleLyricsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLyrics(songId, sectionId, line.id, e.target.value);
  };

  const words = line.lyrics.split(/(\s+)/).filter(word => word.trim().length > 0);
  const wordPositions = words.reduce<number[]>((acc, word, index) => {
    const position = line.lyrics.indexOf(word, index === 0 ? 0 : acc[index - 1]);
    acc.push(position);
    return acc;
  }, []);

  const getChordAtPosition = (position: number) => {
    return line.chords.find(chord => chord.position === position);
  };

  const handleSelectChord = (position: number, chord: string) => {
    const existingChord = getChordAtPosition(position);
    if (existingChord) {
      updateChord(songId, sectionId, line.id, existingChord.id, chord);
    } else {
      addChordToLine(songId, sectionId, line.id, chord, position);
    }
    setSelectedPosition(null);
  };

  return (
    <div className="space-y-1 lyrics-line">
      <div className="flex flex-wrap gap-x-1 min-h-[24px]">
        {words.map((word, index) => {
          const position = wordPositions[index];
          const chord = getChordAtPosition(position);
          
          return (
            <div key={index} className="relative group">
              {chord ? (
                <div className="absolute -top-6 left-0">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-5 px-1 py-0 text-xs font-medium text-notecraft-gold"
                      onClick={() => setSelectedPosition(position)}
                    >
                      {chord.name}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeChord(songId, sectionId, line.id, chord.id)}
                      className="h-4 w-4 text-notecraft-brown/60 hover:text-notecraft-brown hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-6 left-1/2 -translate-x-1/2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setSelectedPosition(position)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              )}
              <span>{word}</span>
            </div>
          );
        })}
      </div>

      <Input
        value={line.lyrics}
        onChange={handleLyricsChange}
        placeholder="Tap to enter lyrics..."
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-notecraft-brown/5 transition-colors text-notecraft-brown min-h-10"
      />

      {selectedPosition !== null && (
        <div className="bg-white rounded-lg shadow-md mt-2 border border-notecraft-brown/20">
          <div className="flex justify-between items-center p-2 border-b border-notecraft-brown/20">
            <h4 className="text-sm font-medium text-notecraft-brown">Choose a Chord</h4>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setSelectedPosition(null)}
              className="h-6 w-6 text-notecraft-brown/60 hover:text-notecraft-brown"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ChordSelector onSelectChord={(chord) => handleSelectChord(selectedPosition, chord)} />
        </div>
      )}
    </div>
  );
};
