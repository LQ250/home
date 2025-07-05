import type { ReactNode, FC } from 'react'
import { memo, useState } from 'react'
import type { XOR } from 'ts-xor'
/* =========| hook |========= */
import { useWindowSize } from '~/hooks/getWindowSize'
import { calcGridMaxBox } from '~/hooks/getTemplateQuantity'
import { openPage } from '~/hooks/globalData'
import type { shortcutData } from '~/hooks/zustand'
import { useUserStore } from '~/hooks/zustand'
import { useGlobalData, useShallow } from '~/hooks/globalData'

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
} from '~/components/ui/popover'

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from '~/components/ui/carousel'

import { SetDockDialog } from '~/components/dockDialog'
import { ConfigDialog } from '~/page/configDialog'

/* =========| 图标 |========= */
import { MdDeleteForever } from 'react-icons/md'
import { RiFileEditLine } from 'react-icons/ri'
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2'
import { FaLink } from 'react-icons/fa6'
import { GoMoveToTop } from 'react-icons/go'

const totalLength = 56
const gridSpacing = 12

const DockItem: FC<
	shortcutData & {
		className?: string
		style?: React.CSSProperties
		onOpen?: (url: string, blank:boolean) => void
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
							className={`relative rounded-lg cursor-pointer ${className}`}
							onContextMenu={(e) => {
								e.preventDefault()
								setTooltipShow(false)
								setPopoverShow(true)
							}}
							onClick={() => onOpen?.(props.url, false)}
							style={{
								backgroundColor: props.bgColor,
								padding: `${props.padding}px`,
								width: `${totalLength}px`,
								height: `${totalLength}px`,
							}}
						>
							<img
								src={props.icon}
								draggable={false}
								className="w-full rounded-lg aspect-square"
							/>
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
								onOpen?.(props.url, true)
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
							<div className="flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent/10 hover:text-white">
								<RiFileEditLine size={14} />
								编辑
							</div>
						</SetDockDialog>

						<div
							onClick={() => onMove?.(props.id)}
							className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent/10 hover:text-white"
						>
							<GoMoveToTop size={14} /> 移动到启动台
						</div>

						<div
							onClick={() => onDelete?.(props.id)}
							className="flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent/10 hover:text-white"
						>
							<MdDeleteForever size={14} /> 删除
						</div>

						{props.RightClickData?.map((item) => (
							<div
								key={item.uuid}
								onClick={() => onOpen?.(item.url, false)}
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

export const Dock = memo((): ReactNode => {
	const { dock, moveDock, deleteDock, setItemDock } = useUserStore(
		useShallow((state) => ({
			dock: state.dock,
			moveDock: state.moveDock,
			deleteDock: state.deleteDock,
			setItemDock: state.setItemDock,
		})),
	)

	const dockData: DockData[] = [
		...dock,
		// TODO: 添加一个设置按钮
		{
			id: '123',
			Reander: (): ReactNode => <ConfigDialog />,
		},
	]

	const { toggleShowLaunchpad, showLaunchpad } = useGlobalData(
		useShallow((state) => ({
			toggleShowLaunchpad: state.toggleShowLaunchpad,
			showLaunchpad: state.showLaunchpad,
		})),
	)

	const size = useWindowSize()

	const col = calcGridMaxBox(
		size.width * 0.8 - 16 * 3 - totalLength,
		totalLength,
		gridSpacing,
	)

	const dataArr = col
		? dockData.reduce<DockData[][]>((acc, curr, index) => {
				if (index % col === 0) {
					acc.push([])
				}
				acc.at(-1)?.push(curr)
				return acc
		  }, [])
		: [dockData]

	const width: number =
		(dataArr.length > 1
			? col * totalLength + (col - 1) * gridSpacing
			: dataArr[0]?.length * totalLength +
			  (dataArr[0]?.length - 1) * gridSpacing) + 16

	return (
		<div
			className={`fixed flex w-fit touch-none bottom-6 overflow-hidden select-none max-w-4/5 left-1/2 -translate-x-1/2 backdrop-saturate-200 py-2 rounded-2xl backdrop-blur-2xl`}
		>
			<Carousel
				style={{
					width,
				}}
				className="h-full relative *:bg-transparent"
			>
				<CarouselContent
					carouselClassName="h-full w-full select-none rounded bg-muted"
					className="ml-0 h-full w-full select-none"
				>
					{dataArr.map((data, index) => (
						<CarouselItem
							key={index}
							className="flex bg-transparent px-2 gap-x-3"
						>
							{data.map((item) =>
								item.Reander ? (
									<item.Reander key={item.id} />
								) : (
									<DockItem
										key={item.id}
										{...item}
										onOpen={openPage}
										onDelete={deleteDock}
										onMove={moveDock}
										onSubmit={(data) => {
											setItemDock(item.id, data)
										}}
									/>
								),
							)}
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>

			<span
				style={{
					height: totalLength,
				}}
				className="h-full min-w-[1px] bg-muted-foreground ml-1 mr-3"
			></span>
			<button
				style={{
					minWidth: totalLength,
					height: totalLength,
				}}
				onClick={() => toggleShowLaunchpad()}
				className="rounded-lg mr-2 cursor-pointer bg-black flex items-center justify-center"
			>
				<img
					className={`transition-transform w-full h-full ${
						showLaunchpad ? 'rotate-180' : 'rotate-0'
					}`}
					src="/top.png"
					alt=""
				/>
			</button>
		</div>
	)
})
