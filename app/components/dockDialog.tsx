import type { ReactNode } from 'react'
import { Fragment, useEffect, useState } from 'react'

import { useFetcher } from 'react-router'

// install: pnpm dlx shadcn@latest add alert-dialog
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '~/components/ui/alert-dialog'

// install: pnpm dlx shadcn@latest add tabs
import { Tabs, TabsList, TabsTrigger } from '~/components/ui/tabs'

// install: pnpm dlx shadcn@latest add input
import { Input } from '~/components/ui/input'

// install: pnpm dlx shadcn@latest add button
import { Button } from '~/components/ui/button'

import { MiniColor } from '~/components/color'

import { Range } from '~/components/range/range'

import { useDynamicList } from '~/hooks/useHooks'

import type { RightClickData, shortcutData } from '~/hooks/zustand'

/* =========| icon |========= */
import { TiDeleteOutline } from 'react-icons/ti'
import { BiBookAdd } from 'react-icons/bi'

const From = (
	props: Partial<shortcutData> & {
		onSubmit: (data: shortcutData) => void
		onClose?: () => void
	},
) => {
	const { list, add, remove, setItem } = useDynamicList<RightClickData>(
		props?.RightClickData || [],
	)

	const [tab, setTab] = useState<'main' | 'more'>('main')

	const [url, setUrl] = useState<string>(props.url ?? '')
	const [iconUrl, setIconUrl] = useState<string>(props.icon ?? '')

	const fetcher = useFetcher<string>()

	useEffect(() => {
		if (fetcher.data) {
			setIconUrl(fetcher.data)
		}
	}, [fetcher.data])

	return (
		<form
			onSubmit={(event) => {
				event.preventDefault()

				const formData = new FormData(event.currentTarget)

				const url = formData.get('url') as string
				const text = formData.get('text') as string
				const icon = formData.get('icon') as string
				const bgColor = formData.get('bgColor') as string
				const padding = Number(formData.get('padding'))

				const mores = formData.getAll('more') as string[]

				const rightClickData: RightClickData[] = mores.map((item) => {
					const [uuid, text, url] = item.split(';')
					return {
						uuid,
						text,
						url,
					}
				})

				props.onSubmit({
					id: crypto.randomUUID(),
					url,
					text,
					icon,
					bgColor,
					padding,
					RightClickData: rightClickData,
				})

				props.onClose?.()
			}}
		>
			<AlertDialogHeader>
				<AlertDialogTitle>
					{props.id ? '编辑' : '添加'}快捷方式
				</AlertDialogTitle>
				<AlertDialogDescription hidden></AlertDialogDescription>
			</AlertDialogHeader>

			<Tabs
				className="relative min-h-[16rem] *:mt-0"
				value={tab}
				onValueChange={(value) => setTab(value as 'main' | 'more')}
			>
				<TabsList className="origin-left scale-75 text-xs">
					<TabsTrigger value="main">主要</TabsTrigger>
					<TabsTrigger value="more">更多</TabsTrigger>
				</TabsList>

				<div
					hidden={tab !== 'main'}
					className="grid grid-cols-[auto_1fr] auto-rows-[2rem] items-center gap-x-3 gap-y-2"
				>
					<label className="text-sm text-muted-foreground">
						地址
					</label>
					<Input
						required
						name="url"
						className="h-8"
						value={url}
						onChange={(event) => setUrl(event.target.value)}
					/>

					<label className="text-sm text-muted-foreground">
						名称
					</label>
					<Input
						required
						name="text"
						className="h-8"
						defaultValue={props.text}
					/>

					<label className="text-sm text-muted-foreground">
						图标
					</label>
					<div className="flex gap-x-2">
						<Input
							required
							name="icon"
							className="h-8"
							value={iconUrl}
							onChange={(event) => setIconUrl(event.target.value)}
						/>

						<Button
							type="button"
							variant="outline"
							disabled={fetcher.state === 'submitting'}
							className={`px-3 py-1 h-8 relative text-xs`}
							onClick={() => {
								fetcher.submit(
									{
										url,
									},
									{
										method: 'post',
										encType: 'application/json',
										action: '/api/getHTMLiconURL',
									},
								)
							}}
						>
							{fetcher.state === 'submitting'
								? '正在获取'
								: '获取图标'}
						</Button>
					</div>

					<span className="text-sm text-muted-foreground">
						背景颜色
					</span>

					<MiniColor
						name="bgColor"
						className="w-auto justify-between !shadow-none gap-x-3"
						defaultValue={props.bgColor}
					/>

					<span className="text-sm text-muted-foreground">
						图标间距
					</span>

					<div className="relative">
						<Range
							name="padding"
							min={0}
							max={12}
							step={4}
							className="w-auto gap-x-3 !shadow-none"
							defaultValue={props.padding}
						/>

						<p className="absolute text-muted-foreground left-0 w-full grid grid-cols-[1fr_1fr_1fr_auto] text-xs">
							<span>|0</span>
							<span>|4</span>
							<span>|8</span>
							<span>|12</span>
						</p>
					</div>
				</div>
				<div hidden={tab !== 'more'}>
					{list.length > 0 && (
						<div className="mb-2 grid grid-cols-[6rem_1fr_3rem] gap-x-3 gap-y-2">
							<span className="text-xs text-muted-foreground">
								名称
							</span>
							<span className="text-xs text-muted-foreground">
								链接
							</span>
							<span></span>
							{list.map((item) => (
								<Fragment key={item.uuid}>
									{item.text && item.url && (
										<input
											type="text"
											name="more"
											hidden
											value={`${
												item.uuid
											};${item.text.trim()};${item.url.trim()}`}
											readOnly
										/>
									)}

									<Input
										className="h-8"
										value={item.text}
										onChange={(event) =>
											setItem(item.uuid, {
												text: event.target.value,
											})
										}
									/>
									<Input
										className="h-8"
										value={item.url}
										onChange={(event) =>
											setItem(item.uuid, {
												url: event.target.value,
											})
										}
									/>

									<button
										type="button"
										onClick={() => remove(item.uuid)}
										className="flex size-8 items-center justify-center rounded-md border border-input bg-background transition hover:border-red-500 hover:bg-muted/40 hover:text-red-500"
									>
										<TiDeleteOutline />
									</button>
								</Fragment>
							))}
						</div>
					)}

					<Button
						type="button"
						className="h-min py-1.5 pl-2.5 text-xs"
						onClick={() =>
							add({
								text: '',
								url: '',
							})
						}
					>
						<BiBookAdd /> 添加
					</Button>
				</div>
			</Tabs>

			<AlertDialogFooter className="mt-4">
				<AlertDialogCancel onClick={props.onClose}>
					取消
				</AlertDialogCancel>
				<AlertDialogAction type="submit">提交</AlertDialogAction>
			</AlertDialogFooter>
		</form>
	)
}

