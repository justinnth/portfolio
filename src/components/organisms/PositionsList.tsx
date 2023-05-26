import { eq } from "drizzle-orm";

import { db } from "@db/db";
import { positions } from "@db/schema";

type PositionsListProps = {
  portfolioId: number;
};

export const PositionsList = async ({ portfolioId }: PositionsListProps) => {
  const dbPositions = await db
    .select()
    .from(positions)
    .where(eq(positions.portfolioId, portfolioId));

  if (dbPositions.length === 0) return <div>No positions</div>;

  return (
    <div>
      {dbPositions.map((position) => (
        <p key={position.id}>{position.ticker}</p>
      ))}
    </div>
  );
};
