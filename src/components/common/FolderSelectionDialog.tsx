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
import { useState, useEffect } from "react";
import { Folder, Plus } from "lucide-react";
import { useSongContext } from "@/contexts/SongContext";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

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
  const { folders, createFolder } = useSongContext();
  const [selectedFolder, setSelectedFolder] = useState("");
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [pendingNewFolderId, setPendingNewFolderId] = useState<string | null>(null);

  // Wait for the new folder to appear in context, then select and close
  useEffect(() => {
    if (pendingNewFolderId && folders.some(f => f.id === pendingNewFolderId)) {
      onFolderSelect(pendingNewFolderId);
      setPendingNewFolderId(null);
      onClose();
    }
  }, [folders, pendingNewFolderId, onFolderSelect, onClose]);

  const handleConfirm = () => {
    if (selectedFolder) {
      onFolderSelect(selectedFolder);
      onClose();
    }
  };

  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      const newFolder = createFolder(newFolderName.trim(), "library");
      setPendingNewFolderId(newFolder.id);
      setShowCreateFolder(false);
      setNewFolderName("");
      toast.success(`Folder "${newFolder.name}" created successfully`);
    }
  };

  const handleCreateNewFolderClick = () => {
    setShowCreateFolder(true);
    setSelectedFolder("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{showCreateFolder ? "Create New Folder" : "Select Folder"}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {showCreateFolder ? (
            <div className="space-y-4">
              <Input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Enter folder name"
                className="w-full"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateFolder(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateFolder} disabled={!newFolderName.trim()}>
                  Create Folder
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start text-notecraft-gold hover:text-notecraft-gold hover:bg-notecraft-gold/10"
                onClick={handleCreateNewFolderClick}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create New Folder
              </Button>
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
          )}
        </div>
        
        {!showCreateFolder && (
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirm} disabled={!selectedFolder}>
              Create Song
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
