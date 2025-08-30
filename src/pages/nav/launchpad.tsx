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
import { atom, useAtom, useAtomValue } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

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

import type { shortcutData } from './types'
import { OPEN_URL, chunkArray } from './utils'

const DefaultLaunchpadData = [
    {
        id: '37e81dd5-bfca-4aeb-94c9-08ff14f6f2f4',
        url: 'https://a.xn--30rs3bu7r87f.com/#/node',
        text: '加速器',
        icon: 'https://tse3.mm.bing.net/th/id/OIP.MiekxsagjedgSjwwl29wOAHaHa?w=169&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
        bgColor: 'transparent',
        padding: 0,
        RightClickData: [],
    },
    {
        url: 'https://gitee.com/YingTianDaDa/',
        text: 'gitee',
        icon: 'https://toolb.cn/favicon/https://gitee.com/YingTianDaDa/',
        bgColor: '#ffffff',
        padding: 4,
        id: 'd408e233-a0fc-4e25-9dfd-585288a0cac6',
        RightClickData: [],
    },
    {
        id: 'd749b6fb-57fe-4d23-8a65-5a9596da7930',
        url: 'https://github.com/',
        text: 'GitHub',
        icon: 'https://github.com/windows-tile.png',
        bgColor: '#ffffff',
        padding: 4,
        RightClickData: [
            {
                uuid: 'a1ccf4fe-be45-4ec9-81c3-cea402d53dfd',
                text: 'stars',
                url: 'https://github.com/LQ250?tab=stars',
            },
        ],
    },
    {
        url: 'https://cn.vuejs.org/',
        text: 'vue3',
        icon: 'https://cn.vuejs.org/logo.svg',
        bgColor: '#ffffff',
        padding: 8,
        id: 'a188432d-e2c2-43ae-9241-25b989f3486a',
        RightClickData: [],
    },
    {
        icon: 'https://toastlog.com/img/logos/cssscan.svg',
        text: 'css 阴影',
        url: 'https://getcssscan.com/css-box-shadow-examples?ref=producthunt',
        padding: 0,
        bgColor: 'transparent',
        id: '9df916fb-2169-4ac5-8618-74fad5e95245',
        RightClickData: [],
    },
    {
        url: 'https://cssgrid-generator.netlify.app/',
        text: 'css 网格布局生成器',
        icon: 'https://img.51miz.com/Element/00/88/91/79/499a47f1_E889179_361f772c.png',
        bgColor: 'transparent',
        padding: 0,
        id: '271ebcdf-9f4a-4cb5-ab14-32c02ee2e3ed',
        RightClickData: [],
    },
    {
        icon: 'https://getman.cn/img/apple-touch-icon.png',
        text: 'get/post',
        url: 'https://getman.cn/',
        padding: 0,
        bgColor: 'transparent',
        id: '4183058e-6dc8-4977-8ee0-423bd3d78352',
        RightClickData: [],
    },
    {
        url: 'https://www.naiveui.com/zh-CN/os-theme',
        text: 'Naive UI',
        icon: 'https://toolb.cn/favicon/https://www.naiveui.com/zh-CN/os-theme',
        bgColor: '#ffffff',
        padding: 8,
        id: '10bc55e0-1f59-4a8c-8a92-7ccd51acb6d1',
        RightClickData: [],
    },
    {
        id: '977a4410-f361-45a8-9a13-4f5f57a83e47',
        url: 'https://reactrouter.remix.org.cn/home',
        text: 'react router',
        icon: 'https://reactrouter.com/favicon-light.png',
        bgColor: '#ffffff',
        padding: 0,
        RightClickData: [],
    },
    {
        icon: 'https://static.alphacoders.com/icons/wallpaper/apple-touch-icon.png',
        text: '网页背景',
        url: 'https://wall.alphacoders.com/?lang=Chinese',
        padding: 0,
        bgColor: 'transparent',
        RightClickData: [],
        id: '5bd21f0f-7525-40f1-9a07-1f81467c6b99',
    },
    {
        icon: 'https://patchwiki.biligame.com/images/blhx/thumb/e/e9/nlvw0ar5egivnew7tq5oijw4xmf6sbr.png/150px-%E7%A2%A7%E8%93%9D%E8%88%AA%E7%BA%BFicon.png',
        text: '碧蓝航线wiki',
        url: 'https://wiki.biligame.com/blhx/%E9%A6%96%E9%A1%B5',
        padding: 0,
        bgColor: 'transparent',
        RightClickData: [],
        id: 'a94619eb-bb0e-4148-af23-836049198a58',
    },
    {
        url: 'https://poe.com/',
        text: 'chatGpt体验版',
        icon: 'https://qph.cf2.poecdn.net/main-thumb-pb-3036-200-rsdgletibxevstyopxokcrczeqrnvjek.jpeg',
        bgColor: '#000000',
        padding: 0,
        RightClickData: [],
        id: '1988d8b4-da9f-4284-bc2f-748715f19968',
    },
    {
        url: 'https://socialsisteryi.github.io/bilibili-API-collect/',
        text: '哔哩哔哩接口',
        icon: 'https://toolb.cn/favicon/https://bilibiliapi.github.io/api/',
        bgColor: 'transparent',
        padding: 0,
        RightClickData: [],
        id: '8d5226c2-5c5f-4d8b-ba22-c910692c76da',
    },
    {
        url: 'https://www.iloveimg.com/zh-cn/upscale-image',
        text: '图片放大',
        icon: 'https://tse2.mm.bing.net/th/id/OIP.4RSMCCPh_dE4Hhn_TiVCeAHaHa?w=175&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
        bgColor: 'transparent',
        padding: 0,
        RightClickData: [],
        id: '131b9cd5-84b6-41dc-8a87-0a82b3cdebf9',
    },
    {
        id: '77cfbc28-ffde-47e5-a8c7-d878aaace907',
        url: 'https://tauri.app/zh-cn/',
        text: 'tauri',
        icon: 'https://toolb.cn/favicon/https://tauri.app/zh-cn/',
        bgColor: '#000000',
        padding: 8,
        RightClickData: [],
    },
    {
        id: '57cbc413-f02a-40ee-a3a6-f8499fb09003',
        text: 'shadcnUI 资源速查',
        url: 'https://shadcn.batchtool.com/',
        icon: 'https://shadcn.batchtool.com/_next/image?url=%2Flogo.png&w=64&q=75',
        bgColor: 'transparent',
        padding: 0,
        RightClickData: [],
    },
    {
        id: 'a9f82067-0888-4abb-b1b9-4638010e113b',
        url: 'https://originui.com/',
        text: 'originui',
        icon: 'https://originui.com/icon.svg?74bcc67f0350e7f2',
        bgColor: '#000000',
        padding: 8,
        RightClickData: [],
    },
    {
        id: 'cabb8b32-8224-4322-9f1e-4a12661450cb',
        url: 'https://ahooks.js.org/zh-CN',
        text: 'ahooks',
        icon: 'https://ahooks.js.org//simple-logo.svg',
        bgColor: '#ffffff',
        padding: 4,
        RightClickData: [],
    },
    {
        id: '7722a682-3b82-4162-8855-38a9c0bf848b',
        text: '自动生成网页',
        url: 'https://llamacoder.together.ai/',
        icon: 'https://llamacoder.together.ai/favicon.ico',
        bgColor: '#ffffff',
        padding: 4,
        RightClickData: [],
    },
    {
        id: 'd959b14e-05b8-428b-bd8a-ed86ab324be2',
        url: 'https://ui.aceternity.com/',
        text: '带动画的shadcnui库',
        icon: 'https://ui.aceternity.com/logo.png',
        bgColor: 'transparent',
        padding: 0,
        RightClickData: [],
    },
    {
        url: 'https://motion.framer.wiki/basic-anilogic',
        text: 'framer-motion 动画库',
        icon: 'https://framerusercontent.com/sites/icons/default-favicon.v3.png',
        bgColor: '#ffffff',
        padding: 4,
        id: '88054c72-4373-43db-ba63-061a5551b20f',
        RightClickData: [],
    },
    {
        url: 'https://lynxjs.org/zh/',
        text: 'Lynx',
        icon: 'https://lf-lynx.tiktok-cdns.com/obj/lynx-artifacts-oss-sg/lynx-website/assets/lynx-light-logo.svg',
        bgColor: '#000000',
        padding: 8,
        RightClickData: [],
        id: 'b3c3d7e5-3d7e-4d7e-b7e5-0b7e5b7e5b7e',
    },
    {
        id: '2f6f5ae6-0701-486b-a9ac-f1308d94cd2d',
        url: 'https://bun.net.cn/docs',
        text: 'bun',
        icon: 'https://bun.sh/logo.svg',
        bgColor: '#ffffff',
        padding: 4,
        RightClickData: [],
    },
    {
        id: '32a98301-deb6-4125-9155-d3dfba868281',
        url: 'https://tanstack.com.cn/router/latest',
        text: 'tanstack router',
        icon: 'https://tanstack.com.cn/_build/assets/logo-color-100w-br5_Ikqp.png',
        bgColor: '#ffffff',
        padding: 4,
        RightClickData: [],
    },
    {
        id: '4e07cd33-d872-481b-9ea1-b99e250e17f3',
        url: 'https://www.kibo-ui.com/components/announcement',
        text: 'kiboUI',
        icon: 'https://www.kibo-ui.com/apple-icon.png?apple-icon.2a18b1b3.png',
        bgColor: 'transparent',
        padding: 0,
        RightClickData: [],
    },
    {
        id: '43d59355-754d-4288-bb4e-3df10ccce092',
        url: 'https://jotai.org/docs',
        text: '原子化的react 状态管理库',
        icon: 'https://www.jotai.com.cn/favicon.svg',
        bgColor: '#ffffff',
        padding: 8,
        RightClickData: [],
    },
    {
        id: '41e52433-2ba2-4edc-9708-4577728b51ff',
        url: 'https://animate-ui.com/',
        text: 'animate-ui',
        icon: 'https://animate-ui.com/favicon.ico',
        bgColor: 'transparent',
        padding: 0,
        RightClickData: [],
    },
    {
        id: 'b3cd150f-d305-47f6-8f33-77c4f84ecefe',
        url: 'https://lucide.dev/icons/',
        text: 'lucide-icon',
        icon: 'https://lucide.dev/logo.dark.svg',
        bgColor: '#000000',
        padding: 4,
        RightClickData: [],
    },
    {
        id: '70b0c81d-b04a-4a08-99aa-c43789f91676',
        url: 'https://elysia.zhcndoc.com/at-glance.html',
        text: 'ElysiaJS',
        icon: 'https://elysia.zhcndoc.com/assets/elysia.svg',
        bgColor: '#ffffff',
        padding: 8,
        RightClickData: [],
    },
    {
        id: '8d746aa8-4e56-4bc0-9393-6c443fd7abda',
        url: 'https://docs.flutter.cn/get-started/install',
        text: 'flutter',
        icon: 'https://www.flutterschool.cn/favicon.ico',
        bgColor: '#ffffff',
        padding: 8,
        RightClickData: [],
    },
]

