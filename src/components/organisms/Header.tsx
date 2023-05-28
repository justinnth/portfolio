import { UserButton, currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import Link from "next/link";

import { ToggleDarkMode } from "@components/atoms/ToggleDarkMode";
import { SelectPortfolio } from "@components/molecules/SelectPortfolio";
import { db } from "@db/db";
import { portfolios } from "@db/schema";

export const Header = async () => {
  const user = await currentUser();

  const portfoliosArr = user?.id
    ? await db.query.portfolios.findMany({
        where: eq(portfolios.userId, user?.id),
      })
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
        <SelectPortfolio portfolios={portfoliosArr} />
      </div>

      <div className="flex items-center gap-2">
        <ToggleDarkMode />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </header>
  );
};
