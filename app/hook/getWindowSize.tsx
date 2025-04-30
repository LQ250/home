import { useState, useEffect, useRef } from 'react'

export const useWindowSize = () => {
    const [size, setSize] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    })

    const time = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const handleResize = () => {
            if (time.current) {
                clearTimeout(time.current)
            }

            time.current = setTimeout(() => {
                setSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                })
            }, 200)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return size
}
