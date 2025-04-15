
import { Menu, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title?: string;
  showMenu?: boolean;
  toggleMenu?: () => void;
}

export const Header = ({ title, showMenu = true, toggleMenu }: HeaderProps) => {
  return (
    <header className="bg-white py-3 px-4 flex justify-between items-center">
      <div className="flex items-center">
        {showMenu && (
          <Button 
            onClick={toggleMenu} 
            variant="ghost" 
            size="icon" 
            className="mr-2"
          >
            <Menu className="h-6 w-6 text-notecraft-brown" />
          </Button>
        )}
        {title ? (
          <h1 className="text-notecraft-gold font-script text-3xl">{title}</h1>
        ) : (
          <Link to="/" className="text-notecraft-gold font-script text-3xl">
            Notecraft
          </Link>
        )}
      </div>
      <Link to="/profile">
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="h-6 w-6 text-notecraft-brown" />
        </Button>
      </Link>
    </header>
  );
};
