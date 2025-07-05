import { XIcon } from 'lucide-react'

import { useFileUpload } from '~/hooks/use-file-upload'
import { Button } from '~/components/ui/button'

export default function Component({
	defaultUrl,
	onChangUrl,
}: {
	defaultUrl?: string
	onChangUrl: (url: string) => void
}) {
	const [{ files }, { removeFile, openFileDialog, getInputProps }] =
		useFileUpload({
			accept: 'image/*',
		})

	const previewUrl = files[0]?.preview || null

	return (
		<div className="flex flex-col items-center gap-2">
			<div className="relative inline-flex">
				<Button
					variant="outline"
					className="relative aspect-video cursor-pointer h-32 mt-2 overflow-hidden p-0 shadow-none"
					onClick={openFileDialog}
					aria-label={previewUrl ? 'Change image' : 'Upload image'}
				>
					{previewUrl ? (
						<img
							className="size-full object-cover"
							src={previewUrl}
							alt="Preview of uploaded image"
							width={64}
							height={64}
							style={{ objectFit: 'cover' }}
						/>
					) : (
						<img
							src={defaultUrl}
							className="filter hover:brightness-60 transition duration-200"
							alt=""
						/>
					)}
				</Button>
				{previewUrl && (
					<Button
						onClick={() => removeFile(files[0]?.id)}
						size="icon"
						className="border-background focus-visible:border-background absolute -top-2 -right-2 size-6 rounded-full border-2 shadow-none"
						aria-label="Remove image"
					>
						<XIcon className="size-3.5" />
					</Button>
				)}
				<input
					{...getInputProps()}
					className="sr-only"
					aria-label="Upload image file"
					tabIndex={-1}
				/>
			</div>

			<div className="space-x-3">
				<Button
					size={'sm'}
					variant="outline"
					onClick={() => {
						removeFile(files[0]?.id)
						onChangUrl?.('')
					}}
				>
					重置
				</Button>
				<Button
					onClick={() => {
						const file = files[0].file as File

						const reader = new FileReader()
						reader.readAsDataURL(file)
						reader.onload = () => {
							const base64 = reader.result as string
							onChangUrl?.(base64)
							reader.abort()
						}
					}}
					size={'sm'}
				>
					确认
				</Button>
			</div>
		</div>
	)
}
