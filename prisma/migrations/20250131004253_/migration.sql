-- DropForeignKey
ALTER TABLE "measurements" DROP CONSTRAINT "measurements_clientId_fkey";

-- AddForeignKey
ALTER TABLE "measurements" ADD CONSTRAINT "measurements_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
