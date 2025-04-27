
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
  name: string;
  lines: SongLine[];
}

export interface SongLine {
  id: string;
  lyrics: string;
  words: Word[];
}

export interface Word {
  id: string;
  text: string;
  chord?: Chord;
}

export interface Chord {
  id: string;
  name: string; // e.g., "G", "Am", "F#m7"
}

export interface Folder {
  id: string;
  name: string;
  type: 'library' | 'studio';
  songs: string[];
}
