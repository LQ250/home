/**
 * @file radio.tsx
 * @description 设置-背景-实际实现
 * @author LQ250
 * @date 2025-05-17 16:43:48
 */

import { useId } from 'react'
import { set } from 'idb-keyval'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Button } from '~/components/ui/button'
import ImgUpload from './imgUpload'
import { useUserStore, useShallow, defaultBgUrl } from '~/hooks/zustand'

export default function Component() {
	const radioId = useId()
	const inputId = useId()

	const { bgType, setBgType, bgUrl, setBgUrl } = useUserStore(
		useShallow((e) => ({
			bgType: e.bgType,
			setBgType: e.setBgType,
			bgUrl: e.bgUrl,
			setBgUrl: e.setBgUrl,
		})),
	)

	return (
		<RadioGroup
			className="gap-6 p-4"
			value={bgType}
			onValueChange={setBgType}
		>
			<div>
				<div className="flex items-start gap-2">
					<RadioGroupItem
						value="external"
						id={`${radioId}-1`}
						aria-describedby={`${radioId}-1-description`}
						aria-controls={inputId}
					/>
					<div className="grow">
						<Label htmlFor={`${radioId}-1`}>使用网络图片</Label>
						{/* Expandable field */}
						<div
							role="region"
							id={inputId}
							aria-labelledby={`${radioId}-1`}
							className="mt-2 data-[state=collapsed]:hidden data-[state=expanded]:block"
							data-state={
								bgType === 'external' ? 'expanded' : 'collapsed'
							}
						>
							<p
								id={`${radioId}-1-description`}
								className="text-muted-foreground text-xs"
							>
								在这里输入网络图片的url
							</p>
							<div className="pointer-events-none -m-2 overflow-hidden p-2">
								<form
									onSubmit={(e) => e.preventDefault()}
									className="pointer-events-auto flex gap-x-2 mt-1"
								>
									<Input
										type="text"
										className="text-xs"
										id="radio-05-additional-info"
										placeholder="http://..."
										aria-label="Additional Information"
									/>

									<Button type="submit">确认</Button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="flex items-start gap-2">
				<RadioGroupItem
					value="local"
					id={`${radioId}-2`}
					aria-describedby={`${radioId}-2-description`}
				/>
				<div className="grid grow gap-2">
					<Label htmlFor={`${radioId}-2`}>使用本地图片</Label>
					<main
						data-state={
							bgType === 'local' ? 'expanded' : 'collapsed'
						}
						className="mt-2 data-[state=collapsed]:hidden data-[state=expanded]:block"
					>
						<p
							id={`${radioId}-2-description`}
							className="text-muted-foreground text-xs"
						>
							点击选择本地图片
						</p>

						<ImgUpload
							onChangUrl={(base64) => {
								if (base64 === '') {
									set('BgUrlBase64', '')
									setBgUrl(defaultBgUrl)

									return
								}

								set('BgUrlBase64', base64).then(() => {
									setBgUrl(base64)
								})
							}}
							defaultUrl={bgUrl}
						/>
					</main>
				</div>
			</div>
		</RadioGroup>
	)
}
