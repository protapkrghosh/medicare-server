/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Medicines` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Medicines" DROP CONSTRAINT "Medicines_categoryId_fkey";

-- AlterTable
ALTER TABLE "Medicines" DROP COLUMN "categoryId";
