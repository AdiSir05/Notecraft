
import { useNavigate } from "react-router-dom";
import { AppWrapper } from "@/components/common/AppWrapper";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <AppWrapper title="Profile">
      <main className="container mx-auto px-4 py-6 max-w-md">
        <div className="flex justify-start mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-notecraft-brown"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 rounded-full bg-notecraft-brown/20 flex items-center justify-center">
              <span className="text-4xl text-notecraft-brown">👤</span>
            </div>
          </div>
          
          <h2 className="text-xl font-medium text-center text-notecraft-brown mb-6">User Profile</h2>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-sm text-notecraft-brown/60">Name</p>
              <p className="text-notecraft-brown">Music Creator</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-notecraft-brown/60">Songs Created</p>
              <p className="text-notecraft-brown">12</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-notecraft-brown/60">Joined</p>
              <p className="text-notecraft-brown">April 2023</p>
            </div>
          </div>
        </div>
      </main>
    </AppWrapper>
  );
};

export default ProfilePage;

