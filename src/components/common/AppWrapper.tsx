
import { useState, ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { MenuSidebar } from "@/components/layout/MenuSidebar";
import { PhoneFrame } from "@/components/layout/PhoneFrame";
import { useLocation } from "react-router-dom";

interface AppWrapperProps {
  children: ReactNode;
  title?: string;
}

export const AppWrapper = ({ children, title }: AppWrapperProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  
  // Updated to exclude /profile route from PhoneFrame
  const shouldShowPhoneFrame = !["/", "/song", "/folder", "/profile"].some(path => 
    location.pathname === path || 
    location.pathname.startsWith("/song/") || 
    location.pathname.startsWith("/folder/")
  );

  const content = (
    <div className="min-h-[844px] flex flex-col bg-[#FDF8F3]">
      <div className="fixed top-0 left-0 right-0 z-10 bg-white max-w-[390px] mx-auto">
        <Header 
          title={title} 
          toggleMenu={() => setMenuOpen(!menuOpen)} 
        />
      </div>
      <MenuSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="mt-[60px] flex-1">
        {children}
      </div>
    </div>
  );

  if (!shouldShowPhoneFrame) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-full max-w-[390px]">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <PhoneFrame>
        {content}
      </PhoneFrame>
    </div>
  );
};

