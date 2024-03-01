-- CreateTable
CREATE TABLE "pdfTable" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "pdf" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pdfTable_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pdfTable_fileName_key" ON "pdfTable"("fileName");
