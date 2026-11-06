import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { env } from "./env";
import { RateLimit, Audit } from "./models";
export function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
export function keyedHash(value: string) {
  return createHmac("sha256", env.SESSION_SECRET!).update(value).digest("hex");
}
export function passwordHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}
export function checkPassword(password: string, stored: string) {
  const [salt, key] = stored.split(":");
  if (!salt || !key) return false;
  const a = Buffer.from(key, "hex"),
    b = scryptSync(password, salt, 64);
  return a.length === b.length && timingSafeEqual(a, b);
}
export function encrypt(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv(
    "aes-256-gcm",
    Buffer.from(env.DATA_ENCRYPTION_KEY!, "hex"),
    iv,
  );
  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);
  return [
    iv.toString("hex"),
    cipher.getAuthTag().toString("hex"),
    encrypted.toString("hex"),
  ].join(":");
}
export function decrypt(value: string) {
  const [iv, tag, data] = value.split(":");
  const decipher = createDecipheriv(
    "aes-256-gcm",
    Buffer.from(env.DATA_ENCRYPTION_KEY!, "hex"),
    Buffer.from(iv, "hex"),
  );
  decipher.setAuthTag(Buffer.from(tag, "hex"));
  return Buffer.concat([
    decipher.update(Buffer.from(data, "hex")),
    decipher.final(),
  ]).toString("utf8");
}
export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
export async function rateLimit(key: string, limit: number, windowMs = 900000) {
  const bucket = Math.floor(Date.now() / windowMs);
  const bucketKey = keyedHash(key) + ":" + bucket;
  let result;
  try {
    result = await RateLimit.findOneAndUpdate(
      {
        key: bucketKey,
      },
      {
        $inc: {
          count: 1,
        },
        $setOnInsert: {
          expiresAt: new Date((bucket + 1) * windowMs),
        },
      },
      {
        upsert: true,
        new: true,
      },
    );
  } catch (error) {
    if (
      (
        error as {
          code?: number;
        }
      ).code === 11000
    )
      result = await RateLimit.findOneAndUpdate(
        {
          key: bucketKey,
        },
        {
          $inc: {
            count: 1,
          },
        },
        {
          new: true,
        },
      );
    else throw error;
  }
  if (!result || result.count > limit)
    throw new HttpError(429, "Please wait before trying again.");
}
export function audit(
  actorId: string | undefined,
  action: string,
  resourceType: string,
  resourceId: string,
  metadata: Record<string, unknown> = {},
) {
  return Audit.create({
    actorId,
    action,
    resourceType,
    resourceId,
    metadata,
  });
}
