CREATE TABLE
    "vehicles" (
        "id" BIGINT NOT NULL,
        "vin" BIGINT NOT NULL,
        "license_plate" VARCHAR(255) NULL,
        "color" VARCHAR(255) NOT NULL,
        "mileage" DECIMAL(8, 2) NULL,
        "arrival_date" DATE NOT NULL,
        "purchase_price" DECIMAL(8, 2) NOT NULL,
        "suggested_price" DECIMAL(8, 2) NOT NULL,
        "stock_status" VARCHAR(255) CHECK (
            "stock_status" IN ('in_stock', 'reserved', 'sold')
        ) NOT NULL DEFAULT 'in_stock',
        "trim_id" BIGINT NOT NULL,
        "supplier_id" BIGINT NOT NULL,
        "condition_id" BIGINT NOT NULL,
        "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

CREATE INDEX "vehicles_trim_id_supplier_id_condition_id_index" ON "vehicles" ("trim_id", "supplier_id", "condition_id");

ALTER TABLE "vehicles" ADD PRIMARY KEY ("id");

ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_vin_unique" UNIQUE ("vin");

CREATE TABLE
    "suppliers" (
        "id" BIGINT NOT NULL,
        "name" VARCHAR(255) NOT NULL,
        "contact" VARCHAR(255) NULL,
        "type" VARCHAR(255) CHECK (
            "type" IN (
                'private',
                'dealer',
                'auction',
                'importer',
                'fleet'
            )
        ) NOT NULL DEFAULT 'private',
        "country" VARCHAR(255) NULL,
        "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

ALTER TABLE "suppliers" ADD PRIMARY KEY ("id");

CREATE TABLE
    "brands" (
        "id" BIGINT NOT NULL,
        "name" VARCHAR(255) NOT NULL,
        "country_origin" VARCHAR(255) NULL
    );

ALTER TABLE "brands" ADD PRIMARY KEY ("id");

CREATE TABLE
    "models" (
        "id" BIGINT NOT NULL,
        "name" VARCHAR(255) NOT NULL,
        "launch_year" INTEGER NULL,
        "brand_id" BIGINT NOT NULL
    );

ALTER TABLE "models" ADD PRIMARY KEY ("id");

CREATE TABLE
    "trims" (
        "id" BIGINT NOT NULL,
        "name" VARCHAR(255) NOT NULL,
        "engine_size" DECIMAL(8, 2) NOT NULL,
        "horsepower" INTEGER NOT NULL,
        "engine_type" VARCHAR(255) CHECK (
            "engine_type" IN ('gasoline', 'diesel', 'hybrid', 'electric')
        ) NOT NULL DEFAULT 'gasoline',
        "transmission" VARCHAR(255) CHECK ("transmission" IN ('automatic', 'manual', 'cvt')) NOT NULL DEFAULT 'automatic',
        "drivetrain" VARCHAR(255) CHECK ("drivetrain" IN ('fwd', 'rwd', 'awd')) NULL DEFAULT 'fwd',
        "model_id" BIGINT NOT NULL
    );

ALTER TABLE "trims" ADD PRIMARY KEY ("id");

COMMENT ON COLUMN "trims"."drivetrain" IS 'fwd: tracción delantera
rwd: tracción trasera
awd: tracción total';

CREATE TABLE
    "images" (
        "id" BIGINT NOT NULL,
        "path" VARCHAR(255) NOT NULL,
        "vehicle_id" BIGINT NOT NULL
    );

ALTER TABLE "images" ADD PRIMARY KEY ("id");

CREATE TABLE
    "vehicle_conditions" (
        "id" BIGINT NOT NULL,
        "rate" VARCHAR(255) CHECK ("rate" IN ('bad', 'regular', 'good', 'excellent')) NOT NULL DEFAULT 'good',
        "description" VARCHAR(255) NULL
    );

ALTER TABLE "vehicle_conditions" ADD PRIMARY KEY ("id");

CREATE TABLE
    "users" (
        "id" BIGINT NOT NULL,
        "username" VARCHAR(255) NOT NULL,
        "password_hash" TEXT NOT NULL,
        "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

ALTER TABLE "users" ADD PRIMARY KEY ("id");

ALTER TABLE "users" ADD CONSTRAINT "users_username_unique" UNIQUE ("username");

CREATE TABLE
    "roles" (
        "id" BIGINT NOT NULL,
        "role" VARCHAR(255) CHECK ("role" IN ('user', 'admin')) NOT NULL DEFAULT 'user'
    );

ALTER TABLE "roles" ADD PRIMARY KEY ("id");

ALTER TABLE "roles" ADD CONSTRAINT "roles_role_unique" UNIQUE ("role");

CREATE TABLE
    "user_roles" (
        "id" BIGINT NOT NULL,
        "user_id" BIGINT NOT NULL,
        "role_id" BIGINT NOT NULL
    );

ALTER TABLE "user_roles" ADD PRIMARY KEY ("id");

ALTER TABLE "images" ADD CONSTRAINT "images_vehicle_id_foreign" FOREIGN KEY ("vehicle_id") REFERENCES "vehicles" ("id");

ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_supplier_id_foreign" FOREIGN KEY ("supplier_id") REFERENCES "suppliers" ("id");

ALTER TABLE "models" ADD CONSTRAINT "models_brand_id_foreign" FOREIGN KEY ("brand_id") REFERENCES "brands" ("id");

ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_trim_id_foreign" FOREIGN KEY ("trim_id") REFERENCES "trims" ("id");

ALTER TABLE "trims" ADD CONSTRAINT "trims_model_id_foreign" FOREIGN KEY ("model_id") REFERENCES "models" ("id");

ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_condition_id_foreign" FOREIGN KEY ("condition_id") REFERENCES "vehicle_conditions" ("id");

ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_foreign" FOREIGN KEY ("role_id") REFERENCES "roles" ("id");