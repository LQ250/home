import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '~/lib/utils'

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => (
    <>
        <style href="tooltip.css">{`
@keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0);

        transition: transform 0.2s ease 0.1s, opacity 0.2s ease 0.1s;
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: scale(1);
        transition: transform 0.2s ease 0.1s, opacity 0.2s ease 0.1s;
      }
      to {
        opacity: 0;
        transform: scale(0);
      }
    }

    .Tooltip {
      animation: fadeIn 0.2s ease;
    }
    .Tooltip[data-state='closed'] {
      animation: fadeOut 0.2s ease;
    }

    .Tooltip[data-side='top']{
      transform-origin: 50% 100%;
    }
    .Tooltip[data-side='bottom']{
      transform-origin: 50% 0%;
    }
    .Tooltip[data-side='left']{
      transform-origin: 100% 50%;
    }
    .Tooltip[data-side='right']{
      transform-origin: 0% 50%;
    }
  `}</style>
        <TooltipPrimitive.Portal>
            <TooltipPrimitive.Content
                ref={ref}
                sideOffset={sideOffset}
                className={cn(
                    'z-50 Tooltip overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                    className,
                )}
                {...props}
            >
                {children}
            </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
    </>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

const TooltipArrow = TooltipPrimitive.Arrow

export {
    Tooltip,
    TooltipArrow,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
}
