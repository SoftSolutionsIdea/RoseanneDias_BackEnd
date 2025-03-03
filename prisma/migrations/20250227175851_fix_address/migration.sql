/*
  Warnings:

  - You are about to drop the `BairroCli` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CepCli` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CityCli` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StateCli` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StreetCli` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `addressCli` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "addressCli" DROP CONSTRAINT "addressCli_bairroCliId_fkey";

-- DropForeignKey
ALTER TABLE "addressCli" DROP CONSTRAINT "addressCli_cepCliId_fkey";

-- DropForeignKey
ALTER TABLE "addressCli" DROP CONSTRAINT "addressCli_cityCliId_fkey";

-- DropForeignKey
ALTER TABLE "addressCli" DROP CONSTRAINT "addressCli_stateCliId_fkey";

-- DropForeignKey
ALTER TABLE "addressCli" DROP CONSTRAINT "addressCli_streetCliId_fkey";

-- DropForeignKey
ALTER TABLE "client" DROP CONSTRAINT "client_addressCliId_fkey";

-- DropTable
DROP TABLE "BairroCli";

-- DropTable
DROP TABLE "CepCli";

-- DropTable
DROP TABLE "CityCli";

-- DropTable
DROP TABLE "StateCli";

-- DropTable
DROP TABLE "StreetCli";

-- DropTable
DROP TABLE "addressCli";

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_addressCliId_fkey" FOREIGN KEY ("addressCliId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
