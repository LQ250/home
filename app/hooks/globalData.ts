import { create } from 'zustand/react'
export { useShallow } from 'zustand/react/shallow'

type GlobalData = {
	showLaunchpad: boolean
	toggleShowLaunchpad: () => void
	setShowLaunchpad: (showLaunchpad: GlobalData['showLaunchpad']) => void
}

/* =========| zustand |========= */
export const useGlobalData = create<GlobalData>((set, get) => ({
	showLaunchpad: false,
	toggleShowLaunchpad: () => set({ showLaunchpad: !get().showLaunchpad }),
	setShowLaunchpad: (showLaunchpad) => set({ showLaunchpad }),
}))

export const openPage = (url: string, blank:boolean=false) => {
	console.log({blank})

	if(blank){
		window.open(url, '_blank')
		return
	}
	window.open(url,'_self')
}
