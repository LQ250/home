import type { FC, ReactNode, CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'

/* =========| hook |========= */
import type { XOR } from 'ts-xor'
import { calcGridMaxBox } from '~/hooks/getTemplateQuantity'
import { useWindowSize } from '~/hooks/getWindowSize'
import { openPage, useGlobalData } from '~/hooks/globalData'
import type { shortcutData } from '~/hooks/zustand'
import { useUserStore, useShallow } from '~/hooks/zustand'

/* =========| components |========= */
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '~/components/ui/tooltip'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	PopoverClose,
} from '~/components/ui/popover'

import {
	type CarouselApi,
	Carousel,
	CarouselContent,
	CarouselItem,
} from '~/components/ui/carousel'

import { AddDialog, SetDockDialog } from '~/components/dockDialog'

/* =========| 图标 |========= */
import { MdDeleteForever } from 'react-icons/md'
import { RiFileEditLine } from 'react-icons/ri'
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2'
import { FaLink } from 'react-icons/fa6'
import { GoMoveToTop } from 'react-icons/go'

const totalWidth = 64
const totalHeight = 86
const gridSpacing = 20

const DockItem: FC<
	shortcutData & {
		className?: string
		style?: CSSProperties
		onOpen?: (url: string) => void
		onDelete?: (id: shortcutData['id']) => void
		onMove?: (id: shortcutData['id']) => void
		onSubmit?: (data: shortcutData) => void
	}
> = ({
	className,
	style,
	onOpen,
	onDelete,
	onMove,
	onSubmit,
	...props
}): ReactNode => {
	const [TooltipShow, setTooltipShow] = useState(false)
	const [PopoverShow, setPopoverShow] = useState(false)
	return (
		<Tooltip
			open={TooltipShow}
			onOpenChange={(e) => {
				if (PopoverShow) return

				setTooltipShow(e)
			}}
		>
			<TooltipTrigger>
				<Popover open={PopoverShow}>
					<PopoverTrigger asChild>
						<div
							className={`relative cursor-pointer ${className}`}
							onContextMenu={(e) => {
								e.preventDefault()
								setTooltipShow(false)
								setPopoverShow(true)
							}}
							onClick={() => onOpen?.(props.url)}
						>
							<div
								style={{
									backgroundColor: props.bgColor,
									padding: props.padding,
									width: `${totalWidth}px`,
									height: `${totalWidth}px`,
								}}
								className="rounded-lg"
							>
								<img
									src={props.icon}
									draggable={false}
									className="h-full w-full rounded-lg aspect-square"
								/>
							</div>

							<p className="text-xs mt-1 text-white overflow-hidden whitespace-nowrap text-ellipsis">
								{props.text}
							</p>
						</div>
					</PopoverTrigger>
					<PopoverContent
						side="top"
						onInteractOutside={() => setPopoverShow(false)}
						onEscapeKeyDown={() => setPopoverShow(false)}
						className="w-fit min-w-32 border-none bg-black/60 p-1 text-white backdrop-blur *:gap-1 *:text-xs"
					>
						<div
							onClick={() => {
								setPopoverShow(false)
								onOpen?.(props.url)
							}}
							className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent/10 hover:text-white"
						>
							<HiMiniArrowTopRightOnSquare size={14} />
							在新标签页打开
						</div>

						<SetDockDialog
							onSubmit={(e) => {
								setPopoverShow(false)
								onSubmit?.(e)
							}}
							onClose={() => setPopoverShow(false)}
							{...props}
						>
							<PopoverClose className="flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent/10 hover:text-white">
								<RiFileEditLine size={14} />
								编辑
							</PopoverClose>
						</SetDockDialog>

						<div
							onClick={() => onDelete?.(props.id)}
							className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent/10 hover:text-white"
						>
							<MdDeleteForever size={14} /> 删除
						</div>

						<div
							onClick={() => onMove?.(props.id)}
							className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent/10 hover:text-white"
						>
							<GoMoveToTop
								className="rotate-180"
								size={14}
							/>{' '}
							移动到dock
						</div>

						{props.RightClickData?.map((item) => (
							<div
								key={item.uuid}
								onClick={() => {
									setPopoverShow(false)
									onOpen?.(item.url)
								}}
								className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent/10 hover:text-white"
							>
								<FaLink size={14} />
								{item.text}
							</div>
						))}
					</PopoverContent>
				</Popover>
			</TooltipTrigger>
			<TooltipContent className="bg-black/60 text-xs border-0 backdrop-blur text-white">
				<p>{props.text}</p>
			</TooltipContent>
		</Tooltip>
	)
}

