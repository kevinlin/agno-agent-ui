import type { FC } from 'react'

import { cn } from '@/lib/utils'

import { PARAGRAPH_SIZES } from './constants'
import type { ParagraphProps } from './types'

const Paragraph: FC<ParagraphProps> = ({
  children,
  size = 'default',
  className,
  id
}) => (
  <p className={cn(PARAGRAPH_SIZES[size], className)} id={id}>
    {children}
  </p>
)

export default Paragraph
