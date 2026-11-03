import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "node:crypto";
import { env } from "./env";
import { Media } from "./models";
import { audit, HttpError } from "./security";
function cloud() {
  if (!env.CLOUDINARY_CLOUD_NAME || !env.CLOUDINARY_API_KEY || !env.CLOUDINARY_API_SECRET) throw new HttpError(503, "Cloudinary has not been configured. No upload has taken place.");
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    secure: true
  });
  return cloudinary;
}
export async function signUpload(actorId: string, consentReference: string) {
  const c = cloud();
  const publicId = `rwm/review/${randomUUID()}`;
  const params = {
    timestamp: Math.floor(Date.now() / 1000),
    public_id: publicId,
    type: "authenticated",
    overwrite: false,
    allowed_formats: "jpg,png,webp"
  };
  const record = await Media.create({
    publicId,
    ownerId: actorId,
    resourceType: "image",
    consentReference,
    rightsConfirmed: true
  });
  await audit(actorId, "media.upload_authorised", "media", String(record._id));
  return {
    id: String(record._id),
    uploadUrl: `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    params: {
      ...params,
      api_key: env.CLOUDINARY_API_KEY,
      signature: c.utils.api_sign_request(params, env.CLOUDINARY_API_SECRET!)
    }
  };
}
export async function completeUpload(id: string, actorId: string) {
  const c = cloud();
  const record = await Media.findOne({
    _id: id,
    ownerId: actorId,
    status: "pending_upload"
  });
  if (!record) throw new HttpError(404, "Upload not found.");
  const resource = await c.api.resource(record.publicId, {
    type: "authenticated",
    resource_type: "image"
  });
  if (resource.bytes > 10000000 || !["jpg", "png", "webp"].includes(resource.format)) throw new HttpError(400, "The image does not meet the upload requirements.");
  record.status = "pending_review";
  await record.save();
  await audit(actorId, "media.upload_completed", "media", id);
  return {
    status: record.status
  };
}
export async function deleteMedia(id: string, actorId: string) {
  const c = cloud();
  const record = await Media.findById(id);
  if (!record) throw new HttpError(404, "Media not found.");
  record.status = "deletion_pending";
  await record.save();
  await c.uploader.destroy(record.publicId, {
    type: "authenticated",
    resource_type: record.resourceType,
    invalidate: true
  });
  record.status = "deleted";
  record.deletedAt = new Date();
  await record.save();
  await audit(actorId, "media.deleted", "media", id);
  return {
    status: "deleted"
  };
}
export function mediaDelivery(publicId: string) {
  return cloud().url(publicId, {
    type: "authenticated",
    sign_url: true,
    secure: true,
    transformation: [{
      width: 1400,
      height: 1000,
      crop: "limit"
    }, {
      quality: "auto",
      fetch_format: "auto"
    }]
  });
}
