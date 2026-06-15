import { Content, fetchOneEntry, isPreviewing } from '@builder.io/sdk-react';
import { notFound } from 'next/navigation';
import { env } from '@/server/env';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<Record<string, string>>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const urlPath = '/' + (slug?.join('/') ?? '');

  const content = await fetchOneEntry({
    model: 'page',
    apiKey: env.builderApiKey,
    userAttributes: { urlPath },
    options: resolvedSearchParams,
  });

  if (!content && !isPreviewing()) {
    notFound();
  }

  return (
    <Content
      content={content}
      model="page"
      apiKey={env.builderApiKey}
    />
  );
}
