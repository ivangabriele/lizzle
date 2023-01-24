/*
  Warnings:

  - You are about to drop the `Log` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserOrigin" AS ENUM ('LICHESS');

-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_puzzleId_fkey";

-- DropTable
DROP TABLE "Log";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "lichessAccessToken" TEXT,
    "lichessId" TEXT,
    "origin" "UserOrigin" NOT NULL,
    "username" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
