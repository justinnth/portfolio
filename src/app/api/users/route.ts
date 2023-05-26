import { InferModel } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@db/db";
import { users } from "@db/schema";

type InsertUser = InferModel<typeof users, "insert">;

export async function POST(request: Request) {
  const req = await request.json();

  const clerkId = z.string().parse(req.data.id);
  const firstname = z.string().nullable().parse(req.data.first_name);
  const lastname = z.string().nullable().parse(req.data.last_name);

  const insertUser: InsertUser = {
    clerkId,
    firstname,
    lastname,
  };

  const newUser = await db.insert(users).values(insertUser).returning();

  return NextResponse.json(newUser[0]);
}
