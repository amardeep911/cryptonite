import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const response = await fetch(`https://api.coingecko.com/api/v3/global`);
  const data = await response.json();

  return Response.json({ coinGraphData: data });
}
