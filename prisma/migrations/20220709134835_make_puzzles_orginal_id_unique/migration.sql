/*
  Warnings:

  - A unique constraint covering the columns `[originalId]` on the table `Puzzle` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Puzzle_originalId_key" ON "Puzzle"("originalId");
