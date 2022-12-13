/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `UserLogin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `UserLogin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "userLoginId" INTEGER NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plate" (
    "id" SERIAL NOT NULL,
    "calories" INTEGER NOT NULL,
    "userProfileId" INTEGER NOT NULL,

    CONSTRAINT "Plate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLogin_username_key" ON "UserLogin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserLogin_email_key" ON "UserLogin"("email");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userLoginId_fkey" FOREIGN KEY ("userLoginId") REFERENCES "UserLogin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plate" ADD CONSTRAINT "Plate_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
