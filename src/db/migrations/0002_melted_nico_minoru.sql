CREATE TABLE IF NOT EXISTS "positions" (
	"id" serial PRIMARY KEY NOT NULL,
	"portfolio_id" integer,
	"ticker" varchar,
	"amount" numeric(100, 2)
);

DO $$ BEGIN
 ALTER TABLE "positions" ADD CONSTRAINT "positions_portfolio_id_portfolios_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "portfolios"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
