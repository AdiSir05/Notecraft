import React, { useState } from "react";
import { Search, Folder, Music, PlusCircle, Trash2, Star } from "lucide-react";
import { useSongContext } from "@/contexts/SongContext";
import { Header } from "@/components/layout/Header";
import { MenuSidebar } from "@/components/layout/MenuSidebar";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const FoldersPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("New Folder");
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null);
  const { folders, createFolder, getFolderSongs, deleteSong, deleteFolder, favoriteFolders, toggleFavoriteFolder } = useSongContext();
  const navigate = useNavigate();
  
  const filteredFolders = searchQuery
    ? folders.filter(folder => 
        folder.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : folders;

  const sortedFolders = [...filteredFolders].sort((a, b) => {
    const aIsFavorite = favoriteFolders.includes(a.id);
    const bIsFavorite = favoriteFolders.includes(b.id);
    
    if (aIsFavorite && !bIsFavorite) return -1;
    if (!aIsFavorite && bIsFavorite) return 1;
    return 0;
  });
  
  const handleCreateFolder = () => {
    const newFolder = createFolder(newFolderName, "library");
    setIsDialogOpen(false);
    setNewFolderName("New Folder");
    navigate(`/folder/${newFolder.id}`);
  };

  const handleDeleteFolder = (folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    if (!folder) return;

    const folderSongs = getFolderSongs(folderId);
    folderSongs.forEach(song => deleteSong(song.id));
    
    deleteFolder(folderId);
    
    setFolderToDelete(null);
    toast.success(`Folder "${folder.name}" deleted successfully`);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-full max-w-[390px] min-h-[844px] flex flex-col bg-notecraft-light">
        <div className="fixed top-0 left-0 right-0 z-10 bg-white max-w-[390px] mx-auto">
          <Header 
            title="Song Library" 
            toggleMenu={() => setMenuOpen(!menuOpen)} 
          />
        </div>
        <MenuSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        
        <main className="flex-1 px-4 py-6 mt-14 mb-[76px]">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-notecraft-brown/60 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search folders..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {sortedFolders.length > 0 ? (
              sortedFolders.map(folder => (
                <div key={folder.id} className="relative group">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavoriteFolder(folder.id);
                    }}
                    className="absolute top-2 left-2 p-1.5 rounded-full bg-white shadow-sm border border-notecraft-brown/10 z-10 hover:bg-yellow-50"
                  >
                    <Star 
                      className={`h-4 w-4 ${
                        favoriteFolders.includes(folder.id)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-yellow-400"
                      }`}
                    />
                  </button>
                  <Link 
                    to={`/folder/${folder.id}`}
                    className="bg-white rounded-lg shadow-sm border border-notecraft-brown/10 p-4 hover:border-notecraft-brown/30 transition-colors flex flex-col items-center text-center"
                  >
                    <Folder className="h-14 w-14 text-notecraft-brown mb-3" />
                    <h3 className="text-xl font-medium text-notecraft-gold mb-1">{folder.name}</h3>
                    <p className="text-sm text-notecraft-brown/60">
                      {folder.songs.length} {folder.songs.length === 1 ? 'song' : 'songs'}
                    </p>
                  </Link>
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setFolderToDelete(folder.id);
                      }}
                      className="p-1.5 rounded-full bg-white shadow-sm border border-notecraft-brown/10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-notecraft-brown/60 col-span-2">
                {searchQuery ? "No folders match your search" : "No folders yet"}
              </div>
            )}
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-notecraft-brown/10 max-w-[390px] mx-auto h-[76px]">
          <Button
            onClick={() => setIsDialogOpen(true)}
            className="w-full bg-notecraft-gold hover:bg-notecraft-gold/90 text-white h-[44px]"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Folder
          </Button>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Folder name"
                className="w-full"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateFolder}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={!!folderToDelete} onOpenChange={() => setFolderToDelete(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this folder and all songs within it.
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-500 hover:bg-red-600"
                onClick={() => folderToDelete && handleDeleteFolder(folderToDelete)}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default FoldersPage;
