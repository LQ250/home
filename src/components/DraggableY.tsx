/**
 * @file DraggableY.tsx
 * @description 可以在Y 轴拖动的组件, 并未集成持久化, 需要外部进行管理
 * @author LQ250
 * @date 2025-08-20 08:00:53
 */
import { useEffect, useRef } from 'react'
import { atom, useAtomValue } from 'jotai'
import { Rnd, type Props } from 'react-rnd'

type DraggableYProps = {
    initialY: number // 初始偏移量
    onDragEnd?: (y: number) => void // 拖拽结束时回调
    children: React.ReactNode
} & Props

// * 是否允许拖动
export const isDragAtom = atom<boolean>(true)

export const DraggableY: React.FC<DraggableYProps> = ({
    initialY,
    onDragEnd,
    children,
    ...props
}) => {
    const ref = useRef<Rnd>(null)

    // 初始位置 使用 useEffect 是因为 initialY 是一个持久化的值, 初始是 0 ,
    // 需要等待一段时间才会更新, 而 Rnd 组件的 default 定义了就不会改变
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
