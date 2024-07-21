import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const APIKEY = process.env.APIKEY;

  if (!id) {
    return new Response(JSON.stringify({ error: "Missing 'id' parameter" }), {
      status: 400,
    });
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": `${process.env.APIKEY}`, // Include the API key in the header
        },
      }
    );

    // Check if the response status is OK
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
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Fetch error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while fetching data" }),
      { status: 500 }
    );
  }
}
