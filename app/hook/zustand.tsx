import { create } from 'zustand/react'
import { persist } from 'zustand/middleware'
export { useShallow } from 'zustand/react/shallow'

const defaultDock: shortcutData[] = [
    {
        id: 'c0a9c178-6c03-465d-8c86-fb5bdebb6ee5',
        url: 'https://www.bilibili.com/',
        text: 'bilibili',
        icon: 'https://s1.aigei.com/src/img/png/e7/e76e39e06fcf4665a824df10c5285ab9.png?imageMogr2/auto-orient/thumbnail/!282x282r/gravity/Center/crop/282x282/quality/85/%7CimageView2/2/w/282&e=2051020800&token=P7S2Xpzfz11vAkASLTkfHN7Fw-oOZBecqeJaxypL:RFH_N96Qi9zFyThEIuUS41PCorw=',
        bgColor: 'transparent',
        padding: 0,
        RightClickData: [],
    },
    {
        id: 'afe3d3d9-b728-4ef5-b870-786fca1fb719',
        url: 'https://fanyi.youdao.com/index.html#/TextTranslate',
        text: '有道翻译',
        icon: 'https://ydlunacommon-cdn.nosdn.127.net/31cf4b56e6c0b3af668aa079de1a898c.png',
        bgColor: 'transparent',
        padding: 0,
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
        id: '62d7b5ff-9add-441a-98eb-7aada2bd35c5',
        url: 'https://tailwind.nodejs.cn/',
        text: 'tailwindcss',
        icon: 'https://www.tailwindcss.cn/favicons/apple-touch-icon.png?v=3',
        bgColor: 'transparent',
        padding: 0,
        RightClickData: [],
    },
    {
        id: 'a087f76e-751c-4fec-818b-f0bd6253072c',
        url: 'https://ui.shadcn.com/',
        text: 'shadcn/ui',
        icon: 'https://avatars.githubusercontent.com/u/139895814?s=280&v=4',
        bgColor: 'transparent',
        padding: 0,
        RightClickData: [],
    },
]

const defaultLaunchpad: shortcutData[] = [
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
    },
    {
        id: '55d271a7-2c3a-4302-9a40-e5c23e9ef86c',
        url: 'https://github.com/',
        text: 'GitHub',
        icon: 'https://github.com/windows-tile.png',
        bgColor: '#ffffff',
        padding: 4,
        RightClickData: [],
    },
    {
        url: 'https://cn.vuejs.org/',
        text: 'vue3',
        icon: 'https://cn.vuejs.org/logo.svg',
        bgColor: '#ffffff',
        padding: 8,
        id: 'a188432d-e2c2-43ae-9241-25b989f3486a',
    },
    {
        icon: 'https://toastlog.com/img/logos/cssscan.svg',
        text: 'css 阴影',
        url: 'https://getcssscan.com/css-box-shadow-examples?ref=producthunt',
        padding: 0,
        bgColor: 'transparent',
        id: '9df916fb-2169-4ac5-8618-74fad5e95245',
    },
    {
        url: 'https://cssgrid-generator.netlify.app/',
        text: 'css 网格布局生成器',
        icon: 'https://img.51miz.com/Element/00/88/91/79/499a47f1_E889179_361f772c.png',
        bgColor: 'transparent',
        padding: 0,
        id: '271ebcdf-9f4a-4cb5-ab14-32c02ee2e3ed',
    },
    {
        icon: 'https://getman.cn/img/apple-touch-icon.png',
        text: 'get/post',
        url: 'https://getman.cn/',
        padding: 0,
        bgColor: 'transparent',
        id: '4183058e-6dc8-4977-8ee0-423bd3d78352',
    },
    {
        url: 'https://www.naiveui.com/zh-CN/os-theme',
        text: 'Naive UI',
        icon: 'https://toolb.cn/favicon/https://www.naiveui.com/zh-CN/os-theme',
        bgColor: '#ffffff',
        padding: 8,
        id: '10bc55e0-1f59-4a8c-8a92-7ccd51acb6d1',
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
        id: '5bd21f0f-7525-40f1-9a07-1f81467c6b99',
    },
    {
        icon: 'https://patchwiki.biligame.com/images/blhx/thumb/e/e9/nlvw0ar5egivnew7tq5oijw4xmf6sbr.png/150px-%E7%A2%A7%E8%93%9D%E8%88%AA%E7%BA%BFicon.png',
        text: '碧蓝航线wiki',
        url: 'https://wiki.biligame.com/blhx/%E9%A6%96%E9%A1%B5',
        padding: 0,
        bgColor: 'transparent',
        id: 'a94619eb-bb0e-4148-af23-836049198a58',
    },
    {
        url: 'https://poe.com/',
        text: 'chatGpt体验版',
        icon: 'https://qph.cf2.poecdn.net/main-thumb-pb-3036-200-rsdgletibxevstyopxokcrczeqrnvjek.jpeg',
        bgColor: '#000000',
        padding: 0,
        id: '1988d8b4-da9f-4284-bc2f-748715f19968',
    },
    {
        url: 'https://socialsisteryi.github.io/bilibili-API-collect/',
        text: '哔哩哔哩接口',
        icon: 'https://toolb.cn/favicon/https://bilibiliapi.github.io/api/',
        bgColor: 'transparent',
        padding: 0,
        id: '8d5226c2-5c5f-4d8b-ba22-c910692c76da',
    },
    {
        url: 'https://www.iloveimg.com/zh-cn/upscale-image',
        text: '图片放大',
        icon: 'https://tse2.mm.bing.net/th/id/OIP.4RSMCCPh_dE4Hhn_TiVCeAHaHa?w=175&h=180&c=7&r=0&o=5&dpr=2&pid=1.7',
        bgColor: 'transparent',
        padding: 0,
        id: '131b9cd5-84b6-41dc-8a87-0a82b3cdebf9',
    },
    {
        id: '92b593f3-9e7c-4142-bb08-f98b4cfd7bce',
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
    },
    {
        url: 'https://lynxjs.org/zh/',
        text: 'Lynx',
        icon: 'https://lf-lynx.tiktok-cdns.com/obj/lynx-artifacts-oss-sg/lynx-website/assets/lynx-light-logo.svg',
        bgColor: '#000000',
        padding: 8,
        id: 'b3c3d7e5-3d7e-4d7e-b7e5-0b7e5b7e5b7e',
    },
]

