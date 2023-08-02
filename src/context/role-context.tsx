import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { createPortal } from 'react-dom'

export type Roles = 'Question' | 'Answer' | undefined

export interface RoleContextProps {
	role: Roles
	setRole: Dispatch<SetStateAction<Roles>>
}

export const RoleContext = createContext<RoleContextProps | null>(null)

export default function RoleContextProvider({ children }: { children: ReactNode | ReactNode[] }) {
	const [role, setRole] = useState<Roles>(undefined)

	return (
		<RoleContext.Provider value={{ role, setRole }}>
			{children}
			{role ? null : <RoleModal />}
		</RoleContext.Provider>
	)
}

const RoleModal = () => {
	const { setRole } = useRole()
	return createPortal(
		<div className="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center">
			<div className="absolute inset-0 bg-black/25"></div>
			<div className="z-10 rounded bg-white p-8">
				<h1 className="mb-2 text-center">Chọn vai trò</h1>
				<div>
					<button className="mr-4 rounded-md bg-green-400 p-2" onClick={() => setRole('Question')}>
						Hỏi
					</button>
					<button className="rounded-md bg-green-400 p-2" onClick={() => setRole('Answer')}>
						Trả lời
					</button>
				</div>
			</div>
		</div>,
		document.body
	)
}

export function useRole() {
	const { role, setRole } = useContext(RoleContext)!
	return { role, setRole }
}
