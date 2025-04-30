import type { ReactNode } from 'react'
import { TooltipProvider } from '~/components/ui/tooltip'

import { BG } from '~/page/bg'
import { Time } from '~/components/time/time'
import { Config } from '~/page/config'
import { Search } from '~/page/search'
import { Dock } from '~/page/dock'
import { Launchpad } from '~/page/launchpad'

/* =========| zustand |========= */
import { useUserStore, useShallow } from '~/hook/zustand'

const Home = (): ReactNode => {
    const { timeTop, setTimeTop, bgUrl, setSearchTop, searchTop } =
        useUserStore(
            useShallow((e) => ({
                timeTop: e.timeTop,
                setTimeTop: e.setTimeTop,
                bgUrl: e.bgUrl,
                searchTop: e.searchTop,
                setSearchTop: e.setSearchTop,
            })),
        )

    return (
        <>
            <div className="h-screen *:z-10">
                <TooltipProvider delayDuration={200}>
                    <BG src={bgUrl} />
                    <Time
                        dragValue={timeTop}
                        onChangeDragValue={setTimeTop}
                        className="text-white"
                    />
                    <Search
                        dragValue={searchTop}
                        onChangeDragValue={setSearchTop}
                    />
                    <Launchpad />
                    <Dock />
                    {/* <Config /> */}
                </TooltipProvider>
            </div>
        </>
    )
}

export default Home
