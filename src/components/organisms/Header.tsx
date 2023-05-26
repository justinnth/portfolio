import { UserButton, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import Link from "next/link";

import { db } from "@db/db";
import { portfolios } from "@db/schema";

export const Header = async () => {
  const user = await currentUser();

  const dbPortfolios = user?.id
    ? await db.select().from(portfolios).where(eq(portfolios.userId, user.id))
    : [];

  return (
    <header className="flex justify-between">
      <div className="flex items-center gap-2">
        <Link href="/">S</Link>
        <p>/</p>
        <div>
          <UserButton />
          <p>
            {user?.firstName} {user?.lastName}
          </p>
        </div>
        <p>/</p>
        <div>
          {dbPortfolios.map((portfolio) => (
            <Link href={`/portfolio/${portfolio.id}`} key={portfolio.id}>
              {portfolio.name}
            </Link>
          ))}
        </div>
      </div>

      <UserButton afterSignOutUrl="/sign-in" />
    </header>
  );
};
