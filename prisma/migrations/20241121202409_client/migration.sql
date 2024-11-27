/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "complement" DROP NOT NULL;

-- CreateTable
CREATE TABLE "client" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "instagram" TEXT,
    "telephone_1" TEXT NOT NULL,
    "telephone_2" TEXT,
    "niver" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "addressCliId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addressCli" (
    "id" SERIAL NOT NULL,
    "num" TEXT NOT NULL,
    "complement" TEXT,
    "streetCliId" INTEGER NOT NULL,
    "cepCliId" INTEGER NOT NULL,
    "bairroCliId" INTEGER NOT NULL,
    "stateCliId" INTEGER NOT NULL,
    "cityCliId" INTEGER NOT NULL,

    CONSTRAINT "addressCli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreetCli" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,

    CONSTRAINT "StreetCli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CepCli" (
    "id" SERIAL NOT NULL,
    "cep" TEXT NOT NULL,

    CONSTRAINT "CepCli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BairroCli" (
    "id" SERIAL NOT NULL,
    "bairro" TEXT NOT NULL,

    CONSTRAINT "BairroCli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StateCli" (
    "id" SERIAL NOT NULL,
    "state" TEXT NOT NULL,

    CONSTRAINT "StateCli_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CityCli" (
    "id" SERIAL NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "CityCli_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "client_id_key" ON "client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "client_email_key" ON "client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_instagram_key" ON "client"("instagram");

-- CreateIndex
CREATE UNIQUE INDEX "client_telephone_1_key" ON "client"("telephone_1");

-- CreateIndex
CREATE UNIQUE INDEX "client_telephone_2_key" ON "client"("telephone_2");

-- CreateIndex
CREATE UNIQUE INDEX "client_rg_key" ON "client"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "client_cpf_cnpj_key" ON "client"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "StreetCli_street_key" ON "StreetCli"("street");

-- CreateIndex
CREATE UNIQUE INDEX "CepCli_cep_key" ON "CepCli"("cep");

-- CreateIndex
CREATE UNIQUE INDEX "BairroCli_bairro_key" ON "BairroCli"("bairro");

-- CreateIndex
CREATE UNIQUE INDEX "StateCli_state_key" ON "StateCli"("state");

-- CreateIndex
CREATE UNIQUE INDEX "CityCli_city_key" ON "CityCli"("city");

-- CreateIndex
CREATE UNIQUE INDEX "products_id_key" ON "products"("id");

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_addressCliId_fkey" FOREIGN KEY ("addressCliId") REFERENCES "addressCli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addressCli" ADD CONSTRAINT "addressCli_streetCliId_fkey" FOREIGN KEY ("streetCliId") REFERENCES "StreetCli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addressCli" ADD CONSTRAINT "addressCli_cepCliId_fkey" FOREIGN KEY ("cepCliId") REFERENCES "CepCli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addressCli" ADD CONSTRAINT "addressCli_bairroCliId_fkey" FOREIGN KEY ("bairroCliId") REFERENCES "BairroCli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addressCli" ADD CONSTRAINT "addressCli_stateCliId_fkey" FOREIGN KEY ("stateCliId") REFERENCES "StateCli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addressCli" ADD CONSTRAINT "addressCli_cityCliId_fkey" FOREIGN KEY ("cityCliId") REFERENCES "CityCli"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
