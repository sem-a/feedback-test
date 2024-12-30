/*
  Warnings:

  - You are about to drop the column `voted` on the `Proposal` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Voted" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "proposal_id" TEXT NOT NULL,
    CONSTRAINT "Voted_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Voted_proposal_id_fkey" FOREIGN KEY ("proposal_id") REFERENCES "Proposal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Proposal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Proposal_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Proposal" ("id", "text", "title", "user_id") SELECT "id", "text", "title", "user_id" FROM "Proposal";
DROP TABLE "Proposal";
ALTER TABLE "new_Proposal" RENAME TO "Proposal";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
