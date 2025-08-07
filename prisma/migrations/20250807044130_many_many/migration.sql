-- CreateTable
CREATE TABLE "public"."catergory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "catergory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_PostTocatergory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PostTocatergory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PostTocatergory_B_index" ON "public"."_PostTocatergory"("B");

-- AddForeignKey
ALTER TABLE "public"."_PostTocatergory" ADD CONSTRAINT "_PostTocatergory_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_PostTocatergory" ADD CONSTRAINT "_PostTocatergory_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."catergory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
