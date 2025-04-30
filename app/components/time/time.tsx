import type { CSSProperties, ReactNode, FC } from 'react'
import { useEffect, useRef, useState } from 'react'
import './time.css'

import { useDrag } from '@use-gesture/react'

type Props = {
    className?: string
    style?: CSSProperties
    dragValue?: number
    onChangeDragValue?: (y: number) => void
}
export const Time: FC<Props> = ({
    className,
    style,
    dragValue = 0,
    onChangeDragValue,
}): ReactNode => {
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        setShow(true)
    }, [])

    const time = useRef<() => CSSProperties>(() => {
        const d = new Date()
        const h = d.getHours()
        const m = d.getMinutes()
        const s = d.getSeconds()

        return {
            '--ds': s,
            '--dm': m + s / 60,
            '--dh': h + m / 60 + s / 3600,
        } as CSSProperties
    })

    const bind = useDrag(
        ({ offset: [_, y], altKey }) => {
            if (!altKey) return
            onChangeDragValue?.(y)
        },
        { axis: 'y' },
    )

    if (!show) return <></>

    return (
        <div
            className={`time touch-none fixed left-1/2 top-12 flex w-fit -translate-x-1/2 translate-y-0 select-none items-center text-[min(16vmin,2.4rem)] sm:text-6xl font-mono ${className}`}
            style={
                {
                    ...time.current(),
                    '--tw-translate-y': `${dragValue}px`,
                    ...style,
                } as CSSProperties
            }
            {...bind()}
        >
            <span className="hour"></span>
            <span className="mx-1">:</span>
            <span className="minitus"></span>
            <span className="mx-1">:</span>
            <span className="seconds"></span>
        </div>
    )
}
