import { createHmac, randomBytes } from "node:crypto";
import mongoose from "mongoose";
import { Study, QuestionnaireVersion, SurveyResponse } from "./models";
import { hash, audit, HttpError } from "./security";
import { consentVersion, csvCell } from "./policy";
import { studyInput, validateAnswers, type SurveyQuestion } from "./validation";
import { env } from "./env";
export async function publishStudy(id: string, reviewerId: string) {
  let versionId = "";
  await mongoose.connection.transaction(async session => {
    const study = await Study.findById(id).session(session);
    if (!study) throw new HttpError(404, "Study not found.");
    if (study.category === "evidence") throw new HttpError(403, "Potential evidence intake is disabled pending independent legal and safeguarding review.");
    const snapshot = studyInput.parse(study.toObject());
    if (snapshot.guardianRequired && snapshot.ageBands.some(a => a !== "18–20")) throw new HttpError(409, "Guardian research consent is not implemented. Restrict this study to 18–20 or keep it unpublished.");
    if (study.status === "published") throw new HttpError(409, "Close this study before publishing a new questionnaire version.");
    const version = 1 + (await QuestionnaireVersion.countDocuments({
      studyId: study._id
    }).session(session));
    const [v] = await QuestionnaireVersion.create([{
      studyId: study._id,
      version,
      questions: snapshot.draftQuestions,
      snapshot,
      contentHash: hash(JSON.stringify(snapshot)),
      noticeVersion: consentVersion,
      publishedAt: new Date()
    }], {
      session
    });
    study.liveVersionId = v._id;
    study.status = "published";
    study.reviewedBy = new mongoose.Types.ObjectId(reviewerId);
    study.reviewedAt = new Date();
    await study.save({
      session
    });
    versionId = String(v._id);
  });
  await audit(reviewerId, "study.published", "study", id, {
    versionId
  });
  return {
    versionId
  };
}
export async function respondToStudy(slug: string, input: {
  versionId: string;
  ageBand: string;
  answers: unknown;
  consentAccepted: boolean;
}) {
  const study = await Study.findOne({
    slug,
    status: "published"
  });
  if (!study || study.category === "evidence") throw new HttpError(404, "This survey is not open.");
  const version = await QuestionnaireVersion.findOne({
    _id: study.liveVersionId,
    studyId: study._id
  });
  if (!version || String(version._id) !== input.versionId) throw new HttpError(409, "The questionnaire has changed. Please reload and read the current information.");
  if (!input.consentAccepted || !version.snapshot.ageBands.includes(input.ageBand)) throw new HttpError(400, "Consent and age eligibility are required.");
  if (version.snapshot.guardianRequired && input.ageBand !== "18–20") throw new HttpError(403, "This study cannot collect responses from under-18s.");
  let answers;
  try {
    answers = validateAnswers(version.questions as SurveyQuestion[], input.answers);
  } catch {
    throw new HttpError(400, "Please check every required answer.");
  }
  const token = randomBytes(24).toString("hex");
  await SurveyResponse.create({
    studyId: study._id,
    versionId: version._id,
    answers,
    consentVersion: consentVersion,
    noticeVersion: version.noticeVersion,
    withdrawalTokenHash: hash(token),
    deleteAfter: new Date(Date.now() + version.snapshot.retentionDays * 86400000)
  });
  return {
    message: "Your response has been recorded.",
    withdrawalCode: token
  };
}
export async function exportStudy(id: string, actorId: string) {
  const study = await Study.findById(id);
  if (!study || study.category === "evidence") throw new HttpError(404, "Study not found.");
  const versions = await QuestionnaireVersion.find({
    studyId: id
  }).lean();
  const responses = await SurveyResponse.find({
    studyId: id,
    withdrawalRequestedAt: {
      $exists: false
    }
  }).select("+answers").lean();
  const ids = [...new Set(versions.flatMap(v => v.questions.map(q => q.id)))];
  const rows = [["questionnaire_version_id", "submitted_at", ...ids], ...responses.map(r => [String(r.versionId), r.submittedAt!.toISOString(), ...ids.map(k => Array.isArray(r.answers[k]) ? r.answers[k].join(" | ") : r.answers[k])])];
  const csv = rows.map(r => r.map(csvCell).join(",")).join("\r\n");
  const dictionary = versions.map(v => ({
    versionId: String(v._id),
    version: v.version,
    questions: v.questions,
    questionnaireHash: v.contentHash,
    noticeVersion: v.noticeVersion
  }));
  const methodology = {
    protocol: study.protocol,
    samplingPlan: study.samplingPlan,
    methodology: study.methodology,
    conflicts: study.conflicts,
    limitations: "Opt-in responses are not automatically representative, certified or court-admissible. Infrastructure metadata may affect anonymity."
  };
  const manifest = {
    generatedAt: new Date().toISOString(),
    studyId: id,
    count: responses.length,
    files: {
      "responses.csv": hash(csv),
      "dictionary.json": hash(JSON.stringify(dictionary)),
      "methodology.json": hash(JSON.stringify(methodology))
    },
    algorithm: "SHA-256",
    signatureType: "HMAC-SHA256 / application-key signature, not independent timestamp certification"
  };
  const signature = createHmac("sha256", env.EXPORT_SIGNING_KEY!).update(JSON.stringify(manifest)).digest("hex");
  await audit(actorId, "study.exported", "study", id, {
    count: responses.length,
    manifestHash: hash(JSON.stringify(manifest))
  });
  return {
    csv,
    dictionary,
    methodology,
    manifest,
    signature
  };
}
