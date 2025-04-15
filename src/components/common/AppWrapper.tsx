
import { useState, ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { MenuSidebar } from "@/components/layout/MenuSidebar";

interface AppWrapperProps {
  children: ReactNode;
  title?: string;
}

export const AppWrapper = ({ children, title }: AppWrapperProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-notecraft-light">
      <Header 
        title={title} 
        toggleMenu={() => setMenuOpen(!menuOpen)} 
      />
      <MenuSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      {children}
    </div>
  );
};
