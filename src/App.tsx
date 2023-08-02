import { FormEvent, useEffect, useRef } from 'react'
import Message from './components/message'
import { MessageProps, useChat } from './context/message-context'
import { useRole } from './context/role-context'
import supabase from './supabase/supabase'

function App() {
	const messRef = useRef<HTMLInputElement>(null)
	const sendBtn = useRef<HTMLButtonElement>(null)

	const { role } = useRole()

	const sendMessage = async (msg: string) =>
		await supabase
			.from('second_chat')
			.insert({ msg, role: role === 'Question' ? role : 'Chat', answered: role === 'Question' ? false : null })

	const handleSend = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (messRef.current && messRef.current.value.length) {
			sendMessage(messRef.current.value).catch((err) => console.log(err))
			messRef.current.value = ''
		}
	}
	const { chat, dispatch } = useChat()

	useEffect(() => {
		const channel = supabase.channel('db-chat', { config: { broadcast: { self: true } } })
		channel
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'second_chat',
				},
				(payload) => {
					dispatch({ type: 'insert', payload: [payload.new as MessageProps] })
				}
			)
			.on(
				'postgres_changes',
				{
					event: 'UPDATE',
					schema: 'public',
					table: 'second_chat',
				},
				(payload) => {
					dispatch({ type: 'update', payload: [payload.new as MessageProps] })
				}
			)
			.subscribe()
	}, [])

	return (
		<div className="flex h-screen w-screen flex-row">
			<div className="h-screen w-full bg-white">
				<div className="flex h-[5%] items-center justify-center border-b">
					<h1 className="text-2xl font-bold">Chat</h1>
				</div>
				<div id="box" className="h-[85%] w-full overflow-y-scroll border-b p-8 scrollbar-hide">
					{chat.map((e) => (
						<div key={e.id} className="m-2">
							<Message key={e.answer} {...e} />
						</div>
					))}
				</div>
				<form onSubmit={handleSend} className="flex h-[10%] w-full flex-row justify-start p-4">
					<input
						ref={messRef}
						type="text"
						className="inline-block w-full rounded-full border-none bg-neutral-200 px-4 py-2 outline-none"
					/>
					<button ref={sendBtn} type="submit" className="mx-4 rounded-full border-none outline-none">
						Gửi
					</button>
				</form>
			</div>
		</div>
	)
}

export default App
