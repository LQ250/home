/**
 * @file search.tsx
 * @description 搜索栏组件, 集成了搜索和建议功能
 * @author LQ250
 * @date 2025-08-20 22:38:40
 */
/* =========| 图标 |========= */
import { ArrowUpRight, Search as SearchIcon, X } from 'lucide-react'

/* =========| 基础 |========= */
import type { ReactNode } from 'react'
import { useRef, useState } from 'react'

/* =========| jotai |========= */
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
/* =========| sonner |========= */
import { toast } from 'sonner'

/* =========| utils |========= */
import { cn } from '@/lib/utils'

// =========| components |========= //
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'

import { DraggableY } from '@/components/DraggableY'

const SearchOffsetYAtom = atomWithStorage<number>('SearchOffsetY', 0)

const SearchFun = (value: string) => {
    if (!value) {
        toast.error('请输入搜索内容')
        return
    }

    window.open(`https://www.bing.com/search?q=${value}`)
}

export const Search = (): ReactNode => {
    const [searchOffsetY, setSearchOffsetY] = useAtom(SearchOffsetYAtom)
    const [value, setValue] = useState('')
    const [sug, setSug] = useState<string[]>([])

    const abortController = useRef<AbortController>(null)
    const getSug = async (keyword: string) => {
        abortController.current?.abort()

        if (!keyword.trim()) {
            setSug([])
            abortController.current = null
            return
        }

        const abort = new AbortController()
        abortController.current = abort

        fetch(
            `${import.meta.env.VITE_API_BASE_URL || '/api'}/sug/${keyword.trim()}`,
            {
                signal: abort.signal,
                mode: 'cors',
            }
        )
            .then((res) => res.json())
            .then(setSug)
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <DraggableY
            className={cn('!top-62 !w-full')}
            initialY={searchOffsetY}
            onDragEnd={(y) => setSearchOffsetY(y)}
        >
            <div className='drag-handle bg-muted/30 relative left-1/2 h-12 w-full max-w-[700px] min-w-[80vw] -translate-x-1/2 rounded-md shadow-lg backdrop-blur-sm md:min-w-[400px]'>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        SearchFun(value)
                    }}
                    className='flex h-full w-full items-center gap-2'
                >
                    <input
                        type='text'
                        className='peer flex-1 pl-3 outline-none'
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value)
                            getSug(e.target.value)
                        }}
                    />
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                type='button'
                                className='cursor-pointer'
                                onClick={() => {
                                    setValue('')
                                    setSug([])
                                }}
                            >
                                <X size={20} />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>清空</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                type='submit'
                                className='mr-3 cursor-pointer'
                            >
                                <SearchIcon size={20} />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>搜索</p>
                        </TooltipContent>
                    </Tooltip>
                </form>
            </div>

            <ol
                className={cn(
                    'bg-muted/30 relative left-1/2 h-auto w-full max-w-[700px] min-w-[80vw] -translate-x-1/2 translate-y-4 rounded-md shadow-lg backdrop-blur-sm md:min-w-[400px]',
                    {
                        'p-2': sug.length > 0,
                    }
                )}
            >
                {sug.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => {
                            setValue(item)
                        }}
                        className='hover:bg-accent/40 flex cursor-pointer items-center gap-x-2 rounded-sm px-1 py-1 font-mono text-sm transition-all hover:px-2'
                    >
                        <button className='hover:bg-accent/40 flex size-4 cursor-pointer items-center justify-center rounded'>
                            <ArrowUpRight size={12} />
                        </button>
                        <p
                            className='flex-1'
                            onClick={() => {
                                SearchFun(item)
                            }}
                        >
                            {item}
                        </p>
                    </li>
                ))}
            </ol>
        </DraggableY>
    )
}
