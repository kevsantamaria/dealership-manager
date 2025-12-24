CREATE TABLE "users" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY,
    "username" VARCHAR(255) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" VARCHAR(255)
        CHECK ("role" IN ('user', 'admin'))
        NOT NULL DEFAULT 'user',
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "users_username_unique" UNIQUE ("username")
);

CREATE TABLE "suppliers" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255) NOT NULL,
    "contact" VARCHAR(255) NULL,
    "type" VARCHAR(255)
        CHECK (
            "type" IN ('private', 'dealer', 'auction', 'importer', 'fleet')
        )
        NOT NULL DEFAULT 'private',
    "country" VARCHAR(255) NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "brands" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255) NOT NULL,
    "country_origin" VARCHAR(255) NULL,
    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "models" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255) NOT NULL,
    "launch_year" INTEGER NULL,
    "brand_id" BIGINT NOT NULL,
    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "trims" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(255) NOT NULL,
    "engine_size" DECIMAL(8, 2) NOT NULL,
    "horsepower" INTEGER NOT NULL,
    "engine_type" VARCHAR(255)
        CHECK ("engine_type" IN ('gasoline', 'diesel', 'hybrid', 'electric'))
        NOT NULL DEFAULT 'gasoline',
    "transmission" VARCHAR(255)
        CHECK ("transmission" IN ('automatic', 'manual', 'cvt'))
        NOT NULL DEFAULT 'automatic',
    "drivetrain" VARCHAR(255)
        CHECK ("drivetrain" IN ('fwd', 'rwd', 'awd'))
        NULL DEFAULT 'fwd',
    "model_id" BIGINT NOT NULL,
    CONSTRAINT "trims_pkey" PRIMARY KEY ("id")
);

COMMENT ON COLUMN "trims"."drivetrain" IS
'fwd: tracción delantera
rwd: tracción trasera
awd: tracción total';

CREATE TABLE "vehicles" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY,
    "vin" BIGINT NOT NULL,
    "license_plate" VARCHAR(255) NULL,
    "color" VARCHAR(255) NOT NULL,
    "mileage" DECIMAL(8, 2) NULL,
    "arrival_date" DATE NOT NULL,
    "purchase_price" DECIMAL(8, 2) NOT NULL,
    "suggested_price" DECIMAL(8, 2) NOT NULL,
    "stock_status" VARCHAR(255)
        CHECK ("stock_status" IN ('in_stock', 'reserved', 'sold'))
        NOT NULL DEFAULT 'in_stock',
    "rate_condition" VARCHAR(255)
        CHECK ("rate_condition" IN ('bad', 'regular', 'good', 'excellent'))
        NOT NULL DEFAULT 'good',
    "rate_description" VARCHAR(255) NULL,
    "created_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "updated_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "trim_id" BIGINT NOT NULL,
    "supplier_id" BIGINT NOT NULL,
    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "vehicles_vin_unique" UNIQUE ("vin")
);

CREATE TABLE "images" (
    "id" BIGINT GENERATED ALWAYS AS IDENTITY,
    "path" VARCHAR(255) NOT NULL,
    "vehicle_id" BIGINT NOT NULL,
    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "models"
    ADD CONSTRAINT "models_brand_id_foreign"
    FOREIGN KEY ("brand_id") REFERENCES "brands" ("id");

ALTER TABLE "trims"
    ADD CONSTRAINT "trims_model_id_foreign"
    FOREIGN KEY ("model_id") REFERENCES "models" ("id");

ALTER TABLE "vehicles"
    ADD CONSTRAINT "vehicles_trim_id_foreign"
    FOREIGN KEY ("trim_id") REFERENCES "trims" ("id");

ALTER TABLE "vehicles"
    ADD CONSTRAINT "vehicles_supplier_id_foreign"
    FOREIGN KEY ("supplier_id") REFERENCES "suppliers" ("id");

ALTER TABLE "images"
    ADD CONSTRAINT "images_vehicle_id_foreign"
    FOREIGN KEY ("vehicle_id") REFERENCES "vehicles" ("id");
