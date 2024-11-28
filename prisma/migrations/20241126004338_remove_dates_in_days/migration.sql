/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Day` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Day` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Day" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    CONSTRAINT "Day_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Day" ("id", "name", "workoutId") SELECT "id", "name", "workoutId" FROM "Day";
DROP TABLE "Day";
ALTER TABLE "new_Day" RENAME TO "Day";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
