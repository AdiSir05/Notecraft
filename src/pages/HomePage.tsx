
import { Link } from "react-router-dom";
import { Library, Music, User } from "lucide-react";
import { AppWrapper } from "@/components/common/AppWrapper";

const HomePage = () => {
  return (
    <AppWrapper>
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center max-w-md">
        <h1 className="text-notecraft-gold font-script text-5xl mb-10 text-center">Notecraft</h1>
        
        <Link 
          to="/library"
          className="bg-notecraft-brown text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 w-full mb-6"
        >
          <div className="p-8 flex flex-col items-center justify-center">
            <Library className="h-8 w-8 mb-2 opacity-80" />
            <h2 className="text-2xl font-serif">Library</h2>
          </div>
        </Link>
        
        <Link 
          to="/studio"
          className="bg-notecraft-brown text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 w-full mb-6"
        >
          <div className="p-8 flex flex-col items-center justify-center">
            <Music className="h-8 w-8 mb-2 opacity-80" />
            <h2 className="text-2xl font-serif">Studio</h2>
          </div>
        </Link>
        
        <Link 
          to="/profile"
          className="bg-notecraft-brown/90 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 w-full"
        >
          <div className="p-8 flex flex-col items-center justify-center">
            <User className="h-8 w-8 mb-2 opacity-80" />
            <h2 className="text-2xl font-serif">Profile</h2>
          </div>
        </Link>
      </main>
    </AppWrapper>
  );
};

export default HomePage;
