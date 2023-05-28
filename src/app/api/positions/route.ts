import { InferModel } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@db/db";
import { positions } from "@db/schema";

type InsertPositionType = InferModel<typeof positions, "insert">;

export async function POST(request: Request) {
  const req = await request.json();

  const portfolioId = z.number().parse(Number(req.portfolioId));
  const ticker = z.string().parse(req.ticker.toUpperCase());
  const amount = z.string().parse(req.amount);

  const newPosition: InsertPositionType = {
    portfolioId,
    ticker,
    amount,
  };

  const newPortfolio = await db
    .insert(positions)
    .values(newPosition)
    .returning();

  return NextResponse.json(newPortfolio[0]);
}
