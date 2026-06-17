import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type Props = {
  title?: string | null
  content: SerializedEditorState
}

export function RichTextBlock({ title, content }: Props) {
  return (
    <section>
      {title && <h2>{title}</h2>}
      <RichText data={content} />
    </section>
  )
}
