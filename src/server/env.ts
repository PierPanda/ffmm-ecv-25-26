import 'server-only';

export const env = {
  databaseUri: process.env.DATABASE_URI!,
  payloadSecret: process.env.PAYLOAD_SECRET!,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  s3Bucket: process.env.S3_BUCKET!,
  s3Region: process.env.S3_REGION || 'us-east-1',
  s3Endpoint: process.env.S3_ENDPOINT!,
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID!,
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
};
