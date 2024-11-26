/*
  Warnings:

  - You are about to drop the column `date` on the `Tournament` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "date",
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT '1970-01-01 00:00:00 +00:00';
