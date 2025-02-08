/*
  Warnings:

  - You are about to drop the column `productId` on the `Contract` table. All the data in the column will be lost.
  - Added the required column `eventDate` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventLocation` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `occasion` to the `Contract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seller` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_productId_fkey";

-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "productId",
ADD COLUMN     "contractDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "discountPercentage" DOUBLE PRECISION,
ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "eventLocation" TEXT NOT NULL,
ADD COLUMN     "eventName" TEXT NOT NULL,
ADD COLUMN     "observations" TEXT,
ADD COLUMN     "occasion" TEXT NOT NULL,
ADD COLUMN     "seller" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ContractProduct" (
    "id" SERIAL NOT NULL,
    "productId" TEXT NOT NULL,
    "testDate" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "provaOk" BOOLEAN NOT NULL,
    "withdrawalDate" TIMESTAMP(3) NOT NULL,
    "returnDate" TIMESTAMP(3) NOT NULL,
    "withdrawnDay" TIMESTAMP(3) NOT NULL,
    "returnedDay" TIMESTAMP(3) NOT NULL,
    "contractId" INTEGER NOT NULL,

    CONSTRAINT "ContractProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractPayment" (
    "id" SERIAL NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "paymentDate" TIMESTAMP(3) NOT NULL,
    "flag" TEXT,
    "paymentAmount" DOUBLE PRECISION NOT NULL,
    "contractId" INTEGER NOT NULL,

    CONSTRAINT "ContractPayment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContractProduct" ADD CONSTRAINT "ContractProduct_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractProduct" ADD CONSTRAINT "ContractProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContractPayment" ADD CONSTRAINT "ContractPayment_contractId_fkey" FOREIGN KEY ("contractId") REFERENCES "Contract"("id") ON DELETE CASCADE ON UPDATE CASCADE;
