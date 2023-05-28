import { eq } from "drizzle-orm";

import { db } from "@db/db";
import { positions } from "@db/schema";
import { stocksClient } from "@utils/stocks-client";
import { columns } from "src/app/[lang]/portfolio/[id]/columns";
import { DataTable } from "src/app/[lang]/portfolio/[id]/data-table";

type PositionsListProps = {
  portfolioId: number;
};

export const PositionsList = async ({ portfolioId }: PositionsListProps) => {
  const positionsArr = await db.query.positions.findMany({
    where: eq(positions.portfolioId, portfolioId),
  });

  const stocksValues = await stocksClient.stocks.aggregatesGroupedDaily(
    "2023-05-26"
  );

  const valuesArr = stocksValues.results.filter((result) =>
    positionsArr.find((p) => p.ticker === result.T)
  );

  if (positionsArr.length === 0) return <div>No positions</div>;

  const test = positionsArr.map((position) => {
    return {
      id: position.id,
      ticker: position.ticker,
      amount: position.amount,
      value: valuesArr.find((v) => v.T === position.ticker)?.c,
    };
  });

  return (
    <div>
      <DataTable columns={columns} data={test} />
    </div>
  );
};
