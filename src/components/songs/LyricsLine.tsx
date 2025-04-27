
import { useState } from "react";
import { SongLine, Word } from "@/types";
import { useSongContext } from "@/contexts/SongContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { ChordSelector } from "@/components/songs/ChordSelector";
import { v4 as uuidv4 } from 'uuid';

interface LyricsLineProps {
  songId: string;
  sectionId: string;
  line: SongLine;
}

export const LyricsLine = ({ songId, sectionId, line }: LyricsLineProps) => {
  const { updateLyrics } = useSongContext();
  const [selectedWordId, setSelectedWordId] = useState<string | null>(null);

  const handleLyricsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // ... keep existing code (splitting lyrics text into words and preserving chord data)
  };

  const handleChordSelect = (wordId: string, chordName: string) => {
    // ... keep existing code (updating chord for the selected word)
  };

  const removeChord = (wordId: string) => {
    // ... keep existing code (removing chord from a word)
  };

  // Ensure words is an array before mapping
  const words = line.words && Array.isArray(line.words) ? line.words : [];

  return (
    <div className="space-y-1 lyrics-line">
      <div className="relative">
        {/* This displays the chord buttons and hover targets above the words */}
        <div className="flex flex-wrap gap-x-1 mt-2 mb-1">
          {words.map((word, index) => (
            <div key={word.id} className="relative group">
              <span className="text-notecraft-brown">
                {word.text}
              </span>
              
              {/* Chord display or add button that appears on hover */}
              {word.chord ? (
                <div className="absolute -top-6 left-0">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-5 px-1 py-0 text-xs font-medium text-notecraft-gold"
                      onClick={() => setSelectedWordId(word.id)}
                    >
                      {word.chord.name}
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeChord(word.id)}
                      className="h-4 w-4 text-notecraft-brown/60 hover:text-notecraft-brown hover:bg-transparent"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute -top-6 left-1/2 -translate-x-1/2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full bg-notecraft-gold border-none"
                  onClick={() => setSelectedWordId(word.id)}
                >
                  <Plus className="h-3 w-3 text-white" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Input for editing lyrics */}
        <Input
          value={line.lyrics}
          onChange={handleLyricsChange}
          placeholder="Tap to enter lyrics..."
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-notecraft-brown/5 transition-colors text-notecraft-brown"
        />
      </div>

      {selectedWordId !== null && (
        <div className="bg-white rounded-lg shadow-md mt-2 border border-notecraft-brown/20">
          <div className="flex justify-between items-center p-2 border-b border-notecraft-brown/20">
            <h4 className="text-sm font-medium text-notecraft-brown">Choose a Chord</h4>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setSelectedWordId(null)}
              className="h-6 w-6 text-notecraft-brown/60 hover:text-notecraft-brown"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ChordSelector onSelectChord={(chord) => handleChordSelect(selectedWordId, chord)} />
        </div>
      )}
    </div>
  );
};
