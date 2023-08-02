import { FormEvent, useRef } from 'react'
import { MessageProps } from '../context/message-context'
import { useRole } from '../context/role-context'
import supabase from '../supabase/supabase'

export default function MessageResponse({ msg }: { msg: MessageProps }) {
	const inputRef = useRef<HTMLInputElement>(null)

	const { role } = useRole()

	const handleAnswer = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (inputRef.current) {
			inputRef.current.blur()
			const newMsg: MessageProps = { ...msg, answer: inputRef.current.value, answered: true }
			await supabase.from('second_chat').update({ answer: inputRef.current.value, answered: true }).eq('id', newMsg.id)
		}
	}

	return (
		<div className="w-full translate-y-[-1.5rem] rounded-b-xl bg-neutral-300 p-2 pt-8">
			<form onSubmit={handleAnswer} className="flex flex-row items-center justify-center gap-4">
				<input
					type="texa"
					className="flex-1 rounded-xl p-2"
					ref={inputRef}
					disabled={role === 'Question' ? true : false}
					defaultValue={msg.answered ? msg.answer! : ''}
				/>
				<button
					className="rounded bg-green-200 p-2 disabled:bg-gray-400 disabled:text-neutral-500"
					type="submit"
					disabled={role === 'Question' ? true : false}
				>
					Gửi
				</button>
			</form>
		</div>
	)
}
