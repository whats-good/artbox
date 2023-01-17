-- Enable CITEXT
CREATE EXTENSION IF NOT EXISTS citext;


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
CREATE TABLE "SmartContract" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "contractAddress" CITEXT NOT NULL,
    "networkId" INTEGER NOT NULL,

    CONSTRAINT "SmartContract_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "SmartContract_contractAddress_key" ON "SmartContract"("contractAddress");

-- CreateIndex
CREATE UNIQUE INDEX "SmartContract_networkId_contractAddress_key" ON "SmartContract"("networkId", "contractAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Network_name_key" ON "Network"("name");

-- AddForeignKey
ALTER TABLE "UserOnContract" ADD CONSTRAINT "UserOnContract_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnContract" ADD CONSTRAINT "UserOnContract_smartContractId_fkey" FOREIGN KEY ("smartContractId") REFERENCES "SmartContract"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartContract" ADD CONSTRAINT "SmartContract_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
