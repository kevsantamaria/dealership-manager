/*
  Warnings:

  - You are about to alter the column `engine_size` on the `trims` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Integer`.
  - You are about to alter the column `mileage` on the `vehicles` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Integer`.
  - You are about to alter the column `purchase_price` on the `vehicles` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Integer`.
  - You are about to alter the column `suggested_price` on the `vehicles` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Integer`.
  - Added the required column `updated_at` to the `brands` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `models` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `trims` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "brands" ADD COLUMN     "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE "models" ADD COLUMN     "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(0) NOT NULL;

-- AlterTable
ALTER TABLE "trims" ADD COLUMN     "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(0) NOT NULL,
ALTER COLUMN "engine_size" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "vehicles" ALTER COLUMN "mileage" SET DATA TYPE INTEGER,
ALTER COLUMN "purchase_price" SET DATA TYPE INTEGER,
ALTER COLUMN "suggested_price" SET DATA TYPE INTEGER;
