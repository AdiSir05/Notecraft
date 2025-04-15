
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Song, Folder, SongSection, SongLine, Chord } from "@/types";
import { sampleSongs, sampleFolders } from "@/lib/sample-data";
import { v4 as uuidv4 } from 'uuid';

interface SongContextType {
  songs: Song[];
  folders: Folder[];
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;
  createSong: (title: string, artist?: string, folderId?: string) => Song;
  updateSong: (song: Song) => void;
  deleteSong: (songId: string) => void;
  searchSongs: (query: string) => Song[];
  getFolderSongs: (folderId: string) => Song[];
  createFolder: (name: string, type: 'library' | 'studio') => Folder;
  getSongsByType: (type: 'library' | 'studio') => Song[];
  addSectionToSong: (songId: string) => void;
  addLineToSection: (songId: string, sectionId: string) => void;
  updateLyrics: (songId: string, sectionId: string, lineId: string, lyrics: string) => void;
  addChordToLine: (songId: string, sectionId: string, lineId: string, chordName: string, position: number) => void;
  updateChord: (songId: string, sectionId: string, lineId: string, chordId: string, chordName: string) => void;
  removeChord: (songId: string, sectionId: string, lineId: string, chordId: string) => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[]>(sampleSongs);
  const [folders, setFolders] = useState<Folder[]>(sampleFolders);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  // Load from localStorage if available
  useEffect(() => {
    const savedSongs = localStorage.getItem('songs');
    const savedFolders = localStorage.getItem('folders');
    
    if (savedSongs) {
      setSongs(JSON.parse(savedSongs));
    }
    
    if (savedFolders) {
      setFolders(JSON.parse(savedFolders));
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('songs', JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  const createSong = (title: string, artist?: string, folderId?: string): Song => {
    const newSong: Song = {
      id: uuidv4(),
      title,
      artist: artist || '',
      sections: [
        {
          id: uuidv4(),
          name: "[Verse 1]",
          lines: [
            {
              id: uuidv4(),
              lyrics: "",
              chords: []
            }
          ]
        }
      ],
      lastEdited: new Date(),
      folder: folderId || 'unsorted'
    };

    setSongs([...songs, newSong]);

    // If folderId is provided, add song to folder
    if (folderId) {
      const updatedFolders = folders.map(folder => {
        if (folder.id === folderId) {
          return {
            ...folder,
            songs: [...folder.songs, newSong.id]
          };
        }
        return folder;
      });
      setFolders(updatedFolders);
    }

    return newSong;
  };

  const updateSong = (updatedSong: Song) => {
    setSongs(songs.map(song => 
      song.id === updatedSong.id ? { ...updatedSong, lastEdited: new Date() } : song
    ));
  };

  const deleteSong = (songId: string) => {
    setSongs(songs.filter(song => song.id !== songId));
    
    // Remove song from any folders
    const updatedFolders = folders.map(folder => ({
      ...folder,
      songs: folder.songs.filter(id => id !== songId)
    }));
    setFolders(updatedFolders);
  };

  const searchSongs = (query: string): Song[] => {
    if (!query) return songs;
    
    const lowerQuery = query.toLowerCase();
    return songs.filter(song => 
      song.title.toLowerCase().includes(lowerQuery) || 
      (song.artist && song.artist.toLowerCase().includes(lowerQuery))
    );
  };

  const getFolderSongs = (folderId: string): Song[] => {
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return [];
    
    return songs.filter(song => folder.songs.includes(song.id));
  };

  const createFolder = (name: string, type: 'library' | 'studio'): Folder => {
    const newFolder: Folder = {
      id: uuidv4(),
      name,
      type,
      songs: []
    };
    
    setFolders([...folders, newFolder]);
    return newFolder;
  };

  const getSongsByType = (type: 'library' | 'studio'): Song[] => {
    const folderIds = folders
      .filter(folder => folder.type === type)
      .map(folder => folder.id);
    
    return songs.filter(song => 
      folderIds.some(id => {
        const folder = folders.find(f => f.id === id);
        return folder && folder.songs.includes(song.id);
      })
    );
  };

  const addSectionToSong = (songId: string) => {
    setSongs(songs.map(song => {
      if (song.id === songId) {
        const sectionCount = song.sections.length + 1;
        const newSection: SongSection = {
          id: uuidv4(),
          name: `[Verse ${sectionCount}]`,
          lines: [
            {
              id: uuidv4(),
              lyrics: "",
              chords: []
            }
          ]
        };
        
        return {
          ...song,
          sections: [...song.sections, newSection],
          lastEdited: new Date()
        };
      }
      return song;
    }));
  };

  const addLineToSection = (songId: string, sectionId: string) => {
    setSongs(songs.map(song => {
      if (song.id === songId) {
        return {
          ...song,
          sections: song.sections.map(section => {
            if (section.id === sectionId) {
              const newLine: SongLine = {
                id: uuidv4(),
                lyrics: "",
                chords: []
              };
              
              return {
                ...section,
                lines: [...section.lines, newLine]
              };
            }
            return section;
          }),
          lastEdited: new Date()
        };
      }
      return song;
    }));
  };

  const updateLyrics = (songId: string, sectionId: string, lineId: string, lyrics: string) => {
    setSongs(songs.map(song => {
      if (song.id === songId) {
        return {
          ...song,
          sections: song.sections.map(section => {
            if (section.id === sectionId) {
              return {
                ...section,
                lines: section.lines.map(line => {
                  if (line.id === lineId) {
                    return { ...line, lyrics };
                  }
                  return line;
                })
              };
            }
            return section;
          }),
          lastEdited: new Date()
        };
      }
      return song;
    }));
  };

  const addChordToLine = (songId: string, sectionId: string, lineId: string, chordName: string, position: number) => {
    setSongs(songs.map(song => {
      if (song.id === songId) {
        return {
          ...song,
          sections: song.sections.map(section => {
            if (section.id === sectionId) {
              return {
                ...section,
                lines: section.lines.map(line => {
                  if (line.id === lineId) {
                    const newChord: Chord = {
                      id: uuidv4(),
                      name: chordName,
                      position
                    };
                    
                    return {
                      ...line,
                      chords: [...line.chords, newChord]
                    };
                  }
                  return line;
                })
              };
            }
            return section;
          }),
          lastEdited: new Date()
        };
      }
      return song;
    }));
  };

  const updateChord = (songId: string, sectionId: string, lineId: string, chordId: string, chordName: string) => {
    setSongs(songs.map(song => {
      if (song.id === songId) {
        return {
          ...song,
          sections: song.sections.map(section => {
            if (section.id === sectionId) {
              return {
                ...section,
                lines: section.lines.map(line => {
                  if (line.id === lineId) {
                    return {
                      ...line,
                      chords: line.chords.map(chord => {
                        if (chord.id === chordId) {
                          return { ...chord, name: chordName };
                        }
                        return chord;
                      })
                    };
                  }
                  return line;
                })
              };
            }
            return section;
          }),
          lastEdited: new Date()
        };
      }
      return song;
    }));
  };

  const removeChord = (songId: string, sectionId: string, lineId: string, chordId: string) => {
    setSongs(songs.map(song => {
      if (song.id === songId) {
        return {
          ...song,
          sections: song.sections.map(section => {
            if (section.id === sectionId) {
              return {
                ...section,
                lines: section.lines.map(line => {
                  if (line.id === lineId) {
                    return {
                      ...line,
                      chords: line.chords.filter(chord => chord.id !== chordId)
                    };
                  }
                  return line;
                })
              };
            }
            return section;
          }),
          lastEdited: new Date()
        };
      }
      return song;
    }));
  };

  return (
    <SongContext.Provider value={{
      songs,
      folders,
      currentSong,
      setCurrentSong,
      createSong,
      updateSong,
      deleteSong,
      searchSongs,
      getFolderSongs,
      createFolder,
      getSongsByType,
      addSectionToSong,
      addLineToSection,
      updateLyrics,
      addChordToLine,
      updateChord,
      removeChord
    }}>
      {children}
    </SongContext.Provider>
  );
};

export const useSongContext = () => {
  const context = useContext(SongContext);
  if (context === undefined) {
    throw new Error("useSongContext must be used within a SongProvider");
  }
  return context;
};
