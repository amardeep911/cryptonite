import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageNo = searchParams.get("pageNo");
  console.log(pageNo);

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageNo}&sparkline=false`
  );
  const data = await response.json();

  return Response.json({ coins: data });
}
