-- CreateEnum
CREATE TYPE "type_profiles" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "status_profiles" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "type_clients" AS ENUM ('DEFAULTER', 'STANDING');

-- CreateEnum
CREATE TYPE "status_charges" AS ENUM ('PENDING', 'PENDING_PARTIAL', 'PAID', 'OVERDUE');

-- CreateEnum
CREATE TYPE "type_charges" AS ENUM ('MONTHLY', 'YEARLY');

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "cpf" TEXT,
    "phone" TEXT,
    "type" "type_profiles" NOT NULL DEFAULT 'USER',
    "status" "status_profiles" NOT NULL DEFAULT 'INACTIVE',
    "userId" UUID NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "type" "type_clients" NOT NULL DEFAULT 'STANDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charges" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "day_tariff" DOUBLE PRECISION DEFAULT 0,
    "tariff" DOUBLE PRECISION DEFAULT 0,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "additional_value" DOUBLE PRECISION,
    "discount_value" DOUBLE PRECISION,
    "total_value" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "status" "status_charges" NOT NULL DEFAULT 'PENDING',
    "type" "type_charges" NOT NULL DEFAULT 'MONTHLY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "charges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_cpf_key" ON "profiles"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charges" ADD CONSTRAINT "charges_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charges" ADD CONSTRAINT "charges_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
