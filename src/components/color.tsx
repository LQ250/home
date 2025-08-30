import type { ReactNode, FC } from 'react'
import { cn } from '@/lib/utils'
import type {
    RadioGroupProps,
    RadioGroupItemProps,
} from '@/components/ui/radio-group'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export const defaultColors = [
    'transparent',
    '#ffffff',
    '#000000',
    '#FF0000',
    '#f97316',
    '#22c55e',
    '#2563eb',
    '#fcd34d',
    '#8b5cf6',
]

export const ColorItem: FC<RadioGroupItemProps> = ({
    style,
    className,
    value,
    ...props
}) => {
    return (
        <RadioGroupItem
            className={cn(
                'size-6 rounded-sm border',
                value === '#ffffff' ? 'text-black' : 'text-white',
                className
            )}
            style={{
                background:
                    value === 'transparent'
                        ? 'repeating-conic-gradient(#bbb 0, #bbb 25%, #eee 0, #eee 50%)'
                        : value,
                ...style,
            }}
            value={value}
            {...props}
        />
    )
}

export const Color: FC<RadioGroupProps> = ({
    className,
    ...props
}: RadioGroupProps): ReactNode => {
    return (
        <RadioGroup
            className={cn(
                'flex w-full justify-between rounded-md border p-2',
                className
            )}
            {...props}
        />
    )
}
