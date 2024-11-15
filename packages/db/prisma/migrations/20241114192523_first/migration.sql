-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "Id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "isVerfied" BOOLEAN NOT NULL DEFAULT false,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Repls" (
    "Id" TEXT NOT NULL,
    "templateId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Repls_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Template" (
    "Id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "templateImage" TEXT NOT NULL,
    "timesUsed" INTEGER,
    "rating" INTEGER,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "Repls" ADD CONSTRAINT "Repls_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repls" ADD CONSTRAINT "Repls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
