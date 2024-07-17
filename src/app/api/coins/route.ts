"use server";

export async function GET(req: Request) {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
  );
  const data = await response.json();

  return Response.json({ coins: data });
}
