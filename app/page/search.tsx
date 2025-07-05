import type { ReactNode, FC, CSSProperties } from 'react'
import { useState } from 'react'

import { InputContainer, InputClose, InputDefault } from '~/page/input'
import { Separator } from '~/components/ui/separator'

import { useFetcher } from 'react-router'

import { useDrag } from '@use-gesture/react'

import { IoIosSearch } from 'react-icons/io'

const openPage = (url: string,blank?:boolean) => {
    if(blank){
        window.open(url, '_blank')
        return
    }
    window.open(url)
}

type Props = {
    style?: CSSProperties
    dragValue?: number
    onChangeDragValue?: (y: number) => void
}
export const Search: FC<Props> = ({
    style,
    dragValue,
    onChangeDragValue,
}): ReactNode => {
    const fetcher = useFetcher<string[]>({
        key: 'bing-sug',
    })

    const bind = useDrag(
        ({ offset: [_, y], altKey }) => {
            if (!altKey) return
            onChangeDragValue?.(y)
        },
        { axis: 'y' },
    )

    const [selectIndex, setSelectIndex] = useState<number>(-1)

    return (
        <div
            style={
                {
                    '--tw-translate-y': `${dragValue}px`,
                    ...style,
                } as CSSProperties
            }
            className="-translate-x-1/2 touch-none py-1 overflow-hidden rounded-lg fixed translate-y-0 top-46 left-1/2 w-1/2 md:min-w-[400px] min-w-[80vw] max-w-[700px] px-1 bg-muted/30 backdrop-blur-sm shadow-lg"
            {...bind()}
        >
            <InputContainer
                className="grid w-full rounded-t-lg grid-cols-[1fr_auto] h-9"
                onChange={(e) => {
                    const formData = new FormData(e.currentTarget)
                    const keyword = formData.get('keyword') as string

                    fetcher.submit(
                        {
                            keyword,
                        },
                        {
                            method: 'post',
                            encType: 'application/json',
                            action: '/api/get-bing-sug',
                        },
                    )
                }}
                onSubmit={(e) => {
                    const formData = new FormData(e.currentTarget)
                    const keyword = formData.get('keyword') as string

                    setSelectIndex(-1)

                    if (keyword === '') {
                        fetcher.submit(
                            {
                                keyword,
                            },
                            {
                                method: 'post',
                                encType: 'application/json',
                                action: '/api/get-bing-sug',
                            },
                        )
                        return
                    }

                    if (selectIndex !== -1) {
                        openPage(
                            `https://www.bing.com/search?q=${
                                fetcher.data![selectIndex]
                            }`,
                        )
                    }

                    openPage(`https://www.bing.com/search?q=${keyword}`)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowUp') {
                        e.preventDefault()
                        setSelectIndex((prev) => (prev - 1 < 0 ? 0 : prev - 1))
                        return
                    }

                    if (e.key === 'ArrowDown') {
                        e.preventDefault()
                        setSelectIndex((prev) =>
                            prev + 1 >= fetcher.data?.length!
                                ? fetcher.data?.length! - 1
                                : prev + 1,
                        )
                        return
                    }
                }}
            >
                <div className="relative">
                    <InputDefault
                        className="w-full h-full pl-2 pr-8 outline-none"
                        type="text"
                        name="keyword"
                    />
                    <InputClose />
                </div>

                <button
                    type="submit"
                    className="mr-2 cursor-pointer"
                >
                    <IoIosSearch />
                </button>
            </InputContainer>

            {fetcher.data?.length! > 0 && (
                <>
                    <Separator />
                    <ol className="select-none space-y-0.5 w-full h-auto pt-1">
                        {fetcher.data?.map((item, index) => (
                            <li
                                key={item}
                                className={`relative cursor-pointer px-2 py-[0.4rem] font-mono rounded-sm text-sm ${
                                    index === selectIndex
                                        ? 'bg-accent/40'
                                        : ' hover:bg-accent/40'
                                }`}
                                onClick={() =>
                                    openPage(
                                        `https://www.bing.com/search?q=${item}`,
                                    )
                                }
                            >
                                {item}
                            </li>
                        ))}
                    </ol>
                </>
            )}
        </div>
    )
}
