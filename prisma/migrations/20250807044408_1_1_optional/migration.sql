-- DropForeignKey
ALTER TABLE "public"."Preferences" DROP CONSTRAINT "Preferences_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Preferences" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
