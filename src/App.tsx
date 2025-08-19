import type { FC, ReactNode } from 'react'
import { Bg } from '@/pages/bg'
import { Time } from '@/pages/time/time'
import { Theme } from '@/hooks/useTheme'

const App: FC = (): ReactNode => {
    return (
        <>
            <Theme />
            <main className='h-screen w-screen overflow-hidden'>
                <Bg />
                <Time />
            </main>
        </>
    )
}

export default App
