import { MessageProps } from '../App'

export default function Message({ msg: chatmessage }: MessageProps) {
	return (
		<div className="rounded-2xl bg-neutral-200 p-4">
			<p>{chatmessage}</p>
		</div>
	)
}
