import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables.");
}

interface DecodedUser {
  id: string;
  email: string;
}

/**
 * Generate a JSON Web Token
 * @param payload - Data to encode in the token
 * @param expiresIn - Expiration time (default: 1h)
 * @returns Signed JWT token
 */
export const generateToken = (payload: object, expiresIn = "1h"): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

/**
 * Verify and decode a JSON Web Token
 * @param token - JWT token to verify
 * @returns Decoded payload if the token is valid
 */
export const verifyToken = (token: string): string | JwtPayload => {
  return jwt.verify(token, JWT_SECRET);
};
