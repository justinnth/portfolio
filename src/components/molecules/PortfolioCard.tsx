import { InferModel } from "drizzle-orm";
import Link from "next/link";

import { Card, CardHeader, CardTitle } from "@components/atoms/Card";
import { portfolios } from "@db/schema";

type Portfolio = InferModel<typeof portfolios, "select">;

type PortfolioCardProps = { portfolio: Portfolio };

export const PortfolioCard = ({ portfolio }: PortfolioCardProps) => {
  return (
    <Link href={`/portfolio/${portfolio.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>
            <p>{portfolio.name}</p>
          </CardTitle>
        </CardHeader>
      </Card>
    </Link>
  );
};
