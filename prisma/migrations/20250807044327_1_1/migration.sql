/*
  Warnings:

  - You are about to drop the column `preferences` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "preferences";

-- CreateTable
CREATE TABLE "public"."Preferences" (
    "id" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_userId_key" ON "public"."Preferences"("userId");

-- AddForeignKey
ALTER TABLE "public"."Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
