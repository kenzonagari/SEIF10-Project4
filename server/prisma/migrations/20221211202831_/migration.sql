/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Plate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserLogin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `UserProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Plate_id_key" ON "Plate"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserLogin_id_key" ON "UserLogin"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_id_key" ON "UserProfile"("id");
