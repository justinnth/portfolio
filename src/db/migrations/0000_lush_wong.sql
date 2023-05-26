CREATE TABLE IF NOT EXISTS "portfolios" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" serial NOT NULL,
	"name" varchar
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar,
	"last_name" varchar,
	"clerk_id" varchar
);

DO $$ BEGIN
 ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
