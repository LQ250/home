/**
 * @file bg.tsx
 * @description 背景组件, 用于显示背景图片
 * @author LQ250
 * @date 2025-08-20 22:40:35
 */
/* =========| react |========= */
import type { ReactNode } from 'react'

/* =========| jotai |========= */
import { useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export const bgAtom = atomWithStorage<string>('BGURL', '/bg.png')

export const Bg = (): ReactNode => {
    const bg = useAtomValue(bgAtom)
    return (
        <div className='fixed top-0 left-0 h-screen w-screen'>
            <img
                src={bg}
                draggable={false}
                className='h-full w-full object-cover'
                alt=''
            />
        </div>
    )
}
