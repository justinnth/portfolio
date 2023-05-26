ALTER TABLE "portfolios" ALTER COLUMN "user_id" SET DATA TYPE varchar;
ALTER TABLE "portfolios" ALTER COLUMN "user_id" DROP NOT NULL;
DO $$ BEGIN
 ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_user_id_users_clerk_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("clerk_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_user_id_users_id_fk";

CREATE UNIQUE INDEX IF NOT EXISTS "clerk_unique_idx" ON "users" ("clerk_id");