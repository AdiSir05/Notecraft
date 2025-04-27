
import { Song } from "@/types";

interface SongViewerProps {
  song: Song;
}

export const SongViewer = ({ song }: SongViewerProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="mb-8 text-center">
        <h1 className="text-3xl text-notecraft-gold font-script mb-1">{song.title}</h1>
        {song.artist && (
          <h2 className="text-sm uppercase tracking-wider text-notecraft-brown/70">{song.artist}</h2>
        )}
      </div>

      <div className="space-y-8">
        {song.sections.map((section) => (
          <div key={section.id} className="space-y-4">
            <h3 className="text-xl font-medium text-notecraft-brown/90 mb-8">{section.name}</h3>
            
            <div className="space-y-6">
              {section.lines.map((line) => (
                <div key={line.id} className="relative leading-loose">
                  <div className="flex flex-wrap gap-x-1">
                    {line.words && Array.isArray(line.words) ? (
                      line.words.map((word) => (
                        <div key={word.id} className="relative inline-flex flex-col items-center">
                          {word.chord && (
                            <span className="absolute -top-6 text-notecraft-gold text-base font-semibold whitespace-nowrap">
                              {word.chord.name}
                            </span>
                          )}
                          <span className="text-notecraft-brown text-lg">
                            {word.text || <span className="text-notecraft-brown/30 italic">...</span>}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-notecraft-brown text-lg">
                        {line.lyrics || <span className="text-notecraft-brown/30 italic">No lyrics</span>}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
