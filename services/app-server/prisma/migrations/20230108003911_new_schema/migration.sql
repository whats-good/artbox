/*
  Warnings:

  - The primary key for the `SmartContract` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `SmartContract` table. All the data in the column will be lost.
  - You are about to drop the column `decimals` on the `SmartContract` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `SmartContract` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SmartContract` table. All the data in the column will be lost.
  - You are about to drop the column `symbol` on the `SmartContract` table. All the data in the column will be lost.
  - You are about to drop the `ChainAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Token` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[networkId,contractAddress]` on the table `SmartContract` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contractAddress` to the `SmartContract` table without a default value. This is not possible if the table is not empty.
  - Added the required column `networkId` to the `SmartContract` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_contractAddress_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_ownerAddress_fkey";

-- AlterTable
ALTER TABLE "SmartContract" DROP CONSTRAINT "SmartContract_pkey",
DROP COLUMN "address",
DROP COLUMN "decimals",
DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "symbol",
ADD COLUMN     "contractAddress" CITEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "networkId" INTEGER NOT NULL,
ADD CONSTRAINT "SmartContract_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "ChainAccount";

-- DropTable
DROP TABLE "Token";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "address" CITEXT NOT NULL,
    "username" CITEXT NOT NULL,
    "description" CITEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnContract" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "smartContractId" INTEGER NOT NULL,

    CONSTRAINT "UserOnContract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Network" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Network_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "SmartContract_networkId_contractAddress_key" ON "SmartContract"("networkId", "contractAddress");

-- AddForeignKey
ALTER TABLE "UserOnContract" ADD CONSTRAINT "UserOnContract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnContract" ADD CONSTRAINT "UserOnContract_smartContractId_fkey" FOREIGN KEY ("smartContractId") REFERENCES "SmartContract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartContract" ADD CONSTRAINT "SmartContract_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
