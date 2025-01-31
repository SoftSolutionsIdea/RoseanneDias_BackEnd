/*
  Warnings:

  - You are about to drop the column `medidaFrente` on the `measurements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "measurements" DROP COLUMN "medidaFrente",
ADD COLUMN     "Frente" DOUBLE PRECISION;
