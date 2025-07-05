/**
 * @file config.Dialog.tsx
 * @description 配置对话框
 * @author LQ250
 * @date 2025-05-17 13:54:18
 */

import type { ReactNode } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog'
import TabsComponent from '~/components/tabs'

export const ConfigDialog = (): ReactNode => {
	return (
		<Dialog>
			<DialogTrigger>
				<div
					style={{
						width: `${56}px`,
						height: `${56}px`,
					}}
					className="cursor-pointer"
				>
					<img
						className="w-full h-full rounded-lg"
						src="/config.png"
						alt=""
					/>
				</div>
			</DialogTrigger>
			<DialogContent className="min-h-[400px] min-w-[600px] gap-y-4 grid-rows-[auto_1fr]">
				<DialogHeader>
					<DialogTitle>config</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<TabsComponent />
			</DialogContent>
		</Dialog>
	)
}
