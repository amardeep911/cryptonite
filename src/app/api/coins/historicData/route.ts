import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const noOfDays = searchParams.get("days");
  const APIKEY = process.env.APIKEY;
  console.log(id);
  console.log(noOfDays);

  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${noOfDays}`,
    {
      headers: {
        accept: "application/json",
        //pass the API key in the header like bearer
        Authorization: `Bearer ${APIKEY}`,
      },
    }
  );
  const data = await response.json();

  return Response.json(data);
}
