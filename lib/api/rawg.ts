const BASE_URL = "https://api.rawg.io/api";
console.log("Full Request URL:", URL);
export async function fetchRawg<T>(
  endpoint: string,
  params: Record<string, string | string[] | number | undefined> = {},
): Promise<T> {
  const apiKey = process.env.RAWG_API_KEY;
  console.log("API Key present:", !!apiKey);
  if (!apiKey) {
    throw new Error("RAWG_API_KEY is not defined in environment variables.");
  }

  const cleanParams: Record<string, string> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      cleanParams[key] = Array.isArray(value) ? value.join(",") : String(value);
    }
  }

  const queryParams = {
    ...cleanParams,
    key: apiKey,
  };

  const query = new URLSearchParams(queryParams).toString();
  const url = `${BASE_URL}/${endpoint}?${query}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(30000),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        `RAWG API Error: ${res.status} ${res.statusText} - ${JSON.stringify(errorData)}`,
      );
    }

    return res.json();
  } catch (error) {
    console.error("Fetch Execution Error:", error);
    throw error;
  }
}
