import { restClient } from "@polygon.io/client-js";

export const stocksClient = restClient(process.env.POLYGON_API_KEY);
