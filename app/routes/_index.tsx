import { useEffect, type ReactNode } from 'react'
import { TooltipProvider } from '~/components/ui/tooltip'

import { BG } from '~/page/bg'
import { Time } from '~/components/time/time'
import { Search } from '~/page/search'
import { Dock } from '~/page/dock'
import { Launchpad } from '~/page/launchpad'

/* =========| zustand |========= */
import { useUserStore, useShallow, getBgUrl } from '~/hooks/zustand'

const Home = (): ReactNode => {
	const {
		timeTop,
		setTimeTop,
		bgUrl,
		bgType,
		setSearchTop,
		searchTop,
		setBgUrl,
	} = useUserStore(
		useShallow((e) => ({
			timeTop: e.timeTop,
			setTimeTop: e.setTimeTop,
			bgUrl: e.bgUrl,
			searchTop: e.searchTop,
			setSearchTop: e.setSearchTop,
			setBgUrl: e.setBgUrl,
			bgType: e.bgType,
		})),
	)

	useEffect(() => {
		getBgUrl(bgType).then((url) => {
			setBgUrl(url)
		})
	}, [])

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
				</TooltipProvider>
			</div>
		</>
	)
}

export default Home
