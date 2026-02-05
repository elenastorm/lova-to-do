-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "todoItemId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Photo_todoItemId_fkey" FOREIGN KEY ("todoItemId") REFERENCES "TodoItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
