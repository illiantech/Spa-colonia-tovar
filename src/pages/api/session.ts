import { schemaSession, type SessionState } from "@/schemas/session";
import { res } from "@/utils/utilityFunctions";
import type { APIRoute } from "astro";
import { getSession } from "auth-astro/server";

export const GET: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  const USER_PARSER: SessionState = {
    name: session?.user?.name,
    image: session?.user?.image,
    email: session?.user?.email
  };

  const validation = schemaSession.safeParse(USER_PARSER);

  if (!validation.success) {
    return res(
      JSON.stringify({
        error: "Invalid data",
        details: validation.error
      }),
      {
        status: 406
      }
    );
  }

  return res(JSON.stringify(validation.data), { status: 200 });
};
