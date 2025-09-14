import { signal } from "@preact/signals";
import type { UUID } from "../utils/types";

export const input = signal<string>("");

export const options = signal<UUID | undefined>(undefined);

export const edit = signal<UUID | undefined>(undefined);
