/*
  Warnings:

  - You are about to drop the `Turnier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Turnier";

-- CreateTable
CREATE TABLE "Tournament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tournament_pkey" PRIMARY KEY ("id")
);
