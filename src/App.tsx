import React, { useEffect, useRef, useState } from 'react'
import Message from './components/Message'
import supabase from './supabase/supabase'

export interface MessageProps {
	id: string
	msg: string
}

function App() {
	const messRef = useRef<HTMLInputElement>(null)
	const sendBtn = useRef<HTMLButtonElement>(null)

	const sendMessage = async (msg: string) => await supabase.from('chat').insert({ msg })

	const handleSend = (e: React.MouseEvent) => {
		e.preventDefault()
		if (messRef.current && messRef.current.value.length) {
			sendMessage(messRef.current.value).catch((err) => console.log(err))
			messRef.current.value = ''
		}
	}
	const [chat, setChat] = useState<MessageProps[]>([])

	useEffect(() => {
		const handleEnter = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				e.preventDefault()
				if (sendBtn.current) sendBtn.current.click()
			}
		}

		document.addEventListener('keypress', handleEnter)

		return () => document.removeEventListener('keypress', handleEnter)
	}, [])

	useEffect(() => {
		supabase
			.from('chat')
			.select('*')
			.range(0, 20)
			.then((res) => setChat(res.data as MessageProps[]))
	}, [])

	useEffect(() => {
		console.log(chat)
	}, [chat])

	useEffect(() => {
		const channel = supabase.channel('db-chat', { config: { broadcast: { self: true } } })
		channel
			.on(
				'postgres_changes',
				{
					event: 'INSERT',
					schema: 'public',
					table: 'chat',
				},
				(payload) => {
					console.log(payload)
					setChat((chat) => [...chat, payload.new as MessageProps])
				}
			)
			.subscribe()
	}, [])

	return (
		<div className="flex h-screen w-screen flex-row">
			<div className="h-screen w-5/6 bg-white">
				<div className="flex h-[5%] items-center justify-center border-b">
					<h1 className="text-2xl font-bold">Chat</h1>
				</div>
				<div id="box" className="h-[85%] w-full overflow-y-scroll border-b p-8">
					{chat.map((e) => (
						<div key={e.id} className="m-2">
							<Message {...e} />
						</div>
					))}
				</div>
				<div className="flex h-[10%] w-full flex-row justify-start p-4">
					<input
						ref={messRef}
						type="text"
						className="inline-block w-full rounded-full border-none bg-neutral-200 px-4 py-2 outline-none"
					/>
					<button
						onClick={handleSend}
						ref={sendBtn}
						type="button"
						className="mx-4 rounded-full border-none outline-none"
					>
						Gửi
					</button>
				</div>
			</div>
		</div>
	)
}

export default App
