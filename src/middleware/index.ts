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

// tiende a fallar por cache

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  if (
    !url.pathname.startsWith(RoutesAPI.API) ||
    url.pathname.startsWith(RoutesAPI.AUTH) ||
    (context.request.method === Methods.GET &&
      !url.pathname.startsWith(RoutesAPI.LIKE) &&
      !url.pathname.startsWith(RoutesAPI.COMMENT) &&
      !url.pathname.startsWith(RoutesAPI.SITE) &&
      !url.pathname.startsWith(RoutesAPI.CATEGORY) &&
      !url.pathname.startsWith(RoutesAPI.SESSION))
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
      KeysAccessControl.ALLOWED_CREDENTIALS,
      ValuesAccessControl.ALLOWED_CREDENTIALS
    );
    context.request.headers.set(
      KeysAccessControl.VARY,
      ValuesAccessControl.VARY
    );
  } else
    return res(JSON.stringify("Forbidden, not allowed by CORS"), {
      status: 403,
      statusText: "Forbidden, not allowed by CORS"
    });

  const session = await getSession(context.request);

  if (
    (url.pathname.startsWith(RoutesAPI.LIKE) ||
      url.pathname.startsWith(RoutesAPI.COMMENT) ||
      url.pathname.startsWith(RoutesAPI.SITE) ||
      url.pathname.startsWith(RoutesAPI.CATEGORY)) &&
    context.request.method === Methods.GET
  ) {
    context.locals.userId = session?.user?.id;

    return next();
  }

  if (!session || session.user == null)
    return res(
      JSON.stringify({ error: "Inicie sesión para acceder a esta opción" }),
      {
        status: 401
      }
    );

  context.locals.userId = session.user.id;

  return next();
});
