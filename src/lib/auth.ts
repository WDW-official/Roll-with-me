import { cookies } from "next/headers";
import { randomBytes } from "node:crypto";
import { connectDB } from "./db";
import { isDemo } from "./env";
import { Session, User } from "./models";
import { hash, HttpError } from "./security";
import type { Role } from "./types";
export async function currentUser() {
  if (isDemo) return null;
  const token = (await cookies()).get("rwm_session")?.value;
  if (!token) return null;
  await connectDB();
  const session = await Session.findOne({
    tokenHash: hash(token),
    expiresAt: {
      $gt: new Date(),
    },
  }).lean();
  if (!session) return null;
  return User.findOne({
    _id: session.userId,
    disabledAt: {
      $exists: false,
    },
  }).lean();
}
export async function requireUser(roles?: Role[]) {
  const user = await currentUser();
  if (!user) throw new HttpError(401, "Sign in to continue.");
  if (roles && !roles.includes(user.role as Role))
    throw new HttpError(403, "You do not have permission for this action.");
  return user;
}
export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 7 * 86400000);
  await Session.create({
    tokenHash: hash(token),
    userId,
    expiresAt,
  });
  (await cookies()).set("rwm_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}
