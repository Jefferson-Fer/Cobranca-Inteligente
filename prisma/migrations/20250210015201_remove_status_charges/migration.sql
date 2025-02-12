/*
  Warnings:

  - The values [PENDING_PARTIAL] on the enum `status_charges` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `type` on the `charges` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "status_charges_new" AS ENUM ('PENDING', 'PAID', 'OVERDUE');
ALTER TABLE "charges" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "charges" ALTER COLUMN "status" TYPE "status_charges_new" USING ("status"::text::"status_charges_new");
ALTER TYPE "status_charges" RENAME TO "status_charges_old";
ALTER TYPE "status_charges_new" RENAME TO "status_charges";
DROP TYPE "status_charges_old";
ALTER TABLE "charges" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "charges" DROP COLUMN "type";

-- DropEnum
DROP TYPE "type_charges";
