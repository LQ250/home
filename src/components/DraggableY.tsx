import { useEffect, useRef } from 'react'
import { atom, useAtomValue } from 'jotai'
import { Rnd } from 'react-rnd'

type DraggableYProps = {
    initialY: number // 初始偏移量
    onDragEnd?: (y: number) => void // 拖拽结束时回调
    minY?: number // 最小 Y 边界
    maxY?: number // 最大 Y 边界
    children: React.ReactNode
}

// * 是否允许拖动
export const isDragAtom = atom<boolean>(false)

export const DraggableY: React.FC<
    DraggableYProps & {
        className?: string
        style?: React.CSSProperties
    }
> = ({ initialY, onDragEnd, children, ...props }) => {
    const ref = useRef<Rnd>(null)

    useEffect(() => {
        if (ref.current) {
            ref.current.updatePosition({ x: 0, y: initialY })
        }
    }, [initialY])

    const isDrag = useAtomValue(isDragAtom)

    return (
        <Rnd
            ref={ref}
            default={{
                x: 0,
                y: 0,
                width: 'auto',
                height: 'auto',
            }}
            enableResizing={false}
            disableDragging={isDrag} // 禁止缩放，只允许拖拽
            dragAxis='y' // 只允许 Y 轴拖动
            bounds={document.body} // 设置边界
            dragHandleClassName='drag-handle'
            onDragStop={(_, d) => onDragEnd?.(d.y)}
            {...props}
        >
            {children}
        </Rnd>
    )
}
