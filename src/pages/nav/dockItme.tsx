/**
 * @file dockItme.tsx
 * @description dock 栏的添加修改等操作
 * @author LQ250
 * @date 2025-08-23 18:18:33
 */
import { CirclePlus, Send, X } from 'lucide-react'

import type { FC, ReactNode } from 'react'
import { useState } from 'react'

import { useSetAtom } from 'jotai'
/* =========| sonner |========= */
import { toast } from 'sonner'

/* =========| components |========= */
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Color, ColorItem, defaultColors } from '@/components/color'

import { LaunchpadDataAtom } from './launchpad'
import type { RightClickData, shortcutData } from './types'

const validateEmptyData: {
    key: keyof shortcutData
    nullValue: shortcutData[keyof shortcutData]
    tip: string
}[] = [
    {
        key: 'url',
        nullValue: '',
        tip: '请输入网址',
    },
    {
        key: 'text',
        nullValue: '',
        tip: '请输入名称',
    },
    {
        key: 'icon',
        nullValue: '',
        tip: '请输入图标网址',
    },
]

const More: FC<{
    data: RightClickData[]
    onChange: (newValue: RightClickData[]) => void
}> = ({ data, onChange }) => {
    const [Editor, setEditor] = useState<boolean>(false)

    const setListItem = (
        uuid: string,
        newValue: Partial<RightClickData>,
        operate: 'add' | 'set' | 'delete'
    ) => {
        let newData = [...data]

        if (operate === 'set') {
            newData = newData.map((item) =>
                item.uuid === uuid ? { ...item, ...newValue } : item
            )
        }

        if (operate === 'delete') {
            newData = newData.filter((item) => item.uuid !== uuid)
        }

        if (operate === 'add') {
            if (!newValue?.text || !newValue?.url)
                throw new Error('text or url is required')

            newData = [
                ...newData,
                {
                    ...newValue,
                    uuid,
                } as RightClickData,
            ]
        }

        onChange(newData)
    }

    return (
        <>
            {Editor || data.length > 0 ? (
                <p className='text-muted-foreground mb-2 grid grid-cols-[2fr_7fr]'>
                    <span>名称</span>
                    <span>链接</span>
                </p>
            ) : null}
            <div className='space-y-2'>
                {data.map((item) => (
                    <div
                        className='grid grid-cols-[3fr_7fr_auto] gap-2'
                        key={item.uuid}
                    >
                        <Input
                            value={item.text}
                            onChange={(e) =>
                                setListItem(
                                    item.uuid,
                                    { text: e.target.value },
                                    'set'
                                )
                            }
                            type='text'
                            name='text'
                        />
                        <Input
                            value={item.url}
                            onChange={(e) =>
                                setListItem(
                                    item.uuid,
                                    { url: e.target.value },
                                    'set'
                                )
                            }
                            required
                            type='url'
                            name='url'
                        />
                        <Button
                            variant='outline'
                            type='button'
                            onClick={() => setListItem(item.uuid, {}, 'delete')}
                        >
                            <X />
                        </Button>
                    </div>
                ))}
            </div>
            {Editor && (
                <form
                    className='grid grid-cols-[3fr_7fr_auto_auto] gap-2'
                    onSubmit={(e) => {
                        e.preventDefault()
                        setEditor(false)
                        const formData = new FormData(e.currentTarget)
                        const text = formData.get('text')!.toString()
                        const url = formData.get('url')!.toString()
                        setListItem(crypto.randomUUID(), { text, url }, 'add')
                    }}
                >
                    <Input required type='text' name='text' />
                    <Input required type='url' name='url' />
                    <Button
                        variant='outline'
                        type='button'
                        onClick={() => setEditor(false)}
                    >
                        <X />
                    </Button>
                    <Button type='submit'>
                        <Send />
                    </Button>
                </form>
            )}
            <Button
                className='mt-3'
                size={'sm'}
                onClick={() => setEditor(true)}
            >
                <CirclePlus /> add
            </Button>
        </>
    )
}

const useDockData = (
    defaultValue?: shortcutData
): {
    data: shortcutData
    setDataValue: <T extends keyof shortcutData>(
        key: T,
        value: shortcutData[T]
    ) => void
    validateData: () => string | shortcutData
    clearData: () => void
} => {
    const [data, setData] = useState<shortcutData>(
        defaultValue ?? {
            id: crypto.randomUUID(),
            icon: '',
            text: '',
            url: '',
            padding: 0,
            bgColor: defaultColors[0],
            RightClickData: [],
        }
    )

    const setDataValue = <T extends keyof shortcutData>(
        key: T,
        value: shortcutData[T]
    ) => {
        setData((prev) => ({ ...prev, [key]: value }))
    }

    const validateData = (): string | shortcutData => {
        for (let index = 0; index < validateEmptyData.length; index++) {
            const element = validateEmptyData[index]
            if (Object.is(data[element.key], element.nullValue)) {
                return element.tip
            }
        }
        return data
    }

    const clearData = (): void => {
        setData({
            id: crypto.randomUUID(),
            icon: '',
            text: '',
            url: '',
            padding: 0,
            bgColor: defaultColors[0],
            RightClickData: [],
        })
    }

    return {
        data,
        setDataValue,
        validateData,
        clearData,
    }
}

