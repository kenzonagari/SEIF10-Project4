-- CreateTable
CREATE TABLE "UserLogin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "UserLogin_pkey" PRIMARY KEY ("id")
);
