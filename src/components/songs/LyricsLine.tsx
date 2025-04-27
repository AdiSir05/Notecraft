
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
    const newText = e.target.value;
    const existingWords = line.words && Array.isArray(line.words) ? line.words : [];
    const existingWordMap = new Map<string, Word>();
    
    // Create a map of text -> word with chord data
    existingWords.forEach(word => {
      if (word.chord) {
        existingWordMap.set(word.text, word);
      }
    });
    
    // Create new words array, preserving chord data where possible
    const words: Word[] = newText.split(/\s+/)
      .filter(word => word.length > 0)
      .map(wordText => {
        // Check if this word text existed before and had a chord
        const existingWord = existingWordMap.get(wordText);
        if (existingWord) {
          // Preserve the existing word with its chord
          return existingWord;
        } else {
          // Create a new word
          return {
            id: uuidv4(),
            text: wordText
          };
        }
      });
    
    updateLyrics(songId, sectionId, line.id, newText, words);
  };

  const handleChordSelect = (wordId: string, chordName: string) => {
    if (!line.words || !Array.isArray(line.words)) return;
    
    const updatedWords = line.words.map(word => {
      if (word.id === wordId) {
        return {
          ...word,
          chord: {
            id: uuidv4(),
            name: chordName
          }
        };
      }
      return word;
    });
    
    updateLyrics(songId, sectionId, line.id, line.lyrics, updatedWords);
    setSelectedWordId(null);
  };

  const removeChord = (wordId: string) => {
    if (!line.words || !Array.isArray(line.words)) return;
    
    const updatedWords = line.words.map(word => {
      if (word.id === wordId) {
        const { chord, ...rest } = word;
        return rest;
      }
      return word;
    });
    
    updateLyrics(songId, sectionId, line.id, line.lyrics, updatedWords);
  };

  // Ensure words is an array before mapping
  const words = line.words && Array.isArray(line.words) ? line.words : [];

  return (
    <div className="space-y-1 lyrics-line">
      <div className="flex flex-wrap gap-x-1">
        {words.map((word) => (
          <div key={word.id} className="relative group">
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
                variant="ghost"
                size="icon"
                className="absolute -top-6 left-1/2 -translate-x-1/2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={() => setSelectedWordId(word.id)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            )}
            <span>{word.text}</span>
          </div>
        ))}
      </div>

      <Input
        value={line.lyrics}
        onChange={handleLyricsChange}
        placeholder="Tap to enter lyrics..."
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-notecraft-brown/5 transition-colors text-notecraft-brown min-h-10"
      />

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
