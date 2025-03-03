/*
  Warnings:

  - You are about to drop the column `addressCliId` on the `client` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `client` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "client" DROP CONSTRAINT "client_addressCliId_fkey";

-- AlterTable
ALTER TABLE "client" DROP COLUMN "addressCliId",
ADD COLUMN     "addressId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
