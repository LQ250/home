import type { ReactNode } from 'react'
import { useState } from 'react'

// pnpm dlx shadcn@latest add toggle-group
import { ToggleGroup, ToggleGroupItem } from '~/components/ui/toggle-group'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '~/components/ui/tooltip'

const Colors = {
    lucency: 'transparent',
    white: '#ffffff',
    black: '#000000',
    red: '#FF0000',
    orange: '#f97316',
    green: '#22c55e',
    sky: '#2563eb',
    yellow: '#fcd34d',
    violet: '#8b5cf6',
}

type Props = {
    className?: string
    style?: React.CSSProperties
    defaultValue?: string
    onChange?: (value: string) => void
    name?: string
}

export const Color = ({
    defaultValue = 'transparent',
    onChange,
    className,
    style,
    name,
}: Props): ReactNode => {
    const [value, setValue] = useState<string>(defaultValue)
    return (
        <>
            {name && (
                <input
                    name={name}
                    hidden
                    value={value}
                    readOnly
                />
            )}

            <ToggleGroup
                type="single"
                variant="outline"
                size={'sm'}
                style={style}
                className={`grid grid-cols-[repeat(auto-fit,90px)] gap-2 text-xs ${className}`}
                value={value}
                onValueChange={(value) => {
                    setValue(value)
                    onChange?.(value)
                }}
            >
                {Object.entries(Colors).map(([color, value]) => (
                    <ToggleGroupItem
                        key={color}
                        value={value}
                    >
                        <div
                            className={`min-w-4 min-h-4 rounded-full ${
                                color === 'white' ? 'border' : ''
                            }`}
                            style={{
                                background:
                                    color === 'lucency'
                                        ? 'repeating-conic-gradient(#bbb 0, #bbb 25%, #eee 0, #eee 50%)'
                                        : value,
                            }}
                        />
                        {color}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </>
    )
}

export const MiniColor = ({
    defaultValue = 'transparent',
    onChange,
    className,
    style,
    name,
}: Props): ReactNode => {
    const [value, setValue] = useState<string>(defaultValue)

    return (
        <>
            {name && (
                <input
                    name={name}
                    hidden
                    value={value}
                    readOnly
                />
            )}
            <ToggleGroup
                type="single"
                variant="outline"
                size={'sm'}
                value={value}
                onValueChange={(color) => {
                    setValue(color)
                    onChange?.(color)
                }}
                style={style}
                className={`grid grid-cols-[repeat(auto-fit,2rem)] text-xs ${className}`}
            >
                {Object.entries(Colors).map(([color, value]) => (
                    <Tooltip key={color}>
                        <TooltipTrigger asChild>
                            <ToggleGroupItem value={value}>
                                <div
                                    className={`min-w-4 min-h-4 rounded-full ${
                                        color === 'white' ? 'border' : ''
                                    }`}
                                    style={{
                                        background:
                                            color === 'lucency'
                                                ? 'repeating-conic-gradient(#bbb 0, #bbb 25%, #eee 0, #eee 50%)'
                                                : value,
                                    }}
                                />
                            </ToggleGroupItem>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{color}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </ToggleGroup>
        </>
    )
}
