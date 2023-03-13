/*
  Warnings:

  - Made the column `code` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `orderStatusId` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "payment_mode" TEXT NOT NULL,
    "price_amount" INTEGER NOT NULL,
    "orderStatusId" TEXT NOT NULL,
    "adressId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_orderStatusId_fkey" FOREIGN KEY ("orderStatusId") REFERENCES "status" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "orders_adressId_fkey" FOREIGN KEY ("adressId") REFERENCES "Adress" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_orders" ("adressId", "code", "createdAt", "id", "orderStatusId", "payment_mode", "price_amount", "userId") SELECT "adressId", "code", "createdAt", "id", "orderStatusId", "payment_mode", "price_amount", "userId" FROM "orders";
DROP TABLE "orders";
ALTER TABLE "new_orders" RENAME TO "orders";
CREATE UNIQUE INDEX "orders_code_key" ON "orders"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
