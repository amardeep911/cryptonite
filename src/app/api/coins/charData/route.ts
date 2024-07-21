import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const APIKEY = process.env.APIKEY;
  const response = await fetch(`https://api.coingecko.com/api/v3/global`, {
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": `${process.env.APIKEY}`, // Include the API key in the header
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.error_message || "An error occurred";
    return new Response(
      JSON.stringify({ error: `API Error: ${errorMessage}` }),
      { status: response.status }
    );
  }

  // Process the response data
  const data = await response.json();
  return new Response(JSON.stringify({ coinGraphData: data }), { status: 200 });

  // return Response.json({ coinGraphData: data });
}
