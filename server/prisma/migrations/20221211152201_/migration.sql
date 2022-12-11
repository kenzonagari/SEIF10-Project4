/*
  Warnings:

  - A unique constraint covering the columns `[userProfileId]` on the table `Plate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Plate_userProfileId_key" ON "Plate"("userProfileId");
