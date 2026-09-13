/*
  The UI accepts an image URL so the project works immediately on Vercel.
  For production uploads, connect this helper to Cloudinary, Vercel Blob,
  or S3 and save the returned public URL in Project.imageUrl.
*/
export function normalizeImageUrl(value: string) {
  return value.trim();
}
