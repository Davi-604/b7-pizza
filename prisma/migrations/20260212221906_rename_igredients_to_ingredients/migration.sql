/*
  Warnings:

  - You are about to drop the column `igredients` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "igredients",
ADD COLUMN     "ingredients" TEXT;
