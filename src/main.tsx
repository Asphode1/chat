import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import MessageContextProvider from './context/message-context'
import RoleContextProvider from './context/role-context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RoleContextProvider>
			<MessageContextProvider>
				<App />
			</MessageContextProvider>
		</RoleContextProvider>
	</React.StrictMode>
)
