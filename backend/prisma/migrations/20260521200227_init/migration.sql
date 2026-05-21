-- CreateTable
CREATE TABLE "Traffic" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Traffic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Traffic_country_idx" ON "Traffic"("country");

-- CreateIndex
CREATE INDEX "Traffic_vehicleType_idx" ON "Traffic"("vehicleType");
