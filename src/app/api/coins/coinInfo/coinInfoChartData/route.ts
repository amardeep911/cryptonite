import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const APIKEY = process.env.APIKEY;

  console.log(id);

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365&x_cg_demo_api_key=${APIKEY}`,
    {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": `${process.env.APIKEY}`,
      },
    }
  );
  const data = await response.json();

  return Response.json(data);
}
