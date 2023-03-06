import { MessageProps } from '../App'

export default function Message({ userid, chatmessage }: MessageProps) {
  return (
    <div>
      <div>
        <p className="text-sm text-neutral-500">{userid}</p>
      </div>
      <div className="rounded-2xl bg-neutral-200 p-4">
        <p>{chatmessage}</p>
      </div>
    </div>
  )
}
