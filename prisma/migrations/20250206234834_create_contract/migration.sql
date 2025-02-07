-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Pending', 'Completed', 'Canceled');

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "statusId" INTEGER NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContractStatus" (
    "id" SERIAL NOT NULL,
    "status" "UserStatus" NOT NULL,

    CONSTRAINT "ContractStatus_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ContractStatus_status_key" ON "ContractStatus"("status");

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "ContractStatus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
