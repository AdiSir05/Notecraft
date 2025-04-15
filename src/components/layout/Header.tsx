
import { Menu, Home, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
  toggleMenu?: () => void;
}

export const Header = ({ title, toggleMenu }: HeaderProps) => {
  return (
    <header className="bg-white py-4 px-4 flex justify-between items-center w-full border-b border-notecraft-brown/10">
      <div className="flex items-center gap-4">
        <Button 
          onClick={toggleMenu} 
          variant="ghost" 
          size="icon"
          className="h-8 w-8 text-notecraft-brown"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-notecraft-brown"
          >
            <Home className="h-5 w-5" />
          </Button>
        </Link>
        {title && (
          <h1 className="text-notecraft-gold font-script text-3xl font-bold tracking-wide">
            {title}
          </h1>
        )}
      </div>
      <Link to="/profile">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-notecraft-brown rounded-full"
        >
          <User className="h-5 w-5" />
        </Button>
      </Link>
    </header>
  );
};