export const LaunchpadDataAtom = atomWithStorage<shortcutData[]>(
    'LaunchpadData',
    DefaultLaunchpadData
)

const LaunchpadItem: FC<
    shortcutData & {
        onDelete: (id: shortcutData['id']) => void
    }
> = ({ id, icon, text, padding, bgColor, url, RightClickData, onDelete }) => {
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
                                padding,
                                backgroundColor: bgColor,
                            }}
                            className='relative size-16 cursor-pointer rounded-lg'
                            onClick={() => OPEN_URL(url)}
                            onContextMenu={(e) => {
                                e.preventDefault()
                                console.log('setPopoverOpen')
                                setPopoverOpen(true)
                            }}
                        >
                            <img
                                draggable={false}
                                className='size-full overflow-clip rounded-lg'
                                src={icon}
                                alt=''
                            />

                            <p className='absolute top-full left-0 mt-1 w-full overflow-hidden text-center text-xs text-ellipsis whitespace-nowrap text-white'>
                                {text}
                            </p>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{text}</p>
                    </TooltipContent>
                </Tooltip>
            </PopoverTrigger>
            <PopoverContent className='*:!text-foreground w-max gap-y-1 bg-black/60 p-1 backdrop-blur-sm *:flex *:w-full *:justify-start'>
                <Button
                    onClick={() => OPEN_URL(url, true)}
                    className='hover:bg-foreground/10 bg-transparent p-1'
                >
                    <SquareArrowOutUpRight /> 新标签页打开
                </Button>

                <Button className='hover:bg-foreground/10 bg-transparent p-1'>
                    <NotebookPen /> 编辑
                </Button>

                <Button
                    className='hover:bg-foreground/10 bg-transparent p-1'
                    onClick={() => onDelete(id)}
                >
                    <Trash2 /> 删除
                </Button>
                {RightClickData?.map((item) => (
                    <Button
                        key={item.uuid}
                        className='hover:bg-foreground/10 bg-transparent p-1'
                        onClick={() => OPEN_URL(item.url)}
                    >
                        <Link /> {item.text}
                    </Button>
                ))}
                <Button className='hover:bg-foreground/10 bg-transparent p-1'>
                    <ArrowUpToLine /> 移动到dock栏
                </Button>
            </PopoverContent>
        </Popover>
    )
}

