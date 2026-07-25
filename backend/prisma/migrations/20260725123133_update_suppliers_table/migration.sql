/*
  Warnings:

  - You are about to drop the column `contact` on the `suppliers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "suppliers" DROP COLUMN "contact",
ADD COLUMN     "email" VARCHAR(255),
ADD COLUMN     "telephone" VARCHAR(255),
ALTER COLUMN "country" DROP NOT NULL;