export const DockAdd = ({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}): ReactNode => {
    const { data, setDataValue, validateData, clearData } = useDockData()

    const [open, setOpen] = useState(false)

    const setDockData = useSetAtom(LaunchpadDataAtom)

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger className={className}>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className=''>
                <AlertDialogHeader>
                    <AlertDialogTitle>添加快捷方式</AlertDialogTitle>
                    <AlertDialogDescription>
                        请输入快捷方式的名称和 URL
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <Tabs defaultValue='main'>
                    <TabsList>
                        <TabsTrigger value='main'>主要</TabsTrigger>
                        <TabsTrigger value='more'>更多</TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value='main'
                        className='grid grid-cols-[auto_1fr] grid-rows-5 items-center gap-3'
                    >
                        <label>
                            网址 <span className='text-red-500'>*</span>
                        </label>
                        <Input
                            name='url'
                            value={data.url}
                            onChange={(e) =>
                                setDataValue('url', e.target.value)
                            }
                        />
                        <label>
                            名称 <span className='text-red-500'>*</span>
                        </label>
                        <Input
                            name='text'
                            value={data.text}
                            onChange={(e) =>
                                setDataValue('text', e.target.value)
                            }
                        />
                        <label>
                            图标网址 <span className='text-red-500'>*</span>
                        </label>
                        <Input
                            name='icon'
                            value={data.icon}
                            onChange={(e) =>
                                setDataValue('icon', e.target.value)
                            }
                        />
                        <label>图标背景</label>
                        <Color
                            defaultValue={defaultColors[0]}
                            onValueChange={(value) => console.log(value)}
                        >
                            {defaultColors.map((color) => (
                                <ColorItem key={color} value={color} />
                            ))}
                        </Color>
                        <label>图标边距</label>
                        <div className='grid grid-rows-2'>
                            <Slider isThumb={false} step={4} max={12} min={0} />
                            <div className='flex justify-between text-xs select-none'>
                                <span>| 0</span>
                                <span>| 4</span>
                                <span>| 8</span>
                                <span>| 12</span>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value='more'>
                        <More
                            data={data.RightClickData}
                            onChange={(newValue) => {
                                setDataValue('RightClickData', newValue)
                            }}
                        />
                    </TabsContent>
                </Tabs>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            clearData()
                        }}
                    >
                        取消
                    </AlertDialogCancel>
                    <Button
                        onClick={() => {
                            const data = validateData()

                            if (typeof data === 'string') {
                                toast.error(data)
                                return
                            }

                            setDockData((prev) => [...prev, data])
                            clearData()
                            setOpen(false)
                        }}
                    >
                        提交
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export const DockSet: FC<{
    children: ReactNode
    value: shortcutData
    onChange: (newValue: shortcutData) => void
}> = ({ children, value, onChange }): ReactNode => {
    const { data, setDataValue, validateData, clearData } = useDockData(value)

    const [open, setOpen] = useState(false)

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent className=''>
                <AlertDialogHeader>
                    <AlertDialogTitle>添加快捷方式</AlertDialogTitle>
                    <AlertDialogDescription>
                        请输入快捷方式的名称和 URL
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <Tabs defaultValue='main'>
                    <TabsList>
                        <TabsTrigger value='main'>主要</TabsTrigger>
                        <TabsTrigger value='more'>更多</TabsTrigger>
                    </TabsList>
                    <TabsContent
                        value='main'
                        className='grid grid-cols-[auto_1fr] grid-rows-5 items-center gap-3'
                    >
                        <label>
                            网址 <span className='text-red-500'>*</span>
                        </label>
                        <Input
                            name='url'
                            value={data.url}
                            onChange={(e) =>
                                setDataValue('url', e.target.value)
                            }
                        />
                        <label>
                            名称 <span className='text-red-500'>*</span>
                        </label>
                        <Input
                            name='text'
                            value={data.text}
                            onChange={(e) =>
                                setDataValue('text', e.target.value)
                            }
                        />
                        <label>
                            图标网址 <span className='text-red-500'>*</span>
                        </label>
                        <Input
                            name='icon'
                            value={data.icon}
                            onChange={(e) =>
                                setDataValue('icon', e.target.value)
                            }
                        />
                        <label>图标背景</label>
                        <Color
                            defaultValue={defaultColors[0]}
                            onValueChange={(value) => console.log(value)}
                        >
                            {defaultColors.map((color) => (
                                <ColorItem key={color} value={color} />
                            ))}
                        </Color>
                        <label>图标边距</label>
                        <div className='grid grid-rows-2'>
                            <Slider isThumb={false} step={4} max={12} min={0} />
                            <div className='flex justify-between text-xs select-none'>
                                <span>| 0</span>
                                <span>| 4</span>
                                <span>| 8</span>
                                <span>| 12</span>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value='more'>
                        <More
                            data={data.RightClickData}
                            onChange={(newValue) => {
                                setDataValue('RightClickData', newValue)
                            }}
                        />
                    </TabsContent>
                </Tabs>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            clearData()
                        }}
                    >
                        取消
                    </AlertDialogCancel>
                    <Button
                        onClick={() => {
                            const data = validateData()

                            if (typeof data === 'string') {
                                toast.error(data)
                                return
                            }

                            onChange(data)
                        }}
                    >
                        提交
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
