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
                <div key={line.id} className="relative">
                  {line.chords.length > 0 && (
                    <div className="absolute -top-4 left-0 flex flex-wrap text-notecraft-gold space-x-2">
                      {line.chords.map((chord) => (
                        <span 
                          key={chord.id}
                          className="inline-block text-base font-semibold"
                          style={{ 
                            left: `${chord.position * 8}px`,
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {chord.name}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="text-notecraft-brown text-lg leading-relaxed tracking-wide pt-5">
                    {line.lyrics || <span className="text-notecraft-brown/30 italic">...</span>}
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
