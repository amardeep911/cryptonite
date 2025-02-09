import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const pageNo = searchParams.get("pageNo");
  const APIKEY = process.env.APIKEY;

  console.log(pageNo);
  console.log(process.env.APIKEY);

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageNo}&sparkline=false&x_cg_demo_api_key=${APIKEY}`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": `${process.env.APIKEY}`, // Include the API key in the header
        },
      }
    );

    if (!response.ok) {
      const errorMessage = "API limit exceeded. Please try again later.";
      return new Response(
        JSON.stringify({ error: `API Error: ${errorMessage}` }),
        { status: response.status }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify({ coins: data }), { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while fetching data" }),
      { status: 500 }
    );
  }
}
