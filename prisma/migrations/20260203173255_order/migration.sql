/*
  Warnings:

  - You are about to drop the column `totalAmount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalOrder` on the `Order` table. All the data in the column will be lost.
  - Added the required column `description` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicineId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Medicines" ADD COLUMN     "categoryId" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "totalAmount",
DROP COLUMN "totalOrder",
ADD COLUMN     "medicineId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Medicines_name_price_manufacturer_idx" ON "Medicines"("name", "price", "manufacturer");

-- AddForeignKey
ALTER TABLE "Medicines" ADD CONSTRAINT "Medicines_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicines"("id") ON DELETE CASCADE ON UPDATE CASCADE;
