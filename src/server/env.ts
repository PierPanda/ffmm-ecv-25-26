import 'server-only';
import { z } from 'zod';

const schema = z.object({
  DATABASE_URI: z.string().min(1),
  PAYLOAD_SECRET: z.string().min(1),
  S3_BUCKET: z.string().min(1),
  S3_REGION: z.string().default('us-east-1'),
  S3_ENDPOINT: z.string().url(),
  S3_ACCESS_KEY_ID: z.string().min(1),
  S3_SECRET_ACCESS_KEY: z.string().min(1),
  S3_FORCE_PATH_STYLE: z
    .string()
    .optional()
    .transform((v) => v === 'true'),
});

// Empty string env vars (KEY=) are treated as absent
const rawEnv = Object.fromEntries(
  Object.entries(process.env).map(([k, v]) => [k, v === '' ? undefined : v]),
);
const parsed = schema.safeParse(rawEnv);

if (!parsed.success) {
  throw new Error(`Missing server env vars:\n${parsed.error.toString()}`);
}

export const databaseUri = parsed.data.DATABASE_URI;
export const payloadSecret = parsed.data.PAYLOAD_SECRET;
export const s3Bucket = parsed.data.S3_BUCKET;
export const s3Region = parsed.data.S3_REGION;
export const s3Endpoint = parsed.data.S3_ENDPOINT;
export const s3AccessKeyId = parsed.data.S3_ACCESS_KEY_ID;
export const s3SecretAccessKey = parsed.data.S3_SECRET_ACCESS_KEY;
export const s3ForcePathStyle = parsed.data.S3_FORCE_PATH_STYLE;
