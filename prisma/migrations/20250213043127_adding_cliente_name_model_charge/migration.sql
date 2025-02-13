/*
  Warnings:

  - Added the required column `client_name` to the `charges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "charges" ADD COLUMN     "client_name" TEXT NOT NULL;
