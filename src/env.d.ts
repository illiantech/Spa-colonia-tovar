/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    userId?: string;
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