export type RightClickData = {
    uuid: string
    text: string
    url: string
}

export type shortcutData = {
    id: string | number
    icon: string
    text: string
    url: string
    padding: number
    bgColor: string
    RightClickData?: RightClickData[]
}

type ConfigStore = {
    bgUrl: string
    setBgUrl: (bgUrl: ConfigStore['bgUrl']) => void

    timeTop: number
    setTimeTop: (timeTop: ConfigStore['timeTop']) => void

    searchTop: number
    setSearchTop: (searchTop: ConfigStore['searchTop']) => void
}

type DockData = {
    dock: shortcutData[]
    setDock: (dock: DockData['dock']) => void
    addDock: (dock: DockData['dock']) => void
    deleteDock: (id: DockData['dock'][number]['id']) => void
    moveDock: (id: DockData['dock'][number]['id']) => void
    setItemDock: (
        id: DockData['dock'][number]['id'],
        data: Partial<shortcutData>,
    ) => void

    launchpad: shortcutData[]
    setLaunchpad: (launchpad: DockData['launchpad']) => void
    addLaunchpad: (launchpad: DockData['launchpad']) => void
    deleteLaunchpad: (id: DockData['launchpad'][number]['id']) => void
    moveLaunchpad: (id: DockData['launchpad'][number]['id']) => void
    setItemLaunchpad: (
        id: DockData['launchpad'][number]['id'],
        data: Partial<shortcutData>,
    ) => void
}

export const useUserStore = create(
    persist<ConfigStore & DockData>(
        (set, get) => ({
            bgUrl: '/bg.png',
            setBgUrl(bgUrl) {
                set({ bgUrl })
            },
            timeTop: 0,
            setTimeTop(timeTop) {
                set({ timeTop })
            },
            searchTop: 0,
            setSearchTop(searchTop) {
                set({ searchTop })
            },

            dock: defaultDock,
            setDock(dock) {
                set({ dock })
            },
            addDock(newDock) {
                const dock = [...get().dock, ...newDock]
                set({ dock })
            },
            deleteDock(id) {
                const dock = get().dock.filter((item) => item.id !== id)
                set({ dock })
            },
            moveDock(id) {
                const { dock, addLaunchpad } = get()

                const newDock = dock.concat()

                const index = newDock.findIndex((item) => item.id === id)
                const delDock = newDock.splice(index, 1)
                set({
                    dock: newDock,
                })
                addLaunchpad(delDock)
            },
            setItemDock(id, data) {
                const dock = get().dock.map((item) => {
                    if (item.id === id) {
                        return { ...item, ...data }
                    }
                    return item
                })
                set({ dock })
            },
            launchpad: defaultLaunchpad,
            setLaunchpad(launchpad) {
                set({ launchpad })
            },
            addLaunchpad(launchpad) {
                const newLaunchpad = [...get().launchpad, ...launchpad]
                set({ launchpad: newLaunchpad })
            },
            deleteLaunchpad(id) {
                const launchpad = get().launchpad.filter(
                    (item) => item.id !== id,
                )
                set({ launchpad })
            },
            moveLaunchpad(id) {
                const { launchpad, addDock } = get()

                const newLaunchpad = launchpad.concat()

                const index = newLaunchpad.findIndex((item) => item.id === id)
                const delLaunchpad = newLaunchpad.splice(index, 1)
                set({
                    launchpad: newLaunchpad,
                })
                addDock(delLaunchpad)
            },
            setItemLaunchpad(id, data) {
                const launchpad = get().launchpad.map((item) => {
                    if (item.id === id) {
                        return { ...item, ...data }
                    }
                    return item
                })
                set({ launchpad })
            },
        }),
        {
            name: 'UserStore-store',
        },
    ),
)
