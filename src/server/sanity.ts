import { createClient } from 'next-sanity';
import { env } from './env';

export const client = createClient({
  projectId: env.sanityProjectId,
  dataset: env.sanityDataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});
