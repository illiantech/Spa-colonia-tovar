import { schemaSession, type SessionState } from "@/schemas/session";
import { AlternativeDataSession } from "@/utils/enums";
import { res } from "@/utils/utilityFunctions";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {
  let userParser: SessionState;

  if (!locals.user) userParser = null;
  else {
    const { email, image, name } = locals.user;

    userParser = {
      name: name ?? AlternativeDataSession.NAME,
      image: image ?? AlternativeDataSession.IMAGE,
      email: email ?? AlternativeDataSession.EMAIL
    };
  }
  const validation = schemaSession.safeParse(userParser);

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
