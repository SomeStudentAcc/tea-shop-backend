/*
  Warnings:

  - You are about to drop the column `user_id_id` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."product" DROP CONSTRAINT "product_user_id_id_fkey";

-- AlterTable
ALTER TABLE "public"."order" ALTER COLUMN "user_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."product" DROP COLUMN "user_id_id",
ADD COLUMN     "user_id" TEXT,
ALTER COLUMN "category_id" DROP NOT NULL,
ALTER COLUMN "color_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."review" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "store_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."product" ADD CONSTRAINT "product_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
