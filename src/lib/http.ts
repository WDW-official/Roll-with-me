import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { env, isDemo } from "./env";
import { HttpError } from "./security";
import { connectDB } from "./db";
export async function body(req: Request) {
  if (req.headers.get("origin") !== new URL(env.APP_URL).origin)
    throw new HttpError(403, "Request origin is not allowed.");
  if (!req.headers.get("content-type")?.startsWith("application/json"))
    throw new HttpError(415, "Use a JSON request.");
  if (Number(req.headers.get("content-length") ?? 0) > 32768)
    throw new HttpError(413, "Submission is too large.");
  const reader = req.body?.getReader();
  if (!reader) throw new HttpError(400, "A request body is required.");
  let size = 0;
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 32768) {
      await reader.cancel();
      throw new HttpError(413, "Submission is too large.");
    }
    chunks.push(value);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
  } catch {
    throw new HttpError(400, "Invalid JSON.");
  }
}
export async function live() {
  if (isDemo)
    throw new HttpError(
      503,
      "This is a preview. Nothing has been submitted or saved. Live services must be configured before this form can be used.",
    );
  await connectDB();
}
export async function api(fn: () => Promise<unknown>) {
  try {
    return NextResponse.json(await fn(), {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    if (e instanceof HttpError)
      return NextResponse.json(
        {
          error: e.message,
        },
        {
          status: e.status,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    if (e instanceof ZodError)
      return NextResponse.json(
        {
          error: "Please check the fields and try again.",
          fields: e.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    if (e instanceof Error && e.name === "VersionError")
      return NextResponse.json(
        {
          error:
            "This record changed while you were reviewing it. Reload and review the current version.",
        },
        {
          status: 409,
        },
      );
    console.error(
      "RWM request failed",
      e instanceof Error ? e.name : "UnknownError",
    );
    return NextResponse.json(
      {
        error:
          "The service is unavailable. Please try again later. For immediate danger, call 999.",
      },
      {
        status: 503,
      },
    );
  }
}
