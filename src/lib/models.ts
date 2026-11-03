import mongoose, { Schema, type InferSchemaType } from "mongoose";
const options = {
  timestamps: true,
  strict: "throw" as const,
  optimisticConcurrency: true
};
const revision = new Schema({
  actor: {
    type: Schema.Types.ObjectId,
    required: true
  },
  at: {
    type: Date,
    default: Date.now
  },
  reason: {
    type: String,
    required: true
  },
  snapshotHash: {
    type: String,
    required: true
  }
}, {
  _id: false
});
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true,
    select: false
  },
  displayName: {
    type: String,
    required: true
  },
  ageBand: {
    type: String,
    enum: ["13–15", "16–17", "18–20", "adult"],
    required: true
  },
  role: {
    type: String,
    enum: ["participant", "parent_pending", "parent_verified", "editor", "provider", "moderator", "safeguarding", "legal_reviewer", "researcher", "operations", "admin"],
    default: "participant"
  },
  qualificationVerified: {
    type: Boolean,
    default: false
  },
  adultVerifiedAt: Date,
  disabledAt: Date,
  consents: [{
    purpose: String,
    version: String,
    granted: Boolean,
    at: Date
  }]
}, options);
const sessionSchema = new Schema({
  tokenHash: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: {
      expires: 0
    }
  }
}, options);
const providerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  officialUrl: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true,
    select: false
  },
  safeguardingPolicyUrl: String,
  description: String,
  ownerId: Schema.Types.ObjectId,
  verified: {
    type: Boolean,
    default: false
  },
  safeguardingPolicyChecked: {
    type: Boolean,
    default: false
  },
  riskAssessmentChecked: {
    type: Boolean,
    default: false
  },
  eligibilityChecks: {
    type: String,
    enum: ["pending", "appropriate_checks_verified", "not_applicable_reviewed"],
    default: "pending"
  },
  reviewedBy: Schema.Types.ObjectId,
  reviewedAt: Date,
  reviewNotes: {
    type: String,
    select: false
  }
}, options);
const contentSchema = new Schema({
  kind: {
    type: String,
    enum: ["story", "opportunity", "guide", "event", "challenge"],
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["draft", "pending_review", "published", "expired"],
    default: "draft"
  },
  demo: {
    type: Boolean,
    default: true
  },
  data: {
    type: Schema.Types.Mixed,
    required: true
  },
  revisions: [revision]
}, options);
const bookingSchema = new Schema({
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Content",
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["pending_consent", "confirmed", "waiting", "cancelled", "attended"],
    required: true
  },
  ageBand: {
    type: String,
    required: true
  },
  consentNoticeVersion: {
    type: String,
    required: true
  },
  guardianUserId: Schema.Types.ObjectId,
  guardianConsentAt: Date,
  guardianConsentVersion: String,
  consentTokenHash: {
    type: String,
    select: false
  },
  consentTokenExpiresAt: Date,
  emergencyContactEncrypted: {
    type: String,
    select: false
  },
  checkedInBy: Schema.Types.ObjectId,
  checkedInAt: Date,
  feedback: {
    rating: Number,
    comment: String
  }
}, options);
bookingSchema.index({
  eventId: 1,
  userId: 1
}, {
  unique: true
});
const intakeSchema = new Schema({
  reference: {
    type: String,
    unique: true,
    sparse: true
  },
  requester: {
    type: String,
    enum: ["self", "parent_carer"],
    default: "self"
  },
  relationship: {
    type: String,
    enum: ["parent", "guardian", "carer", "trusted_adult", ""]
  },
  context: {
    type: String,
    default: "general"
  },
  borough: String,
  targetTeam: {
    type: String,
    enum: ["general", "legal_information", "careers_pathways", "activities", "safeguarding", "editorial"],
    default: "general"
  },
  replyRequested: {
    type: Boolean,
    default: false
  },
  followUpStatus: {
    type: String,
    enum: ["no_reply_requested", "requested", "reply_recorded", "referral_discussed"],
    default: "no_reply_requested"
  },
  contactPreferencesEncrypted: {
    type: String,
    select: false
  },
  referralEncrypted: {
    type: String,
    select: false
  },
  topic: {
    type: String,
    required: true
  },
  ageBand: {
    type: String,
    required: true
  },
  messageEncrypted: {
    type: String,
    required: true,
    select: false
  },
  replyEmailEncrypted: {
    type: String,
    select: false
  },
  privacyVersion: {
    type: String,
    required: true
  },
  publicationConsent: {
    type: Boolean,
    default: false
  },
  risk: {
    type: String,
    enum: ["untriaged", "routine", "concern", "urgent"],
    default: "untriaged"
  },
  assignedTo: Schema.Types.ObjectId,
  status: {
    type: String,
    enum: ["received", "triaged", "referred", "closed"],
    default: "received"
  },
  actions: [{
    actor: Schema.Types.ObjectId,
    at: Date,
    action: String,
    notesEncrypted: {
      type: String,
      select: false
    }
  }],
  retentionReviewAt: {
    type: Date,
    required: true
  },
  deletionRequestedAt: Date
}, options);
const forumSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true,
    select: false
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "removed"],
    default: "pending"
  },
  reviewedBy: Schema.Types.ObjectId,
  reviewedAt: Date,
  reports: [{
    reporterId: Schema.Types.ObjectId,
    reason: String,
    at: Date
  }],
  blockedBy: [Schema.Types.ObjectId]
}, options);
const questionSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["single", "multiple", "likert", "scale", "narrative"],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  options: [String],
  required: Boolean,
  showIf: {
    questionId: String,
    equals: String
  }
}, {
  _id: false
});
const studySchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["anonymous_feedback", "research", "evidence"],
    required: true
  },
  status: {
    type: String,
    enum: ["draft", "pending_review", "published", "closed"],
    default: "draft"
  },
  protocol: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    required: true
  },
  lawfulBasis: {
    type: String,
    required: true
  },
  ethicsReview: String,
  ageBands: [String],
  guardianRequired: Boolean,
  guardianWorkflowApproved: {
    type: Boolean,
    default: false
  },
  retentionDays: {
    type: Number,
    required: true
  },
  withdrawalPolicy: String,
  samplingPlan: String,
  participantInformation: String,
  conflicts: String,
  methodology: String,
  readingCheck: String,
  draftQuestions: [questionSchema],
  liveVersionId: Schema.Types.ObjectId,
  reviewedBy: Schema.Types.ObjectId,
  reviewedAt: Date
}, options);
const versionSchema = new Schema({
  studyId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  version: {
    type: Number,
    required: true
  },
  questions: {
    type: [questionSchema],
    required: true
  },
  contentHash: {
    type: String,
    required: true
  },
  noticeVersion: {
    type: String,
    required: true
  },
  snapshot: {
    type: Schema.Types.Mixed,
    required: true
  },
  publishedAt: {
    type: Date,
    required: true
  }
}, options);
versionSchema.index({
  studyId: 1,
  version: 1
}, {
  unique: true
});
const responseSchema = new Schema({
  studyId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  versionId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  answers: {
    type: Schema.Types.Mixed,
    required: true,
    select: false
  },
  consentVersion: {
    type: String,
    required: true
  },
  noticeVersion: {
    type: String,
    required: true
  },
  withdrawalTokenHash: {
    type: String,
    required: true,
    select: false
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  deleteAfter: {
    type: Date,
    required: true
  },
  withdrawalRequestedAt: Date
}, options);
const auditSchema = new Schema({
  actorId: Schema.Types.ObjectId,
  action: {
    type: String,
    required: true
  },
  resourceType: {
    type: String,
    required: true
  },
  resourceId: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {}
  }
}, {
  strict: "throw"
});
for (const method of ["updateOne", "updateMany", "findOneAndUpdate", "replaceOne", "deleteOne", "deleteMany", "findOneAndDelete"] as const) {
  auditSchema.pre(method, function () {
    throw new Error("Audit records are append-only");
  });
  versionSchema.pre(method, function () {
    throw new Error("Published questionnaire versions are immutable");
  });
}
auditSchema.pre("save", function () {
  if (!this.isNew) throw new Error("Audit records are append-only");
});
versionSchema.pre("save", function () {
  if (!this.isNew) throw new Error("Published questionnaire versions are immutable");
});
const areaSchema = new Schema({
  borough: {
    type: String,
    required: true,
    unique: true
  },
  zones: {
    type: [String],
    required: true
  },
  neighbourhoods: [String],
  boundaryGeoJson: Schema.Types.Mixed,
  editedBy: Schema.Types.ObjectId
}, options);
const mediaSchema = new Schema({
  publicId: {
    type: String,
    required: true,
    unique: true
  },
  ownerId: Schema.Types.ObjectId,
  resourceType: {
    type: String,
    enum: ["image", "video"],
    required: true
  },
  status: {
    type: String,
    enum: ["pending_upload", "pending_review", "approved", "rejected", "deletion_pending", "deleted"],
    default: "pending_upload"
  },
  consentReference: {
    type: String,
    required: true
  },
  rightsConfirmed: {
    type: Boolean,
    required: true
  },
  reviewedBy: Schema.Types.ObjectId,
  deletedAt: Date
}, options);
const rateSchema = new Schema({
  key: {
    type: String,
    unique: true,
    required: true
  },
  count: {
    type: Number,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: {
      expires: 0
    }
  }
});
const grantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  funder: String,
  amountPence: Number,
  status: {
    type: String,
    enum: ["prospect", "applied", "awarded", "reporting", "closed"],
    default: "prospect"
  },
  restrictedPurpose: String,
  reportDue: Date
}, options);
function model<T extends Schema>(name: string, schema: T): mongoose.Model<InferSchemaType<T>> {
  return (mongoose.models[name] ?? mongoose.model(name, schema)) as mongoose.Model<InferSchemaType<T>>;
}
export const User = model("User", userSchema),
  Session = model("Session", sessionSchema),
  Provider = model("Provider", providerSchema),
  Content = model("Content", contentSchema),
  Booking = model("Booking", bookingSchema),
  Intake = model("Intake", intakeSchema),
  ForumPost = model("ForumPost", forumSchema),
  Study = model("Study", studySchema),
  QuestionnaireVersion = model("QuestionnaireVersion", versionSchema),
  SurveyResponse = model("SurveyResponse", responseSchema),
  Audit = model("Audit", auditSchema),
  Area = model("Area", areaSchema),
  Media = model("Media", mediaSchema),
  RateLimit = model("RateLimit", rateSchema),
  Grant = model("Grant", grantSchema);
