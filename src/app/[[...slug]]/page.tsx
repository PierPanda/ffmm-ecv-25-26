import { client } from '@/server/sanity';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const urlPath = slug?.join('/') ?? '';

  const page = await client.fetch(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug: urlPath || 'home' }
  );

  if (!page) {
    notFound();
  }

  return (
    <div>
      <h1>{page.title}</h1>
    </div>
  );
}
