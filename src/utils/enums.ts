export const enum CommentActions {
  ADD = "add",
  DELETE = "delete",
  UPDATE = "update",
  INITIAL = "initial",
  LAZY_LOAD = "lazy load"
}

export const enum CategorysEnum {
  INN = "Posadas",
  PLACE = "Lugares",
  RESTAURANT = "Restaurantes",
  ACTIVITIES = "Actividades"
}

export const enum KeysAccessControl {
  ALLOW_ORIGIN = "Access-Control-Allow-Origin",
  ALLOW_METHODS = "Access-Control-Allow-Methods",
  ALLOW_AGE = "Access-Control-Max-Age",
  ALLOW_HEADERS = "Access-Control-Allow-Headers",
  ALLOW_CREDENTIALS = "Access-Control-Allow-Credentials",
  VARY = "Vary"
}

export const enum ValuesAccessControl {
  ALLOW_METHODS = "GET, POST, PUT, DELETE, OPTIONS, PATCH",
  ALLOW_HEADERS = "Content-Type, Authorization",
  ALLOW_AGE = "86400",
  ALLOW_CREDENTIALS = "true",
  VARY = "Origin"
}

export const enum Methods {
  PATCH = "PATCH",
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE"
}

export const enum RoutesAPI {
  API = "/api",
  COMMENT = "/api/comment",
  LIKE = "/api/like",
  AUTH = "/api/auth",
  SITE = "/api/site",
  CATEGORY = "/api/category",
  SESSION = "/api/session",
  ALL_LIKES = "/api/like/all",
  ALL_COMMENTS = "/api/comment/all"
}

export const enum EnvFields {
  DATABASE_URL = "DATABASE_URL",
  DATABASE_TOKEN = "DATABASE_TOKEN",
  GOOGLE_CLIENT_ID = "GOOGLE_CLIENT_ID",
  GOOGLE_CLIENT_SECRET = "GOOGLE_CLIENT_SECRET"
}

export const enum AlternativeDataSession {
  NAME = "Usuario Anónimo",
  EMAIL = "No proporcionado",
  IMAGE = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
}
