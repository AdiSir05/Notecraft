
import { Song } from "@/types";
import { Link } from "react-router-dom";

interface SongPreviewProps {
  song: Song;
}

export const SongPreview = ({ song }: SongPreviewProps) => {
  // Get first few lines for preview
  const previewLines = song.sections
    .flatMap(section => section.lines)
    .filter(line => line.lyrics.trim().length > 0)
    .slice(0, 3);

  return (
    <Link to={`/song/${song.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border border-notecraft-brown/10 p-4 hover:border-notecraft-brown/30 transition-colors">
        <h3 className="text-lg font-medium text-notecraft-gold mb-1">{song.title}</h3>
        {song.artist && (
          <p className="text-xs uppercase tracking-wider text-notecraft-brown/60 mb-3">{song.artist}</p>
        )}
        
        <div className="space-y-1 text-sm text-notecraft-brown/80">
          {previewLines.length > 0 ? (
            previewLines.map((line, index) => (
              <p key={index} className="truncate">
                {line.lyrics || <span className="italic text-notecraft-brown/40">Empty line</span>}
              </p>
            ))
          ) : (
            <p className="italic text-notecraft-brown/40">No lyrics yet</p>
          )}
          
          {song.sections.flatMap(s => s.lines).length > 3 && (
            <p className="text-xs text-notecraft-brown/40 italic">
              {song.sections.flatMap(s => s.lines).length - 3} more lines...
            </p>
          )}
        </div>
        
        <p className="text-xs text-right mt-2 text-notecraft-brown/40">
          Last edited {new Date(song.lastEdited).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
};
