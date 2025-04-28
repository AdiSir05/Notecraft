
import { Link } from "react-router-dom";
import { Song } from "@/types";
import { cn } from "@/lib/utils";
import { Music } from "lucide-react";

interface SongCardProps {
  song: Song;
  className?: string;
}

export const SongCard = ({ song, className }: SongCardProps) => {
  return (
    <Link 
      to={`/song/${song.id}`}
      className={cn(
        "block bg-notecraft-brown text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200",
        className
      )}
    >
      <div className="p-5 flex flex-col items-center justify-center h-full gap-1">
        <Music className="h-5 w-5 mb-1 opacity-80" />
        <h3 className="text-2xl font-serif text-center">{song.title}</h3>
        {song.artist && (
          <p className="text-xs uppercase tracking-wider opacity-80 mt-1">{song.artist}</p>
        )}
      </div>
    </Link>
  );
};