export const AddDialog = ({
	onSubmit,
}: {
	onSubmit: (data: shortcutData) => void
}): ReactNode => {
	const [open, setOpen] = useState(false)

	return (
		<AlertDialog open={open}>
			<AlertDialogTrigger asChild>
				<button
					className="w-[4rem] cursor-pointer h-[5.375rem]"
					onClick={() => setOpen(true)}
				>
					<img
						className="w-[4rem] bg-black h-[4rem] rounded-lg"
						src="/add.png"
					/>

					<p className="text-xs mt-1 text-white overflow-hidden whitespace-nowrap text-ellipsis">
						添加
					</p>
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<From
					onSubmit={onSubmit}
					onClose={() => setOpen(false)}
				/>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export const SetDockDialog = ({
	onSubmit,
	onClose,
	className,
	children,
	...props
}: shortcutData & {
	className?: string
	children?: ReactNode | ReactNode[]
	onSubmit: (data: shortcutData) => void
	onClose?: () => void
}) => {
	const [open, setOpen] = useState(false)

	return (
		<AlertDialog open={open}>
			<AlertDialogTrigger
				onClick={() => setOpen(true)}
				asChild
			>
				{children}
			</AlertDialogTrigger>
			<AlertDialogContent>
				<From
					onSubmit={onSubmit}
					{...props}
					onClose={() => {
						setOpen(false)
						onClose?.()
					}}
				/>
			</AlertDialogContent>
		</AlertDialog>
	)
}
