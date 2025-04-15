
import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
}

export const PhoneFrame = ({ children }: PhoneFrameProps) => {
  return (
    <div className="mx-auto w-full max-w-[390px] min-h-[844px] bg-white relative overflow-hidden shadow-xl rounded-[44px] border-8 border-notecraft-brown/20">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[158px] h-[34px] bg-notecraft-brown/20 rounded-b-3xl z-20" />
      {children}
    </div>
  );
};
