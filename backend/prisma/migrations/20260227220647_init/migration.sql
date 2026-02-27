-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateEnum
CREATE TYPE "SupplierType" AS ENUM ('private', 'dealer', 'auction', 'importer', 'fleet');

-- CreateEnum
CREATE TYPE "EngineType" AS ENUM ('gasoline', 'diesel', 'hybrid', 'electric');

-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('automatic', 'manual', 'cvt');

-- CreateEnum
CREATE TYPE "Drivetrain" AS ENUM ('fwd', 'rwd', 'awd');

-- CreateEnum
CREATE TYPE "StockStatus" AS ENUM ('in_stock', 'reserved', 'sold');

-- CreateEnum
CREATE TYPE "RateCondition" AS ENUM ('bad', 'regular', 'good', 'excellent');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "contact" VARCHAR(255),
    "type" "SupplierType" NOT NULL DEFAULT 'private',
    "country" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country_origin" VARCHAR(255) NOT NULL,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "models" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "launch_year" INTEGER NOT NULL,
    "brand_id" INTEGER NOT NULL,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trims" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "engine_size" DECIMAL(8,2) NOT NULL,
    "horsepower" INTEGER NOT NULL,
    "engine_type" "EngineType" NOT NULL DEFAULT 'gasoline',
    "transmission" "Transmission" NOT NULL DEFAULT 'automatic',
    "drivetrain" "Drivetrain" NOT NULL DEFAULT 'fwd',
    "model_id" INTEGER NOT NULL,

    CONSTRAINT "trims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "vin" VARCHAR(17) NOT NULL,
    "license_plate" VARCHAR(255),
    "color" VARCHAR(255) NOT NULL,
    "mileage" DECIMAL(8,2),
    "arrival_date" DATE NOT NULL,
    "purchase_price" DECIMAL(8,2) NOT NULL,
    "suggested_price" DECIMAL(8,2) NOT NULL,
    "stock_status" "StockStatus" NOT NULL DEFAULT 'in_stock',
    "rate_condition" "RateCondition" NOT NULL DEFAULT 'good',
    "rate_description" VARCHAR(255),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL,
    "trim_id" INTEGER NOT NULL,
    "supplier_id" INTEGER NOT NULL,

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "vehicle_id" INTEGER NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "vehicles_vin_key" ON "vehicles"("vin");

-- CreateIndex
CREATE UNIQUE INDEX "images_vehicle_id_key" ON "images"("vehicle_id");

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trims" ADD CONSTRAINT "trims_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_trim_id_fkey" FOREIGN KEY ("trim_id") REFERENCES "trims"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
