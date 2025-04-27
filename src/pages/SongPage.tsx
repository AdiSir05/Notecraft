
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSongContext } from "@/contexts/SongContext";
import { SongEditor } from "@/components/songs/SongEditor";
import { SongViewer } from "@/components/songs/SongViewer";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Trash2, Eye, Edit, Save, Music } from "lucide-react";
import { AppWrapper } from "@/components/common/AppWrapper";

export const SongPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { songs, deleteSong, setCurrentSong, updateSong, transposeSong } = useSongContext();
  
  const song = songs.find(s => s.id === id);
  
  const isNewSong = song && song.sections.every(section => 
    section.lines.every(line => !line.lyrics && (!line.words || line.words.length === 0))
  );
  
  const [editMode, setEditMode] = useState(isNewSong);
  
  useEffect(() => {
    if (song) {
      setCurrentSong(song);
    }
    
    return () => {
      setCurrentSong(null);
    };
  }, [song, setCurrentSong]);
  
  const handleDeleteSong = () => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      deleteSong(id!);
      navigate(-1);
    }
  };

  const handleTranspose = (semitones: number) => {
    if (song) {
      transposeSong(song.id, semitones);
    }
  };

  const handleSave = () => {
    if (song) {
      // Make sure each line has a words array before saving
      const updatedSong = {
        ...song,
        sections: song.sections.map(section => ({
          ...section,
          lines: section.lines.map(line => {
            // If words is undefined or empty but lyrics exist, create words from lyrics
            if ((!line.words || line.words.length === 0) && line.lyrics) {
              const { v4: uuidv4 } = require('uuid');
              return {
                ...line,
                words: line.lyrics.split(/\s+/).filter(word => word.length > 0).map(text => ({
                  id: uuidv4(),
                  text
                }))
              };
            }
            return line;
          })
        }))
      };
      
      updateSong({
        ...updatedSong,
        lastEdited: new Date()
      });
    }
  };
  
  if (!song) {
    return (
      <AppWrapper>
        <main className="flex-1 px-4 py-6 flex flex-col items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-medium text-notecraft-brown mb-4">Song not found</h2>
            <Button onClick={() => navigate(-1)}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </main>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper title={song.title}>
      <main className="flex-1 px-4 py-6">
        <div className="flex justify-between mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-notecraft-brown"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setEditMode(!editMode)}
              className="text-notecraft-brown"
            >
              {editMode ? <Eye className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
              {editMode ? "View" : "Edit"}
            </Button>
            
            {editMode && (
              <>
                <Button
                  variant="outline"
                  onClick={handleSave}
                  className="text-notecraft-brown"
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleDeleteSong}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
        
        {editMode && (
          <div className="mb-4 bg-white p-3 rounded-lg shadow-sm border border-notecraft-brown/10">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleTranspose(-1)}
                  className="h-8 px-2"
                >
                  -1
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleTranspose(1)}
                  className="h-8 px-2"
                >
                  +1
                </Button>
              </div>
              <div className="flex items-center">
                <Music className="h-4 w-4 mr-2 text-notecraft-brown/60" />
                <span className="text-sm text-notecraft-brown/60">Transpose</span>
              </div>
            </div>
          </div>
        )}
        
        {editMode ? <SongEditor song={song} /> : <SongViewer song={song} />}
      </main>
    </AppWrapper>
  );
};

export default SongPage;
