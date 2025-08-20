import type { FC, ReactNode } from 'react'
import { Bg } from '@/pages/bg'
import { Search } from '@/pages/search'
import { Time } from '@/pages/time/time'
import { Theme } from '@/hooks/useTheme'
import { Toaster } from '@/components/ui/sonner'

const App: FC = (): ReactNode => {
    return (
        <>
            <Theme />
            <main className='h-screen w-screen overflow-hidden'>
                <Bg />
                <Time />
                <Search />
            </main>
            <Toaster position='top-right' />
        </>
    )
}

export default App
