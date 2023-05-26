import {
  decimal,
  integer,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    firstname: varchar("first_name"),
    lastname: varchar("last_name"),
    clerkId: varchar("clerk_id"),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("clerk_unique_idx").on(users.clerkId),
    };
  }
);

export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.clerkId),
  name: varchar("name"),
});

export const positions = pgTable("positions", {
  id: serial("id").primaryKey(),
  portfolioId: integer("portfolio_id").references(() => portfolios.id),
  ticker: varchar("ticker"),
  amount: decimal("amount", { precision: 100, scale: 2 }),
});
