/*
 * @Author: LQ250
 * @Date: 2023-07-27 17:19:49
 * @LastEditTime: 2025-04-29 15:34:18
 * @Description: 滑块
 * @FilePath: \home\app\components\range\range.tsx
 */

import { useRef, type FC, type ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'

import './style.css'

/* =========| 工具类型 |========= */
type Without<FirstType, SecondType> = {
    [KeyType in Exclude<keyof FirstType, keyof SecondType>]?: never
}

type MergeExclusive<FirstType, SecondType> =
    | FirstType
    | SecondType extends object
    ?
          | (Without<FirstType, SecondType> & SecondType)
          | (Without<SecondType, FirstType> & FirstType)
    : FirstType | SecondType

export type RangeProps = {
    name?: string
    min?: number
    max?: number
    step?: number
    className?: string
    style?: React.CSSProperties
    formatTooltip?: (value: number) => string
    isCloseFocus?: boolean
} & MergeExclusive<
    {
        defaultValue?: number
    },
    {
        value: number
        onChange: (value: number) => void
    }
>

/* =========| 工具函数 |========= */
function calculateActualValue(
    progress: number,
    minValue: number,
    maxValue: number,
    reservedBits: number = 0,
): number {
    // 根据进度、最小值和最大值计算实际值
    const actualValue = minValue + progress * (maxValue - minValue)
    return Number(actualValue.toFixed(reservedBits))
}

const useBoolean = (defaultValue?: boolean) => {
    const [value, setValue] = useState<boolean>(defaultValue ?? false)
    return [
        value,
        { setTrue: () => setValue(true), setFalse: () => setValue(false) },
    ] as const
}

export const Range: FC<RangeProps> = (props): ReactNode => {
    const [value, setValue] = useState<number>(
        props.value ?? props.defaultValue ?? 0,
    )

    const [candidateValue, setCandidateValue] = useState<number>(value)

    const [isShow, { setTrue, setFalse }] = useBoolean(false)

    const labelRef = useRef<HTMLLabelElement>(null)

    type State = {
        x: number
        y: number
    }
    const [position, setPosition] = useState<State>({
        x: 0,
        y: 0,
    })

    return (
        <>
            <label
                ref={labelRef}
                className="slider light w-full"
            >
                <input
                    onMouseEnter={setTrue}
                    // 鼠标滑动
                    onMouseMove={(e) => {
                        const Rect = labelRef.current?.getBoundingClientRect()

                        if (!Rect) {
                            return
                        }

                        setPosition({
                            x: e.clientX,
                            y: Rect?.y ?? 0,
                        })

                        const offsetX = e.clientX - Rect.x

                        // & 计算进度
                        const progress = offsetX / Rect.width

                        // & 计算值
                        const value = calculateActualValue(
                            progress,
                            props.min ?? 0,
                            props.max ?? 100,
                            props.step?.toString().split('.')[1]?.length ?? 0,
                        )

                        setCandidateValue(value)
                    }}
                    onMouseLeave={setFalse}
                    type="range"
                    className="level"
                    value={value}
                    onChange={(e) => {
                        setValue(Number(e.target.value))
                        setCandidateValue(Number(e.target.value))
                    }}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    name={props.name}
                />
            </label>

            {props.isCloseFocus &&
                createPortal(
                    <div
                        style={
                            {
                                '--tw-translate-x': `calc(${position.x}px - 50%)`,
                                '--tw-translate-y': `calc(${position.y}px - 100% - 14px)`,
                            } as React.CSSProperties
                        }
                        className="fixed left-0 top-0 transform-cpu"
                    >
                        <div
                            className={`${
                                isShow
                                    ? 'opacity-100 scale-100'
                                    : 'opacity-0 scale-0'
                            } tooltip whitespace-nowrap z-50 bg-[#1D2129] w-fit transform-cpu rounded-md px-3.5 py-1.5 text-sm text-popover-foreground`}
                        >
                            {props?.formatTooltip?.(candidateValue) ??
                                candidateValue}
                            <span className="tooltip-arrow" />
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    )
}
