/**
 * @file dock.tsx
 * @description 底部 dock 组件, 用于显示快捷方式
 * @author LQ250
 * @date 2025-08-20 22:40:58
 */
/* =========| icon |========= */
import {
    ArrowUpToLine,
    Link,
    NotebookPen,
    SquareArrowOutUpRight,
    Trash2,
} from 'lucide-react'

/* =========| react |========= */
import { type FC, type ReactNode, useMemo, useState } from 'react'

/* =========| jotai |========= */
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

/* =========| utils |========= */
import { cn } from '@/lib/utils'

/* =========| hooks |========= */
import { useWindowSize } from '@/hooks/getWindowSize'

/* =========| components |========= */
import { Button } from '@/components/ui/button'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'

import { DraggableY } from '@/components/DraggableY'

/* =========| 与launchpad组件进行配合 |========= */
import { DockAdd } from './dockItme'
import { DockSet } from './dockItme'
import { LaunchpadDataAtom, LaunchpadShowAtom } from './launchpad'
import type { shortcutData } from './types'
import { OPEN_URL, chunkArray } from './utils'

/* =========| 持久化的数据 |========= */
const DockOffsetYAtom = atomWithStorage<number>('DockOffsetY', 0)

const DefaultDockData = [
    {
        id: '6f0ae700-c83d-4d97-8dd3-7fe7cc19ca7d',
        url: 'https://www.bilibili.com/',
        text: 'bilibili',
        icon: 'https://s1.aigei.com/src/img/png/e7/e76e39e06fcf4665a824df10c5285ab9.png?imageMogr2/auto-orient/thumbnail/!282x282r/gravity/Center/crop/282x282/quality/85/%7CimageView2/2/w/282&e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:RFH_N96Qi9zFyThEIuUS41PCorw=',
        bgColor: '#ffffff',
        padding: 4,
        RightClickData: [
            {
                uuid: '95cf6e4d-d6d3-4c13-be49-7c159d6655a7',
                text: '动态',
                url: 'https://t.bilibili.com/?spm_id_from=333.788.0.0',
            },
            {
                uuid: 'd54afc5c-5074-4173-afd0-9c17162255b3',
                text: '小曲',
                url: 'https://www.bilibili.com/list/ml2227095885',
            },
        ],
    },
    {
        id: '79b0ecd0-228c-468c-97e4-7302c2dd242f',
        url: 'https://fanyi.youdao.com/index.html#/TextTranslate',
        text: '有道翻译',
        icon: 'https://ydlunacommon-cdn.nosdn.127.net/31cf4b56e6c0b3af668aa079de1a898c.png',
        bgColor: '#ffffff',
        padding: 4,
        RightClickData: [],
    },
    {
        id: 'f062d3be-57d1-4bc3-a6fc-84bf836eda5a',
        url: 'https://react-icons.github.io/react-icons/',
        text: 'react-icons',
        icon: 'https://lf1-cdn2-tos.bytegoofy.com/bydesign/iconparksite/logo.svg',
        bgColor: '#ffffff',
        padding: 4,
        RightClickData: [],
    },
    {
        id: 'ac573202-1e9f-4e07-bde6-73c86fc65b69',
        url: 'https://tailwind.nodejs.cn/docs/installation',
        text: 'tailwindcss',
        icon: 'https://www.tailwindcss.cn/favicons/apple-touch-icon.png?v=3',
        bgColor: '#ffffff',
        padding: 0,
        RightClickData: [],
    },
    {
        id: 'b0057793-e9ed-471b-968b-04aa2a368921',
        url: 'https://ui.shadcn.com/docs/components',
        text: 'shadcn/ui',
        icon: 'https://avatars.githubusercontent.com/u/139895814?s=280&v=4',
        bgColor: '#ffffff',
        padding: 4,
        RightClickData: [],
    },
]

export const DockDataAtom = atomWithStorage<shortcutData[]>(
    'DockData',
    DefaultDockData
)

/* =========| 组件 简化代码阅读难度 |========= */
const DockItem: FC<
    shortcutData & {
        onDelete: (id: shortcutData['id']) => void
        onChange: (newValue: shortcutData) => void
        onMoveToLaunchpad: (id: shortcutData['id']) => void
    }
> = ({ onDelete, onChange, onMoveToLaunchpad, ...props }) => {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false)

    return (
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger>
                <Tooltip
                    open={tooltipOpen}
                    onOpenChange={(bool) => {
                        if (popoverOpen) return

                        setTooltipOpen(bool)
                    }}
                >
                    <TooltipTrigger asChild>
                        <div
                            style={{
                                padding: props.padding,
                                backgroundColor: props.bgColor,
                            }}
                            className='relative size-16 cursor-pointer overflow-clip rounded-lg'
                            onClick={() => OPEN_URL(props.url)}
                            onContextMenu={(e) => {
                                e.preventDefault()
                                setPopoverOpen(true)
                            }}
                        >
                            <img
                                draggable={false}
                                className='size-full overflow-clip rounded-lg'
                                src={props.icon}
                                alt=''
                            />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{props.text}</p>
                    </TooltipContent>
                </Tooltip>
            </PopoverTrigger>
            <PopoverContent className='*:!text-foreground w-max gap-y-1 bg-black/60 p-1 backdrop-blur-sm *:flex *:w-full *:justify-start'>
                <Button
                    onClick={() => OPEN_URL(props.url, true)}
                    className='hover:bg-foreground/10 bg-transparent p-1'
                >
                    <SquareArrowOutUpRight /> 新标签页打开
                </Button>

                <Button
                    onClick={() => onDelete(props.id)}
                    className='hover:bg-foreground/10 bg-transparent p-1'
                >
                    <Trash2 /> 删除
                </Button>

                <DockSet
                    className='hover:bg-foreground/10 bg-transparent p-1'
                    value={props}
                    onChange={onChange}
                >
                    <Button className='hover:bg-foreground/10 bg-transparent p-1'>
                        <NotebookPen /> 编辑
                    </Button>
                </DockSet>

                {props.RightClickData?.map((item) => (
                    <Button
                        key={item.uuid}
                        className='hover:bg-foreground/10 bg-transparent p-1'
                        onClick={() => OPEN_URL(item.url)}
                    >
                        <Link /> {item.text}
                    </Button>
                ))}

                <Button
                    className='hover:bg-foreground/10 bg-transparent p-1'
                    onClick={() => onMoveToLaunchpad(props.id)}
                >
                    <ArrowUpToLine /> 移动到启动台
                </Button>
            </PopoverContent>
        </Popover>
    )
}

