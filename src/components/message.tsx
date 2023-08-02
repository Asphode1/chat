import { MessageProps } from '../App'

export default function Message({ msg, color }: MessageProps) {
	const col = `#${color}`
	return (
		<div className="relative rounded-2xl bg-neutral-200 p-4">
			<p>{msg}</p>
			<div
				className="absolute top-1/2 right-6 h-4 w-4 translate-y-[-50%] rounded-full"
				style={{ backgroundColor: col }}
			></div>
		</div>
	)
}
