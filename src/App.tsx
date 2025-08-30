/**
 * @file App.tsx
 * @description 入口文件, 最大的作用是组合组件
 * @author LQ250
 * @date 2025-08-20 22:40:03
 */
import type { FC, ReactNode } from 'react'

import { Bg } from '@/pages/bg'
import { Dock } from '@/pages/nav/dock'
import { Launchpad } from '@/pages/nav/launchpad'
import { Search } from '@/pages/search'
import { Time } from '@/pages/time/time'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

const App: FC = (): ReactNode => {
    return (
        <TooltipProvider delayDuration={200}>
            <main
                className='h-screen w-screen overflow-hidden'
                onContextMenu={(e) => {
                    e.preventDefault()
                }}
            >
                <Bg />
                <Time />
                <Search />
                <Launchpad />
                <Dock />
            </main>
            <Toaster position='top-right' />
        </TooltipProvider>
    )
}

export default App
