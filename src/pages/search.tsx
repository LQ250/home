import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { X, Search as SearchIcon, ArrowUpRight } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { DraggableY } from '@/components/DraggableY'

const SearchFun = (value: string) => {
    if (!value) {
        toast.error('请输入搜索内容')
        return
    }

    window.open(`https://www.bing.com/search?q=${value}`)
}

export const Search = (): ReactNode => {
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

        fetch(`http://127.0.0.1:3000/api/sug/${keyword.trim()}`, {
            signal: abort.signal,
            mode: 'cors',
        })
            .then((res) => res.json())
            .then(setSug)
    }

    return (
        <DraggableY className='!top-62 !w-full' initialY={0}>
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
                    <button type='submit' className='mr-3 cursor-pointer'>
                        <SearchIcon size={20} />
                    </button>
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
