-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" SET DEFAULT 'Represents a pharmaceutical product with dosage, pricing, and availability information.';
