import type { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

import { cn } from '@/lib/utils'
import { inlineComponents } from './inlineStyles'
import { components } from './styles'
import type { MarkdownRendererProps } from './types'

const MarkdownRenderer: FC<MarkdownRendererProps> = ({
  children,
  classname,
  inline = false
}) => (
  <ReactMarkdown
    className={cn(
      'prose dark:prose-invert flex w-full flex-col gap-y-5 rounded-lg prose-h1:text-xl',
      classname
    )}
    components={{ ...(inline ? inlineComponents : components) }}
    rehypePlugins={[rehypeRaw, rehypeSanitize]}
    remarkPlugins={[remarkGfm]}
  >
    {children}
  </ReactMarkdown>
)

export default MarkdownRenderer
