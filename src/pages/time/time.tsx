/**
 * @file time.tsx
 * @description 这是时间组件, 为了保证最基础的体验, 是一个纯css实现的时间组件
 * @author LQ250
 * @date 2025-08-19 17:06:18
 */
/* =========| react |========= */
import type { CSSProperties, ReactNode } from 'react'
import { useMemo } from 'react'

/* =========| jotai |========= */
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

/* =========| utils |========= */
import { cn } from '@/lib/utils'

/* =========| components |========= */
import { DraggableY } from '@/components/DraggableY'

/* =========| style |========= */
import './style.css'

const TimeOffsetYAtom = atomWithStorage<number>('TimeOffsetY', 140)

export const Time = (): ReactNode => {
    const time = useMemo<CSSProperties>(() => {
        const d = new Date()
        const h = d.getHours()
        const m = d.getMinutes()
        const s = d.getSeconds()
        return {
            '--ds': s,
            '--dm': m + s / 60,
            '--dh': h + m / 60 + s / 3600,
        } as CSSProperties
    }, [])

    const [timeOffsetY, setTimeOffsetY] = useAtom(TimeOffsetYAtom)

    return (
        <DraggableY
            className={cn('top-12 !w-full')}
            initialY={timeOffsetY}
            onDragEnd={(y) => setTimeOffsetY(y)}
        >
            <div
                className={`time drag-handle relative left-1/2 inline-flex -translate-x-1/2 justify-center font-mono text-[min(16vmin,2.4rem)] select-none sm:text-6xl`}
                style={time}
            >
                <span className='hour'></span>
                <span className='mx-1'>:</span>
                <span className='minitus'></span>
                <span className='mx-1'>:</span>
                <span className='seconds'></span>
            </div>
        </DraggableY>
    )
}
