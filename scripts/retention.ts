/** Dry-run by default. No automatic safeguarding deletion. Schedule after policy approval. */
import mongoose from "mongoose";
import { connectDB } from "../src/lib/db";
import { SurveyResponse, Intake, Booking } from "../src/lib/models";
import { audit } from "../src/lib/security";
async function main() {
  await connectDB();
  const now = new Date();
  const expired = await SurveyResponse.find({
    deleteAfter: {
      $lt: now
    }
  }).select("_id").lean();
  const cases = await Intake.countDocuments({
    retentionReviewAt: {
      $lte: now
    }
  });
  const bookings = await Booking.countDocuments({
    status: {
      $in: ["cancelled", "attended"]
    },
    updatedAt: {
      $lt: new Date(Date.now() - 90 * 86400000)
    }
  });
  console.log(JSON.stringify({
    expiredSurveyResponses: expired.length,
    casesNeedingHumanRetentionReview: cases,
    bookingsNeedingPolicyReview: bookings,
    mode: process.env.RETENTION_APPLY === "true" ? "apply expired survey responses only" : "dry-run"
  }));
  if (process.env.RETENTION_APPLY === "true") {
    for (const r of expired) {
      await audit(undefined, "retention.response_deleted", "survey_response", String(r._id));
      await SurveyResponse.deleteOne({
        _id: r._id
      });
    }
  }
}
main().catch(e => {
  console.error(e instanceof Error ? e.message : "Retention review failed");
  process.exitCode = 1;
}).finally(() => mongoose.disconnect());
