
import { useState } from "react";
import { ChordButton } from "@/components/ui/chord-button";

const COMMON_CHORDS = [
  "C", "Cm", "C7",
  "D", "Dm", "D7",
  "E", "Em", "E7",
  "F", "Fm", "F7",
  "G", "Gm", "G7",
  "A", "Am", "A7",
  "B", "Bm", "B7",
];

interface ChordSelectorProps {
  onSelectChord: (chord: string) => void;
}

export const ChordSelector = ({ onSelectChord }: ChordSelectorProps) => {
  const [selectedChord, setSelectedChord] = useState<string>("C");
  const [customChord, setCustomChord] = useState<string>("");

  const handleChordSelect = (chord: string) => {
    setSelectedChord(chord);
    onSelectChord(chord);
  };

  const handleCustomChordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customChord.trim()) {
      handleChordSelect(customChord.trim());
      setCustomChord("");
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h3 className="text-lg font-medium text-notecraft-brown mb-2">Select a Chord</h3>
      
      <div className="flex flex-wrap gap-2">
        {COMMON_CHORDS.map((chord) => (
          <ChordButton
            key={chord}
            chordName={chord}
            active={selectedChord === chord}
            onClick={() => handleChordSelect(chord)}
          />
        ))}
      </div>
      
      <div className="border-t border-notecraft-brown/20 pt-4 mt-4">
        <form onSubmit={handleCustomChordSubmit} className="flex gap-2">
          <input
            type="text"
            value={customChord}
            onChange={(e) => setCustomChord(e.target.value)}
            placeholder="Custom chord (e.g. F#m7)"
            className="flex-1 h-10 px-3 py-2 text-sm rounded-md border border-notecraft-brown/30 focus:outline-none focus:ring-2 focus:ring-notecraft-gold"
          />
          <button
            type="submit"
            className="h-10 px-4 rounded-md bg-notecraft-gold text-white hover:bg-notecraft-gold/90"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
