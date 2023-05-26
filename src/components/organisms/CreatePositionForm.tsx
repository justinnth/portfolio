import { currentUser } from "@clerk/nextjs";

import { db } from "@db/db";
import { portfolios } from "@db/schema";
import { stocksClient } from "@utils/stocks-client";

export const CreatePositionForm = async () => {
  const handleSubmit = async (formData: FormData) => {
    "use server";
    const user = await currentUser();
    const portfolioName = formData.get("name")?.toString();

    try {
      if (portfolioName && user?.id) {
        await db
          .insert(portfolios)
          .values({ name: portfolioName, userId: user.id });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tickers = (await stocksClient.reference.tickers({ market: "stocks" }))
    .results;

  return (
    <form action={handleSubmit}>
      <select name="ticker" id="ticker">
        {tickers.map((ticker) => (
          <option key={ticker.cik} value="AAPL">
            {ticker.ticker} - {ticker.name}
          </option>
        ))}
      </select>
      <input type="number" name="amount" id="amount" />
      <input type="text" disabled />
      <button type="submit">Submit</button>
    </form>
  );
};
