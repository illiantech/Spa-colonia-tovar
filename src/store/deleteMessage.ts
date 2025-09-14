import { signal } from "@preact/signals";

export const deleteMessageStore = signal<boolean>(false);

export const timeoutDeleteMessageStore = signal<NodeJS.Timeout | undefined>(
  undefined
);
