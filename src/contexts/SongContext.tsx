import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Song, Folder, SongSection, SongLine, Chord } from "@/types";
import { sampleSongs, sampleFolders } from "@/lib/sample-data";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

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
  deleteFolder: (folderId: string) => void;
  getSongsByType: (type: 'library' | 'studio') => Song[];
  addSectionToSong: (songId: string) => void;
  removeSectionFromSong: (songId: string, sectionId: string) => void;
  updateSectionName: (songId: string, sectionId: string, name: string) => void;
  addLineToSection: (songId: string, sectionId: string) => void;
  removeLineFromSection: (songId: string, sectionId: string, lineId: string) => void;
  updateLyrics: (songId: string, sectionId: string, lineId: string, lyrics: string) => void;
  addChordToLine: (songId: string, sectionId: string, lineId: string, chordName: string, position: number) => void;
  updateChord: (songId: string, sectionId: string, lineId: string, chordId: string, chordName: string) => void;
  removeChord: (songId: string, sectionId: string, lineId: string, chordId: string) => void;
  transposeSong: (songId: string, semitones: number) => void;
  favoriteFolders: string[];
  toggleFavoriteFolder: (folderId: string) => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

const transposeChord = (chordName: string, semitones: number): string => {
  const chordPattern = /^([A-G][#b]?)(.*)$/;
  const match = chordName.match(chordPattern);
  
  if (!match) return chordName; // Not a valid chord name
  
  const rootNote = match[1];
  const chordType = match[2];
  
  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  const normalizedRoot = rootNote
    .replace('Bb', 'A#')
    .replace('Db', 'C#')
    .replace('Eb', 'D#')
    .replace('Gb', 'F#')
    .replace('Ab', 'G#');
  
  const noteIndex = notes.indexOf(normalizedRoot);
  if (noteIndex === -1) return chordName; // Not found in our notes array
  
  const newIndex = (noteIndex + semitones + 12) % 12;
  return notes[newIndex] + chordType;
};

export const SongProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[]>(sampleSongs);
  const [folders, setFolders] = useState<Folder[]>(sampleFolders);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [favoriteFolders, setFavoriteFolders] = useState<string[]>([]);

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

  useEffect(() => {
    localStorage.setItem('songs', JSON.stringify(songs));
  }, [songs]);

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteFolders');
    if (savedFavorites) {
      setFavoriteFolders(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteFolders', JSON.stringify(favoriteFolders));
  }, [favoriteFolders]);

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
    
    const updatedFolders = folders.map(folder => ({
      ...folder,
      songs: folder.songs.filter(id => id !== songId)
    }));
    setFolders(updatedFolders);
  };

  const searchSongs = (query: string): Song[] => {
    if (!query) return [];
    
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

  const deleteFolder = (folderId: string) => {
    setFolders(folders.filter(folder => folder.id !== folderId));
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

  const removeSectionFromSong = (songId: string, sectionId: string) => {
    setSongs(songs.map(song => {
      if (song.id === songId) {
        return {
          ...song,
          sections: song.sections.filter(section => section.id !== sectionId),
          lastEdited: new Date()
        };
      }
      return song;
    }));
  };

  const updateSectionName = (songId: string, sectionId: string, name: string) => {
    setSongs(songs.map(song => {
      if (song.id === songId) {
        return {
          ...song,
          sections: song.sections.map(section => {
            if (section.id === sectionId) {
              return { ...section, name };
            }
            return section;
          }),
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

  const removeLineFromSection = (songId: string, sectionId: string, lineId: string) => {
    setSongs(songs.map(song => {
      if (song.id === songId) {
        return {
          ...song,
          sections: song.sections.map(section => {
            if (section.id === sectionId) {
              return {
                ...section,
                lines: section.lines.filter(line => line.id !== lineId)
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

  const transposeSong = (songId: string, semitones: number) => {
    setSongs(songs.map(song => {
      if (song.id === songId) {
        return {
          ...song,
          sections: song.sections.map(section => {
            return {
              ...section,
              lines: section.lines.map(line => {
                return {
                  ...line,
                  chords: line.chords.map(chord => {
                    return {
                      ...chord,
                      name: transposeChord(chord.name, semitones)
                    };
                  })
                };
              })
            };
          }),
          lastEdited: new Date()
        };
      }
      return song;
    }));
  };

  const toggleFavoriteFolder = (folderId: string) => {
    if (favoriteFolders.includes(folderId)) {
      setFavoriteFolders(favoriteFolders.filter(id => id !== folderId));
    } else {
      if (favoriteFolders.length >= 4) {
        toast.error("You can only favorite up to 4 folders");
        return;
      }
      setFavoriteFolders([...favoriteFolders, folderId]);
    }
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
      deleteFolder,
      getSongsByType,
      addSectionToSong,
      removeSectionFromSong,
      updateSectionName,
      addLineToSection,
      removeLineFromSection,
      updateLyrics,
      addChordToLine,
      updateChord,
      removeChord,
      transposeSong,
      favoriteFolders,
      toggleFavoriteFolder,
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
