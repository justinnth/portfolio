import { stocksClient } from "@utils/stocks-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") ?? "";

  const tickers = await stocksClient.reference.tickers({
    search,
    limit: 10,
    market: "stocks",
  });

  return new Response(JSON.stringify(tickers.results));
}
