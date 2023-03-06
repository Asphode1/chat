import React, { useEffect, useRef, useState } from 'react'
import Message from './components/Message'
import supabase from './supabase/supabase'

export interface MessageProps {
  userid: number
  created_at: string
  chatmessage: string
}

function App() {
  const messRef = useRef<HTMLInputElement>(null)
  const sendBtn = useRef<HTMLButtonElement>(null)

  const sendMessage = async (mess: string) => await supabase.from('chat').insert({ chatmessage: mess })

  const handleSend = (e: React.MouseEvent) => {
    e.preventDefault()
    if (messRef.current && messRef.current.value.length)
      sendMessage(messRef.current.value).catch((err) => console.log(err))
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
      .then((res) => setChat(res.data as MessageProps[]))
  }, [])

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
        (payload) => setChat((chat) => [...chat, payload.new as MessageProps])
      )
      .subscribe()
  }, [])

  return (
    <div className="flex h-screen w-screen flex-row">
      <div className="h-screen w-1/6 border-r bg-white"></div>
      <div className="h-screen w-5/6 bg-white">
        <div className="flex h-[5%] items-center justify-center border-b">
          <h1 className="text-2xl font-bold">Chat</h1>
        </div>
        <div className="h-[85%] w-full overflow-y-scroll border-b p-8">
          {chat?.map((e) => (
            <div key={e.userid}>
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
