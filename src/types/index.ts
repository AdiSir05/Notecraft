
export interface Song {
  id: string;
  title: string;
  artist?: string;
  sections: SongSection[];
  lastEdited: Date;
  folder: string;
}

export interface SongSection {
  id: string;
  name: string; // e.g., "Intro", "Verse 1", "Chorus"
  lines: SongLine[];
}

export interface SongLine {
  id: string;
  lyrics: string;
  chords: Chord[];
}

export interface Chord {
  id: string;
  name: string; // e.g., "G", "Am", "F#m7"
  position: number; // Position in the lyric line
}

export interface Folder {
  id: string;
  name: string;
  type: 'library' | 'studio';
  songs: string[]; // Array of song IDs
}
