/*
  Warnings:

  - Made the column `sellerId` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "sellerId" SET NOT NULL;
