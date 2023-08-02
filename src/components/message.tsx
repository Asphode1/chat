import { MessageProps } from '../context/message-context'
import MessageResponse from './message-res'

export default function Message(msg: MessageProps) {
	return (
		<div>
			<div className="relative z-10 rounded-2xl bg-neutral-200 p-4">
				<p>{msg.msg}</p>
			</div>
			<div>{msg.role === 'Question' ? <MessageResponse msg={msg} /> : null}</div>
		</div>
	)
}
