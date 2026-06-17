import { z } from 'zod';

const schema = z.object({
  NEXT_PUBLIC_SERVER_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_UNICORN_SDK_URL: z.string().url(),
  NEXT_PUBLIC_UNICORN_PROJECT_ID: z.string().min(1),
});

const parsed = schema.safeParse({
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_UNICORN_SDK_URL: process.env.NEXT_PUBLIC_UNICORN_SDK_URL,
  NEXT_PUBLIC_UNICORN_PROJECT_ID: process.env.NEXT_PUBLIC_UNICORN_PROJECT_ID,
});

if (!parsed.success) {
  throw new Error(`Missing public env vars:\n${parsed.error.toString()}`);
}

export const serverUrl = parsed.data.NEXT_PUBLIC_SERVER_URL;
export const unicornSdkUrl = parsed.data.NEXT_PUBLIC_UNICORN_SDK_URL;
export const unicornProjectId = parsed.data.NEXT_PUBLIC_UNICORN_PROJECT_ID;
