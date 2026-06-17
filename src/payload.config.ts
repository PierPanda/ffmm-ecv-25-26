import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import { Users } from '@/collections/Users';
import { Media } from '@/collections/Media';
import { Articles } from '@/collections/Articles';
import { HandicapPages } from '@/collections/HandicapPages';
import { HomeGlobal } from '@/globals/HomeGlobal';
import { GuideGlobal } from '@/globals/GuideGlobal';
import { HandicapsGlobal } from '@/globals/HandicapsGlobal';
import { BlogGlobal } from '@/globals/BlogGlobal';
import { ResourcesGlobal } from '@/globals/ResourcesGlobal';
import { FedGlobal } from '@/globals/FedGlobal';
import { ContactGlobal } from '@/globals/ContactGlobal';
import { LegalGlobal } from '@/globals/LegalGlobal';
import { PrivacyGlobal } from '@/globals/PrivacyGlobal';
import { SiteSettings } from '@/globals/SiteSettings';

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  admin: {
    user: Users.slug,
  },

  collections: [Users, Media, Articles, HandicapPages],

  globals: [
    HomeGlobal,
    GuideGlobal,
    HandicapsGlobal,
    BlogGlobal,
    ResourcesGlobal,
    FedGlobal,
    ContactGlobal,
    LegalGlobal,
    PrivacyGlobal,
    SiteSettings,
  ],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI!,
    },
    push: true,
  }),

  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        endpoint: process.env.S3_ENDPOINT,
        region: process.env.S3_REGION || 'us-east-1',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
      },
    }),
  ],

  secret: process.env.PAYLOAD_SECRET!,

  typescript: {
    outputFile: './src/payload-types.ts',
  },
});
