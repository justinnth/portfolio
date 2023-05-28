import { eq } from "drizzle-orm";

import Link from "next/link";

import { Button } from "@components/atoms/Button";
import { PositionsList } from "@components/organisms/PositionsList";
import { db } from "@db/db";
import { portfolios } from "@db/schema";

type PortfolioProps = { params: { id: number } };

export default async function Portfolio({ params }: PortfolioProps) {
  const portfolio = await db.query.portfolios.findFirst({
    where: eq(portfolios.id, params.id),
  });

  if (!portfolio) return <div>Portfolio not found</div>;

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl">{portfolio.name}</h1>
        <Link href={`/portfolio/${portfolio.id}/positions/create`}>
          <Button>Ajouter une position</Button>
        </Link>
      </div>

      {/* @ts-expect-error Async Server Component */}
      <PositionsList portfolioId={portfolio.id} />
    </main>
  );
}
