import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@db/db";
import { portfolios } from "@db/schema";

export async function POST(request: Request) {
  const req = await request.json();

  const clerkId = z.string().parse(req.userId);
  const portfolioName = z.string().parse(req.name);

  const newPortfolio = await db
    .insert(portfolios)
    .values({ name: portfolioName, userId: clerkId })
    .returning();

  return NextResponse.json(newPortfolio[0]);
}
