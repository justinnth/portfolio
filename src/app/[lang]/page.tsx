import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import Link from "next/link";

import { Button } from "@components/atoms/Button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@components/atoms/Tabs";
import { PortfolioCard } from "@components/molecules/PortfolioCard";
import { Accounting } from "@components/organisms/Accounting";
import { db } from "@db/db";
import { portfolios } from "@db/schema";

export default async function Home() {
  const user = await currentUser();

  const portfoliosArr = user?.id
    ? await db.query.portfolios.findMany({
        where: eq(portfolios.userId, user?.id),
      })
    : [];

  return (
    <main>
      <Tabs defaultValue="accounting" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accounting">Accounting</TabsTrigger>
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
        </TabsList>

        <TabsContent value="accounting" className="space-y-4">
          <Accounting />
        </TabsContent>

        <TabsContent value="stocks" className="space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl">Portfolios</h1>
            <Link href="/portfolio/create">
              <Button>Créer mon portfolio</Button>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {portfoliosArr.map((portfolio) => (
              <PortfolioCard key={portfolio.id} portfolio={portfolio} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