const Config = (): ReactNode => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div className='relative size-16 cursor-pointer rounded-lg'>
                    <img
                        draggable={false}
                        className='size-full'
                        src='/config.png'
                        alt=''
                    />
                </div>
            </TooltipTrigger>
            <TooltipContent>设置</TooltipContent>
        </Tooltip>
    )
}

const Switch = (): ReactNode => {
    const [launchpadShow, setLaunchpadShow] = useAtom(LaunchpadShowAtom)

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                    onClick={() => setLaunchpadShow(!launchpadShow)}
                    className='relative z-50 size-16 cursor-pointer rounded-lg bg-black'
                >
                    <img
                        draggable={false}
                        className={cn('size-full transition-transform', {
                            'rotate-180': launchpadShow,
                        })}
                        src='/switch.png'
                        alt=''
                    />
                </div>
            </TooltipTrigger>
            <TooltipContent>启动台</TooltipContent>
        </Tooltip>
    )
}

const DockGap = 12
const DockItemWidth = 64

export const Dock = (): ReactNode => {
    const launchpadShow = useAtomValue(LaunchpadShowAtom)

    const [dockOffsetY, setDockOffsetY] = useAtom(DockOffsetYAtom)
    const [dockData, setDockData] = useAtom(DockDataAtom)
    const setLaunchpadData = useSetAtom(LaunchpadDataAtom)

    const { width } = useWindowSize()

    // gap = 12
    const dockGroupData = useMemo<{
        totalCount: number
        DockData: shortcutData[][]
    }>(() => {
        const w = (width * 0.8) | 0

        if (w <= 0)
            return {
                totalCount: 0,
                DockData: [],
            }

        const itemCount = dockData.length

        const totalCount = (w + DockGap) / (DockItemWidth + DockGap) - 2

        // * 可放置数量大于拥有数量,说明可以全部显示
        if (totalCount > itemCount) {
            return {
                totalCount: itemCount,
                DockData: [dockData],
            }
        }

        // * 可放置数量小于拥有数量,说明需要进行切片
        if (totalCount < itemCount) {
            return {
                totalCount,
                DockData: chunkArray(dockData, totalCount),
            }
        }

        return {
            totalCount,
            itemWidth: DockItemWidth,
            DockData: [dockData],
        }
    }, [width, dockData])

    const onDelete = (id: shortcutData['id']) => {
        setDockData((prev) => prev.filter((item) => item.id !== id))
    }

    const onChange = (newValue: shortcutData) => {
        setDockData((prev) =>
            prev.map((item) => (item.id === newValue.id ? newValue : item))
        )
    }

    const onMoveToLaunchpad = (id: shortcutData['id']) => {
        setLaunchpadData((prev) => {
            const itemToMove = dockData.find((item) => item.id === id)
            return itemToMove ? [...prev, itemToMove] : prev
        })
        setDockData((prev) => prev.filter((item) => item.id !== id))
    }

    return (
        <DraggableY
            className='!w-full'
            initialY={dockOffsetY}
            onDragEnd={(y) => setDockOffsetY(y)}
            style={{
                top: 'auto',
                bottom: '1.5rem',
            }}
        >
            <div className='relative left-1/2 inline-flex h-20 max-w-4/5 -translate-x-1/2 items-center gap-x-3 rounded-2xl px-2 backdrop-blur-2xl backdrop-saturate-150 select-none'>
                <Carousel>
                    <CarouselContent>
                        {dockGroupData.DockData.map((item, index) => (
                            <CarouselItem key={index} className='flex gap-x-3'>
                                {item.map((item, index) => (
                                    <DockItem
                                        key={index}
                                        {...item}
                                        onDelete={onDelete}
                                        onChange={onChange}
                                        onMoveToLaunchpad={onMoveToLaunchpad}
                                    />
                                ))}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                <div className='bg-foreground h-2/3 w-0.5 rounded' />
                <Config />
                <Switch />

                <DockAdd
                    className={cn(
                        'bg-accent absolute top-2 left-full size-16 cursor-pointer rounded-lg transition-all duration-300',
                        launchpadShow
                            ? 'visible translate-x-0 opacity-100'
                            : 'invisible -translate-x-full opacity-0'
                    )}
                >
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <img
                                draggable={false}
                                className='size-full'
                                src='/add.png'
                                alt=''
                            />
                        </TooltipTrigger>
                        <TooltipContent>添加</TooltipContent>
                    </Tooltip>
                </DockAdd>
            </div>
        </DraggableY>
    )
}
