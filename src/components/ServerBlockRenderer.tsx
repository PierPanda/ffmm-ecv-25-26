import { Suspense } from 'react'
import { BlockRenderer, type BlockList } from './BlockRenderer'
import { ArticlesSliderBlock } from './blocks/ArticlesSliderBlock'

export type { BlockList }

const SERVER_ONLY_BLOCKS = new Set(['articlesSliderBlock'])

type Props = {
  blocks: BlockList
}

export function ServerBlockRenderer({ blocks }: Props) {
  const clientBlocks: typeof blocks = []
  const rendered: React.ReactNode[] = []

  for (const block of blocks) {
    if (SERVER_ONLY_BLOCKS.has(block.blockType)) {
      if (clientBlocks.length) {
        const firstId = clientBlocks[0]?.id
        rendered.push(<BlockRenderer key={`client-${firstId ?? rendered.length}`} blocks={clientBlocks.splice(0)} />)
      }
      if (block.blockType === 'articlesSliderBlock') {
        rendered.push(
          <Suspense key={block.id ?? rendered.length} fallback={null}>
            <ArticlesSliderBlock {...(block as { sectionTitle?: string | null })} />
          </Suspense>
        )
      }
    } else {
      clientBlocks.push(block)
    }
  }

  if (clientBlocks.length) {
    rendered.push(<BlockRenderer key={`client-${rendered.length}`} blocks={clientBlocks} />)
  }

  return <>{rendered}</>
}