const DockGap = 20
const DockItemWidth = 64
const DockItemHeight = 84

export const LaunchpadShowAtom = atom<boolean>(false)

export const Launchpad = (): ReactNode => {
    const launchpadShow = useAtomValue(LaunchpadShowAtom)

    const [launchpadData, setLaunchpadData] = useAtom(LaunchpadDataAtom)

    const windowSize = useWindowSize()

    const dockGroupData = useMemo<{
        totalCount: number
        boxHeight: number
        launchpadData: shortcutData[][]
    }>(() => {
        const w = (windowSize.width * 0.8) | 0
        const h = windowSize.height - 120 - 64

        if (w <= 0)
            return {
                totalCount: 0,
                boxHeight: h,
                launchpadData: [],
            }

        const itemCount = launchpadData.length

        const totalCol = (w + DockGap) / (DockItemWidth + DockGap) - 2
        const totalRow = (h + DockGap) / (DockItemHeight + DockGap) - 2

        const totalCount = totalRow * totalCol

        // * 可放置数量大于拥有数量,说明可以全部显示
        if (totalCount > itemCount) {
            return {
                totalCount: itemCount,
                boxHeight: h,
                launchpadData: [launchpadData],
            }
        }

        // * 可放置数量小于拥有数量,说明需要进行切片
        if (totalCount < itemCount) {
            return {
                totalCount,
                boxHeight: h,
                launchpadData: chunkArray(launchpadData, totalCount),
            }
        }

        return {
            totalCount,
            boxHeight: h,
            launchpadData: [launchpadData],
        }
    }, [windowSize, launchpadData])

    const onDelete = (id: shortcutData['id']) => {
        setLaunchpadData((prev) => prev.filter((item) => item.id !== id))
    }

    if (dockGroupData.totalCount === 0) return null

    return (
        <Carousel
            className={cn(
                'visible fixed inset-0 scale-100 opacity-100 backdrop-blur-2xl transition-[scale,visibility,opacity] duration-300 select-none',
                !launchpadShow && 'invisible scale-110 opacity-0'
            )}
        >
            <CarouselContent
                className='mt-16 px-[10vw]'
                style={{ height: dockGroupData.boxHeight }}
            >
                {dockGroupData.launchpadData.map((item, index) => (
                    <CarouselItem
                        key={index}
                        style={{
                            gridTemplateRows: `repeat(auto-fill, ${DockItemHeight}px)`,
                            gridTemplateColumns: `repeat(auto-fill, ${DockItemWidth}px)`,
                            gap: `${DockGap}px`,
                        }}
                        className='grid size-full justify-center'
                    >
                        {item.map((item, index) => (
                            <LaunchpadItem
                                key={index}
                                {...item}
                                onDelete={onDelete}
                            />
                        ))}
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    )
}
