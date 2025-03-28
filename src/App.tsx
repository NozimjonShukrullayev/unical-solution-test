import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import 'react-grid-layout/css/styles.css'
import { Toaster } from 'react-hot-toast'
import 'react-resizable/css/styles.css'

import { AddBlockModal } from './components/dashboard/AddBlockModal'
import { DashboardGrid } from './components/dashboard/DashboardGrid'
import { Header } from './components/dashboard/Header'
import { Sidebar } from './components/dashboard/Sidebar'
import { Preloader } from './components/preloader/Preloader'
import { Welcome } from './components/welcome/Welcome'
import { DashboardProvider } from './context/DashboardContext'

function App() {
	const [isLoading, setIsLoading] = useState(true)
	const [showWelcome, setShowWelcome] = useState(false)

	useEffect(() => {
		// Simulate loading
		const timer = setTimeout(() => {
			setIsLoading(false)
			if (!localStorage.getItem('userName')) {
				setShowWelcome(true)
			}
		}, 2000)

		return () => {
			clearTimeout(timer)
		}
	}, [])

	if (isLoading) {
		return <Preloader />
	}

	return (
		<DashboardProvider>
			<div className='flex min-h-screen bg-gray-100'>
				<Toaster position='top-right' />

				<AnimatePresence>
					{showWelcome && <Welcome onComplete={() => setShowWelcome(false)} />}
				</AnimatePresence>

				<AddBlockModal />
				<Sidebar />

				<div className='flex-1 flex flex-col'>
					<Header />
					<main className='flex-1 p-6'>
						<DashboardGrid />
					</main>
				</div>
			</div>
		</DashboardProvider>
	)
}

export default App
