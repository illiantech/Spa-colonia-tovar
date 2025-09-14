import type { User } from "@auth/core/types";
import { map } from "nanostores";

export const sessionStore = map<User>({});
