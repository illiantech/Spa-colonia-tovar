import { defineMiddleware } from "astro:middleware";
import { getSession } from "auth-astro/server";
import { ALLOWED_ORIGINS, ORIGIN_HEADERS } from "../utils/const";
import {
  KeysAccessControl,
  Methods,
  RoutesAPI,
  ValuesAccessControl
} from "../utils/enums";
import { res } from "../utils/utilityFunctions";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  if (
    !url.pathname.startsWith(RoutesAPI.API) ||
    url.pathname.startsWith(RoutesAPI.AUTH)
  )
    return next();

  const ORIGIN = context.request.headers.get(ORIGIN_HEADERS);

  if (!ORIGIN || ALLOWED_ORIGINS.includes(ORIGIN)) {
    context.request.headers.set(
      KeysAccessControl.ALLOW_ORIGIN,
      ORIGIN ?? url.origin
    );
    context.request.headers.set(
      KeysAccessControl.ALLOW_METHODS,
      ValuesAccessControl.ALLOW_METHODS
    );
    context.request.headers.set(
      KeysAccessControl.ALLOW_HEADERS,
      ValuesAccessControl.ALLOW_HEADERS
    );
    context.request.headers.set(
      KeysAccessControl.ALLOW_CREDENTIALS,
      ValuesAccessControl.ALLOW_CREDENTIALS
    );
    context.request.headers.set(
      KeysAccessControl.VARY,
      ValuesAccessControl.VARY
    );

    context.request.headers.set(
      KeysAccessControl.ALLOW_AGE,
      ValuesAccessControl.ALLOW_AGE
    );
  } else
    return res(JSON.stringify("Forbidden, not allowed by CORS"), {
      status: 403,
      statusText: "Forbidden, not allowed by CORS"
    });

  const session = await getSession(context.request);

  context.locals.userId = session?.user?.id;
  context.locals.user = session?.user;

  if (
    url.pathname.startsWith(RoutesAPI.API) &&
    context.request.method === Methods.GET
  )
    return next();

  if (!session || session.user == null)
    return res(
      JSON.stringify({ error: "Inicie sesión para acceder a esta opción" }),
      {
        status: 401
      }
    );

  return next();
});
