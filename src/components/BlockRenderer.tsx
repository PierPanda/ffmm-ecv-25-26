import { HeroBlock } from './blocks/HeroBlock'
import { StatsBlock } from './blocks/StatsBlock'
import { WhyEngageBlock } from './blocks/WhyEngageBlock'
import { FedeBannerBlock } from './blocks/FedeBannerBlock'
import { HandicapsNavBlock } from './blocks/HandicapsNavBlock'
import { TabsBlock } from './blocks/TabsBlock'
import { DownloadBlock } from './blocks/DownloadBlock'
import { FAQBlock } from './blocks/FAQBlock'
import { RichTextBlock } from './blocks/RichTextBlock'
import { RelatedArticlesBlock } from './blocks/RelatedArticlesBlock'
import { ContactFormBlock } from './blocks/ContactFormBlock'
import { DualCardSectionBlock } from './blocks/DualCardSectionBlock'
import { PacksBlock } from './blocks/PacksBlock'
import { SolutionsBlock } from './blocks/SolutionsBlock'
import { SixCardsBlock } from './blocks/SixCardsBlock'

type BlockData = Record<string, unknown> & { blockType: string; id?: string }

export type BlockList = BlockData[]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockMap: Record<string, React.ComponentType<any>> = {
  heroBlock: HeroBlock,
  statsBlock: StatsBlock,
  whyEngageBlock: WhyEngageBlock,
  fedeBannerBlock: FedeBannerBlock,
  handicapsNavBlock: HandicapsNavBlock,
  tabsBlock: TabsBlock,
  downloadBlock: DownloadBlock,
  faqBlock: FAQBlock,
  richTextBlock: RichTextBlock,
  relatedArticlesBlock: RelatedArticlesBlock,
  contactFormBlock: ContactFormBlock,
  dualCardSectionBlock: DualCardSectionBlock,
  packsBlock: PacksBlock,
  solutionsBlock: SolutionsBlock,
  sixCardsBlock: SixCardsBlock,
}

type Props = {
  blocks: BlockData[]
}

export function BlockRenderer({ blocks }: Props) {
  return (
    <>
      {blocks.map((block, i) => {
        const Component = blockMap[block.blockType]
        if (!Component) return null
        return <Component key={block.id ?? i} {...block} />
      })}
    </>
  )
}
