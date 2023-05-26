import { eq } from "drizzle-orm";

import Link from "next/link";

import { PositionsList } from "@components/organisms/PositionsList";
import { db } from "@db/db";
import { portfolios } from "@db/schema";

type PortfolioProps = { params: { id: number } };

export default async function Portfolio({ params }: PortfolioProps) {
  const dbPortfolio = await db
    .select()
    .from(portfolios)
    .where(eq(portfolios.id, params.id));

  const portfolio = dbPortfolio[0];

  return (
    <main>
      <h1>{portfolio.name}</h1>
      <Link href={`/portfolio/${portfolio.id}/positions/create`}>
        Ajouter une position
      </Link>
      {/* @ts-expect-error Async Server Component */}
      <PositionsList portfolioId={portfolio.id} />
    </main>
  );
}
