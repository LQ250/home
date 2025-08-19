import { type ReactNode } from 'react'
import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const themeAtom = atomWithStorage<'light' | 'dark'>('theme', 'dark')

export const useTheme = () => {
    const [theme, setTheme] = useAtom(themeAtom)
    return {
        theme,
        setTheme,
    }
}

export const Theme = (): ReactNode => {
    const { theme } = useTheme()

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(theme)
    }, [theme])

    return <></>
}
