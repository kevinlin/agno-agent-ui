import type { FC } from 'react'

import {
  Tooltip as BaseTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip/tooltip'

import type { TooltipProps } from '@/components/ui/tooltip/types'

const Tooltip: FC<TooltipProps> = ({
  className,
  children,
  content,
  side,
  delayDuration,
  contentClassName
}) => (
  <TooltipProvider delayDuration={delayDuration}>
    <BaseTooltip>
      <TooltipTrigger className={className}>{children}</TooltipTrigger>
      <TooltipContent className={contentClassName} side={side}>
        {content}
      </TooltipContent>
    </BaseTooltip>
  </TooltipProvider>
)

export default Tooltip
