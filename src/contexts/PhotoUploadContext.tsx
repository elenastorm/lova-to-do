"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { PhotoUploadModal } from "@/components/PhotoUploadModal";

type PhotoUploadContextType = {
  openUploadModal: (todoItemId: string, todoTitle: string) => void;
};

const PhotoUploadContext = createContext<PhotoUploadContextType | null>(null);

export function PhotoUploadProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [todoItemId, setTodoItemId] = useState<string>("");
  const [todoTitle, setTodoTitle] = useState<string>("");

  const openUploadModal = (id: string, title: string) => {
    setTodoItemId(id);
    setTodoTitle(title);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTodoItemId("");
    setTodoTitle("");
  };

  return (
    <PhotoUploadContext.Provider value={{ openUploadModal }}>
      {children}
      <PhotoUploadModal
        todoItemId={todoItemId}
        todoTitle={todoTitle}
        isOpen={isOpen}
        onClose={closeModal}
      />
    </PhotoUploadContext.Provider>
  );
}

export function usePhotoUpload() {
  const context = useContext(PhotoUploadContext);
  if (!context) {
    throw new Error("usePhotoUpload must be used within PhotoUploadProvider");
  }
  return context;
}
