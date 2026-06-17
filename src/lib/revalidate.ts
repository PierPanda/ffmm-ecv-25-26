import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

export const revalidateArticle: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePath(`/blog/${doc.slug}`)
  revalidatePath('/blog')
}

export const revalidateHandicapPage: CollectionAfterChangeHook = ({ doc }) => {
  revalidatePath(`/handicaps/${doc.slug}`)
  revalidatePath('/handicaps')
}

export function makeGlobalRevalidate(path: string): GlobalAfterChangeHook {
  return () => revalidatePath(path)
}

export const revalidateSiteSettings: GlobalAfterChangeHook = () => {
  revalidatePath('/', 'layout')
}
