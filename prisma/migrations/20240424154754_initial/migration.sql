-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");
