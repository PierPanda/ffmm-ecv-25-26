import 'server-only'

export const env = {
  sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
};