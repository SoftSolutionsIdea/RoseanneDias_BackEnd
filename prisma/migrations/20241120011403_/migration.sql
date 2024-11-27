/*
  Warnings:

  - Changed the type of `spentValue` on the `SpentValue` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "SpentValue" DROP COLUMN "spentValue",
ADD COLUMN     "spentValue" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SpentValue_spentValue_key" ON "SpentValue"("spentValue");
