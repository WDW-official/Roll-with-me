import { z } from "zod";
const schema = z
  .object({
    DEMO_MODE: z.enum(["true", "false"]).default("true"),
    APP_URL: z.url().default("http://localhost:3000"),
    MONGODB_URI: z.string().optional(),
    MONGODB_DB: z.string().default("rwm"),
    SESSION_SECRET: z.string().optional(),
    DATA_ENCRYPTION_KEY: z.string().optional(),
    EXPORT_SIGNING_KEY: z.string().optional(),
    CLOUDINARY_CLOUD_NAME: z.string().optional(),
    CLOUDINARY_API_KEY: z.string().optional(),
    CLOUDINARY_API_SECRET: z.string().optional(),
    CHECKOUT_ENABLED: z.enum(["false"]).default("false"),
    INTAKE_ENABLED: z.enum(["true", "false"]).default("false"),
    SAFEGUARDING_CONTACT_URL: z.string().optional(),
    SUPPORT_EMAIL: z.union([z.email(), z.literal("")]).optional(),
    SUPPORT_HOURS: z.string().max(200).optional(),
  })
  .superRefine((v, ctx) => {
    if (v.DEMO_MODE === "false") {
      if (
        v.INTAKE_ENABLED === "true" &&
        !z.url().safeParse(v.SAFEGUARDING_CONTACT_URL).success
      )
        ctx.addIssue({
          code: "custom",
          path: ["SAFEGUARDING_CONTACT_URL"],
          message:
            "Publish a named safeguarding contact and escalation route before enabling intake",
        });
      for (const key of [
        "MONGODB_URI",
        "SESSION_SECRET",
        "DATA_ENCRYPTION_KEY",
        "EXPORT_SIGNING_KEY",
      ] as const) {
        if (!v[key] || (key !== "MONGODB_URI" && v[key]!.length < 64))
          ctx.addIssue({
            code: "custom",
            path: [key],
            message:
              "Required in live mode; secrets must be at least 64 characters",
          });
      }
      if (!/^[a-f0-9]{64}$/i.test(v.DATA_ENCRYPTION_KEY ?? ""))
        ctx.addIssue({
          code: "custom",
          path: ["DATA_ENCRYPTION_KEY"],
          message: "Must be 32 bytes encoded as 64 hex characters",
        });
      if (
        process.env.NODE_ENV === "production" &&
        !v.APP_URL.startsWith("https://")
      )
        ctx.addIssue({
          code: "custom",
          path: ["APP_URL"],
          message: "HTTPS required in production",
        });
    }
  });
export const env = schema.parse(process.env);
export const isDemo = env.DEMO_MODE === "true";
