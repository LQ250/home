import type { ReactNode } from 'react'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { DraggableY } from '@/components/DraggableY'

const DockOffsetYAtom = atomWithStorage<number>('DockOffsetY', 0)

export const Dock = (): ReactNode => {
    const [dockOffsetY, setDockOffsetY] = useAtom(DockOffsetYAtom)

    return (
        <DraggableY initialY={dockOffsetY} onDragEnd={(y) => setDockOffsetY(y)}>
            <div></div>
        </DraggableY>
    )
}
