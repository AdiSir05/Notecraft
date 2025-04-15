
import { Home, Menu, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MenuSidebar } from "./MenuSidebar";

interface HeaderProps {
  title?: string;
  toggleMenu?: () => void;
}

export const Header = ({ title, toggleMenu }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleMenuToggle = () => {
    if (toggleMenu) {
      toggleMenu();
    } else {
      setMenuOpen(!menuOpen);
    }
  };

  return (
    <>
      <header className="bg-white py-3 px-4 flex justify-between items-center w-full max-w-screen-sm mx-auto h-14 border-b border-notecraft-brown/20">
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleMenuToggle} 
            variant="ghost" 
            size="icon"
          >
            <Menu className="h-6 w-6 text-notecraft-brown" />
          </Button>
          <Link to="/">
            <Button variant="ghost" size="icon">
              <Home className="h-6 w-6 text-notecraft-brown" />
            </Button>
          </Link>
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
      {!toggleMenu && <MenuSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />}
    </>
  );
};
