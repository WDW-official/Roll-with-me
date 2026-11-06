/** Local operator tool. Not exposed as an API. Never use it to bypass qualification checks. */
import mongoose from "mongoose";
import { z } from "zod";
import { connectDB } from "../src/lib/db";
import { User } from "../src/lib/models";
import { passwordHash, audit } from "../src/lib/security";
async function main() {
  const input = z
    .object({
      STAFF_EMAIL: z.email(),
      STAFF_PASSWORD: z.string().min(16).max(128),
      STAFF_ROLE: z.enum([
        "admin",
        "editor",
        "operations",
        "moderator",
        "researcher",
        "safeguarding",
        "legal_reviewer",
        "parent_verified",
      ]),
      STAFF_VERIFICATION_REFERENCE: z.string().min(10),
    })
    .parse(process.env);
  await connectDB();
  if (
    await User.exists({
      email: input.STAFF_EMAIL.toLowerCase(),
    })
  )
    throw new Error(
      "Account already exists. Use the documented manual review/change procedure, not an overwrite.",
    );
  const user = await User.create({
    email: input.STAFF_EMAIL,
    passwordHash: passwordHash(input.STAFF_PASSWORD),
    displayName: "RWM staff",
    ageBand: "adult",
    role: input.STAFF_ROLE,
    qualificationVerified: input.STAFF_ROLE === "legal_reviewer",
    adultVerifiedAt: new Date(),
  });
  await audit(
    String(user._id),
    "staff.provisioned_locally",
    "user",
    String(user._id),
    {
      role: input.STAFF_ROLE,
      verificationReference: input.STAFF_VERIFICATION_REFERENCE,
    },
  );
  console.log(
    "Authorised account created. Credentials were not printed. Record the review in your restricted staff register.",
  );
}
main()
  .catch((e) => {
    console.error(e instanceof Error ? e.message : "Provisioning failed");
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
