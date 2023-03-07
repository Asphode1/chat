import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

export type Tab = 1 | 2 | 3 | 4 | 5

interface ContextProps {
	tab: Tab
	setTab: Dispatch<SetStateAction<Tab>>
}

export const TabContext = createContext<ContextProps | null>(null)

interface WrapperProps {
	children: ReactNode[] | ReactNode
}

export default function TabProvider({ children }: WrapperProps) {
	const [tab, setTab] = useState<Tab>(1)

	return <TabContext.Provider value={{ tab: tab, setTab: setTab }}>{children}</TabContext.Provider>
}

export function useTab() {
	const { tab, setTab } = useContext(TabContext)!
	return { tab, setTab }
}
