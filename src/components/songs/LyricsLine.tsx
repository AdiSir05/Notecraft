
import { useState, useRef } from "react";
import { SongLine } from "@/types";
import { useSongContext } from "@/contexts/SongContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { ChordSelector } from "@/components/songs/ChordSelector";

interface LyricsLineProps {
  songId: string;
  sectionId: string;
  line: SongLine;
}

export const LyricsLine = ({ songId, sectionId, line }: LyricsLineProps) => {
  const { updateLyrics, addChordToLine, updateChord, removeChord } = useSongContext();
  const [showAddChord, setShowAddChord] = useState(false);
  const [newChordName, setNewChordName] = useState("C");
  const [chordPosition, setChordPosition] = useState(0);
  const [showChordSelector, setShowChordSelector] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);

  const handleLyricsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLyrics(songId, sectionId, line.id, e.target.value);
  };

  const handleAddChord = () => {
    addChordToLine(songId, sectionId, line.id, newChordName, chordPosition);
    setShowAddChord(false);
    setNewChordName("C");
  };

  const handleLineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!lineRef.current) return;

    const rect = lineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const lineWidth = rect.width;
    const position = Math.floor((clickX / lineWidth) * (line.lyrics.length || 1));

    setChordPosition(position);
    setShowAddChord(true);
    setShowChordSelector(true);
  };

  const handleSelectChord = (chord: string) => {
    setNewChordName(chord);
    setShowChordSelector(false);
  };

  // Sort chords by position to ensure proper display order
  const sortedChords = [...line.chords].sort((a, b) => a.position - b.position);

  return (
    <div className="space-y-2 lyrics-line">
      <div className="flex flex-wrap gap-1">
        {sortedChords.map((chord, index) => (
          <div 
            key={chord.id}
            className="relative mr-1 mb-2"
            style={{ 
              marginLeft: index === 0 ? chord.position * 8 : 
                (chord.position - sortedChords[index-1].position) * 8 
            }}
          >
            <div className="flex items-center">
              <Input
                value={chord.name}
                onChange={(e) => updateChord(songId, sectionId, line.id, chord.id, e.target.value)}
                className="w-16 h-8 px-2 py-1 text-sm font-medium text-notecraft-gold"
              />
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeChord(songId, sectionId, line.id, chord.id)}
                className="h-6 w-6 ml-1 text-notecraft-brown/60 hover:text-notecraft-brown hover:bg-transparent touch-target"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div 
        ref={lineRef}
        onClick={handleLineClick}
        className="relative cursor-pointer rounded-md"
      >
        <Input
          value={line.lyrics}
          onChange={handleLyricsChange}
          placeholder="Tap to enter lyrics..."
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-notecraft-brown/5 transition-colors text-notecraft-brown min-h-10"
        />
      </div>

      {showAddChord && !showChordSelector && (
        <div className="flex items-center space-x-2 mt-2">
          <Input
            value={newChordName}
            onChange={(e) => setNewChordName(e.target.value)}
            className="w-24 text-sm"
          />
          <Button 
            size="sm"
            onClick={handleAddChord}
            className="touch-target"
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            Add
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => setShowAddChord(false)}
            className="touch-target"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowChordSelector(true)}
            className="touch-target"
          >
            Select
          </Button>
        </div>
      )}

      {showChordSelector && (
        <div className="bg-white rounded-lg shadow-md mt-2 border border-notecraft-brown/20">
          <div className="flex justify-between items-center p-2 border-b border-notecraft-brown/20">
            <h4 className="text-sm font-medium text-notecraft-brown">Choose a Chord</h4>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setShowChordSelector(false)}
              className="h-6 w-6 text-notecraft-brown/60 hover:text-notecraft-brown"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ChordSelector onSelectChord={(chord) => {
            setNewChordName(chord);
            setShowChordSelector(false);
            handleAddChord();
          }} />
        </div>
      )}
    </div>
  );
};
