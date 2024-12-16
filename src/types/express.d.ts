import { JwtPayload } from "jsonwebtoken";
import { DecodedUser } from "../utils/jwt";


declare global {
  namespace Express {
    export interface Request {
      user?: DecodedUser | JwtPayload; 
    }
  }
}
