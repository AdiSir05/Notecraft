
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Folder } from "lucide-react";
import { useSongContext } from "@/contexts/SongContext";

interface FolderSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onFolderSelect: (folderId: string) => void;
}

export const FolderSelectionDialog = ({
  isOpen,
  onClose,
  onFolderSelect,
}: FolderSelectionDialogProps) => {
  const { folders } = useSongContext();
  const [selectedFolder, setSelectedFolder] = useState("");

  const handleConfirm = () => {
    if (selectedFolder) {
      onFolderSelect(selectedFolder);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Folder</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <Select
            value={selectedFolder}
            onValueChange={setSelectedFolder}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a folder" />
            </SelectTrigger>
            <SelectContent>
              {folders.map((folder) => (
                <SelectItem key={folder.id} value={folder.id}>
                  <div className="flex items-center">
                    <Folder className="mr-2 h-4 w-4" />
                    {folder.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedFolder}>
            Create Song
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
