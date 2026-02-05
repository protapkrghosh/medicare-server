/*
  Warnings:

  - Made the column `authorId` on table `Medicines` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Medicines" ALTER COLUMN "authorId" SET NOT NULL;
