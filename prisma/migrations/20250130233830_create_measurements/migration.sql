-- CreateTable
CREATE TABLE "measurements" (
    "id" SERIAL NOT NULL,
    "clientId" TEXT NOT NULL,
    "ombro" DOUBLE PRECISION,
    "busto" DOUBLE PRECISION,
    "coOmbroCintura" DOUBLE PRECISION,
    "coOmbroCos" DOUBLE PRECISION,
    "coCorpoTQC" DOUBLE PRECISION,
    "cintura" DOUBLE PRECISION,
    "cos" DOUBLE PRECISION,
    "quadril" DOUBLE PRECISION,
    "SaiaCurta" DOUBLE PRECISION,
    "SaiaLonga" DOUBLE PRECISION,
    "Short" DOUBLE PRECISION,
    "Calca" DOUBLE PRECISION,
    "Vestido" DOUBLE PRECISION,
    "Manga" DOUBLE PRECISION,
    "punho" DOUBLE PRECISION,
    "medidaFrente" DOUBLE PRECISION,
    "OmbroAOmbro" DOUBLE PRECISION,

    CONSTRAINT "measurements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "measurements_clientId_key" ON "measurements"("clientId");

-- AddForeignKey
ALTER TABLE "measurements" ADD CONSTRAINT "measurements_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
