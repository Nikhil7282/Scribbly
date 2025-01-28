import { initContract } from "@ts-rest/core";
import { AuthEndPoints } from "./auth/auth.contract";
// export * from "./auth/auth.types";

const c = initContract();

export const contract = c.router({
  authContract: AuthEndPoints,
});
