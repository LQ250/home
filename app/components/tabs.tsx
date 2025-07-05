import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import Radio from '~/components/radio'
import { Button } from '~/components/ui/button'

export default function TabsComponent() {
	return (
		<Tabs
			defaultValue="背景"
			orientation="vertical"
			className="w-full flex-row"
		>
			<TabsList className="flex-col h-fit rounded-none border-l bg-transparent p-0">
				<TabsTrigger
					value="背景"
					className="data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
				>
					背景
				</TabsTrigger>
				<TabsTrigger
					value="dock"
					className="data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
				>
					dock
				</TabsTrigger>
			</TabsList>
			<div className="grow rounded-md border text-start">
				<TabsContent value="背景">
					<Radio />
				</TabsContent>
				<TabsContent
					value="dock"
					className="p-4 flex gap-3"
				>
					<Button>导出数据</Button>
					<Button>导入数据</Button>
				</TabsContent>
			</div>
		</Tabs>
	)
}
