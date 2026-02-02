/*
  Warnings:

  - You are about to alter the column `name` on the `Medicines` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Medicines" ADD COLUMN     "authorId" TEXT,
ADD COLUMN     "categoryId" TEXT,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "price" SET DEFAULT 0,
ALTER COLUMN "stock" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Medicines" ADD CONSTRAINT "Medicines_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "Medicines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
