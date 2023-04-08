-- CreateTable
CREATE TABLE "Business" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "BusinessReview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "businessId" INTEGER NOT NULL,
    CONSTRAINT "BusinessReview_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
