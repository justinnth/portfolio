import { stocksClient } from "@utils/stocks-client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker") ?? "";

  const previousClose = await stocksClient.stocks.previousClose(
    ticker.toUpperCase()
  );

  return new Response(JSON.stringify(previousClose.results));
}
