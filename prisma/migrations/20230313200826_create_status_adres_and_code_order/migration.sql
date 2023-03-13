-- CreateTable
CREATE TABLE "status" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Adress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "cep" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    CONSTRAINT "Adress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" INTEGER,
    "userId" TEXT NOT NULL,
    "payment_mode" TEXT NOT NULL,
    "price_amount" INTEGER NOT NULL,
    "orderStatusId" TEXT,
    "adressId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_orderStatusId_fkey" FOREIGN KEY ("orderStatusId") REFERENCES "status" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "orders_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adress" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_orders" ("createdAt", "id", "payment_mode", "price_amount", "userId") SELECT "createdAt", "id", "payment_mode", "price_amount", "userId" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "status_title_key" ON "status"("title");
