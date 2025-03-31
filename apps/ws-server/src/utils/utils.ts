import { JWT_SECRET } from "@repo/contract/constants";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyUser = (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET);

  if (!decoded || !(decoded as JwtPayload).id) {
    return null;
  }

  return decoded as JwtPayload;
};
