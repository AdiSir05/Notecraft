
import { Song } from "@/types";

interface SongViewerProps {
  song: Song;
}

export const SongViewer = ({ song }: SongViewerProps) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl text-notecraft-gold font-script mb-2">{song.title}</h1>
        {song.artist && (
          <h2 className="text-base uppercase tracking-wider text-notecraft-brown/80">{song.artist}</h2>
        )}
      </div>

      <div className="space-y-12">
        {song.sections.map((section) => (
          <div key={section.id} className="space-y-6">
            <h3 className="text-2xl font-medium text-notecraft-brown mb-6 pb-2 border-b border-notecraft-brown/10">
              {section.name}
            </h3>
            
            <div className="space-y-8">
              {section.lines.map((line) => (
                <div key={line.id} className="relative leading-relaxed">
                  <div className="flex flex-wrap gap-x-2">
                    {line.words && Array.isArray(line.words) ? (
                      line.words.map((word) => (
                        <div key={word.id} className="relative inline-flex flex-col items-center min-h-[3rem]">
                          {word.chord && (
                            <span className="absolute -top-7 text-notecraft-gold text-lg font-semibold whitespace-nowrap font-mono">
                              {word.chord.name}
                            </span>
                          )}
                          <span className="text-notecraft-brown text-xl font-medium">
                            {word.text || <span className="text-notecraft-brown/30 italic">...</span>}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-notecraft-brown text-xl font-medium">
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

