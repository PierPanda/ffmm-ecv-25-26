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
import { serverUrl } from '@/server/public-env';
import {
  databaseUri,
  payloadSecret,
  s3Bucket,
  s3Region,
  s3Endpoint,
  s3AccessKeyId,
  s3SecretAccessKey,
  s3ForcePathStyle,
} from '@/server/env';

export default buildConfig({
  serverURL: serverUrl,

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
      connectionString: databaseUri,
    },
    push: process.env.NODE_ENV !== 'production',
  }),

  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: s3Bucket,
      config: {
        endpoint: s3Endpoint,
        region: s3Region,
        credentials: {
          accessKeyId: s3AccessKeyId,
          secretAccessKey: s3SecretAccessKey,
        },
        forcePathStyle: s3ForcePathStyle,
      },
    }),
  ],

  secret: payloadSecret,

  typescript: {
    outputFile: './src/payload-types.ts',
  },
});