type DockData = XOR<
	{
		id: string
		Reander: () => ReactNode
	},
	shortcutData
>

export const Launchpad = (): ReactNode => {
	/* =========| launchpad |========= */
	const {
		launchpad,
		addLaunchpad,
		deleteLaunchpad,
		moveLaunchpad,
		setItemLaunchpad,
	} = useUserStore(
		useShallow((state) => ({
			launchpad: state.launchpad,
			addLaunchpad: state.addLaunchpad,
			deleteLaunchpad: state.deleteLaunchpad,
			moveLaunchpad: state.moveLaunchpad,
			setItemLaunchpad: state.setItemLaunchpad,
		})),
	)

	const showLaunchpad = useGlobalData((start) => start.showLaunchpad)

	/* =========| 网格布局 |========= */
	const ref = useRef<HTMLDivElement | null>(null)
	const size = useWindowSize()

	const [gridData, setGridData] = useState<DockData[][]>([])
	const [gridStyle, setGridStyle] = useState<{
		gridTemplateColumns: string
		gridTemplateRows: string
		gridGap: string
	}>({
		gridTemplateColumns: '',
		gridTemplateRows: '',
		gridGap: '',
	})

	useEffect(() => {
		if (!ref.current) return

		const { width, height } = ref.current.getBoundingClientRect()
		const px = Math.max(size.width, size.height) * 0.2

		const gridCount = calcGridMaxBox(width - px, totalWidth, gridSpacing)
		const gridRow = calcGridMaxBox(height, totalHeight, gridSpacing)

		const data = [
			...launchpad,
			{
				id: 'AddDialog',
				Reander: (): ReactNode => (
					<AddDialog onSubmit={(data) => addLaunchpad([data])} />
				),
			},
		]

		const capacity = gridCount * gridRow

		const gridData: DockData[][] =
			capacity > data.length
				? [data]
				: data.reduce<DockData[][]>((acc, curr, index) => {
						if (index % capacity === 0) {
							acc.push([])
						}
						acc.at(-1)?.push(curr)
						return acc
				  }, [])

		setGridData(gridData)

		const style = {
			gridTemplateColumns: `repeat(${gridCount}, ${totalWidth}px)`,
			gridTemplateRows: `repeat(${gridRow}, ${totalHeight}px)`,
			gridGap: `${gridSpacing}px`,
		}

		setGridStyle(style)
	}, [size, launchpad])

	/* =========| 轮播 |========= */

	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const [count, setCount] = useState(0)

	useEffect(() => {
		if (!api) {
			return
		}

		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap())

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap())
		})
	}, [api])

	return (
		<div
			className={`fixed inset-0 backdrop-blur-2xl transition-[scale,visibility,opacity]  duration-300 ${
				showLaunchpad
					? 'scale-100 opacity-100 visible'
					: 'scale-105 opacity-0 invisible'
			}`}
		>
			<div className="h-[calc(100vh-140px)] pt-16 relative">
				{/* <div className="h-16 absolute w-full left-0 flex justify-center items-center top-0">
                    <input
                        required
                        className="ring opacity-70 focus-visible:opacity-100 rounded outline-none h-6 backdrop-blur-sm text-xs text-white p-1.5 "
                        placeholder="搜索"
                    />
                </div> */}

				<Carousel
					setApi={setApi}
					ref={ref}
					className="w-full h-full *:bg-transparent"
				>
					<CarouselContent
						carouselClassName="h-full w-full select-none rounded bg-muted"
						className="ml-0 h-full w-full select-none"
					>
						{gridData.map((item, index) => (
							<CarouselItem
								key={index}
								className="grid pl-0 justify-center px-[10vmax]"
								style={gridStyle}
							>
								{item.map((item) =>
									item.Reander ? (
										<item.Reander key={item.id} />
									) : (
										<DockItem
											key={item.id}
											{...item}
											onOpen={openPage}
											onDelete={deleteLaunchpad}
											onMove={moveLaunchpad}
											onSubmit={(data) => {
												setItemLaunchpad(item.id, data)
											}}
										/>
									),
								)}
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>

				<div className="flex justify-center absolute items-center left-0 top-full w-full mt-2 h-2 gap-x-2">
					{Array.from({
						length: count,
					}).map((_, index) => (
						<button
							onClick={() => {
								api?.scrollTo(index)
							}}
							key={index}
							className={`bg-white ${
								index === current ? 'opacity-100' : 'opacity-30'
							} size-2 rounded-2xl`}
						></button>
					))}
				</div>
			</div>
		</div>
	)
}
