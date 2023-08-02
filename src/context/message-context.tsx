import { createContext, Dispatch, ReactNode, useContext, useEffect, useReducer } from 'react'
import supabase from '../supabase/supabase'

export interface MessageProps {
	id: string
	msg: string
	role: string
	answer: string | null
	answered: boolean | null
}

export interface ActionProps {
	type: 'insert' | 'update'
	payload: MessageProps[]
}

function reducer(state: MessageProps[], action: ActionProps) {
	switch (action.type) {
		case 'insert': {
			if (state.findIndex((e) => e.id === action.payload[0].id) === -1) return [...state, ...action.payload]
			return state
		}
		case 'update': {
			const index = state.findIndex((s) => s.id === action.payload[0].id)
			return [...state.slice(0, index), action.payload[0], ...state.slice(index + 1, state.length)]
		}
	}
}

export interface MessageContextProps {
	chat: MessageProps[]
	dispatch: Dispatch<ActionProps>
}

export const MessageContext = createContext<MessageContextProps | null>(null)

export default function MessageContextProvider({ children }: { children: ReactNode | ReactNode[] }) {
	const [chat, dispatch] = useReducer(reducer, [])

	useEffect(() => {
		supabase
			.from('second_chat')
			.select('*')
			.range(0, 20)
			.then((res) => {
				dispatch({ type: 'insert', payload: res.data as MessageProps[] })
			})
	}, [])

	return <MessageContext.Provider value={{ chat, dispatch }}>{children}</MessageContext.Provider>
}

export function useChat() {
	const { chat, dispatch } = useContext(MessageContext)!
	return { chat, dispatch }
}
