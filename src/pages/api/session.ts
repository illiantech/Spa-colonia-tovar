import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";
import { res } from "@/utils/utilityFunctions";

export const GET: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  return res(JSON.stringify(session), { status: 200 });
};
