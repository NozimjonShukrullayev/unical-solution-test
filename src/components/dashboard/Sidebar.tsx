import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { useDashboard } from '../../hooks/useDashboard'

export const Sidebar = () => {
	const { setIsModalOpen, isOpenSidebar, setIsOpenSidebar } = useDashboard()

	return (
		<motion.div
			initial={false}
			animate={{ width: 256 }}
			className={`bg-gray-800 fixed pt-5 text-white min-h-screen flex-col z-50 transition-all duration-300 ${
				!isOpenSidebar ? '-translate-x-[97%] ' : '-translate-x-0'
			}`}
		>
			<div className='flex items-center justify-between p-4 relative'>
				<span className='text-nowrap'>Dashboard Tools</span>
				<button
					onClick={() => setIsOpenSidebar(!isOpenSidebar)}
					className='p-2 hover:bg-gray-500 bg-gray-700 flex gap-3 items-center justify-between transition-colors rounded-full absolute -right-6 top-7'
				>
					{isOpenSidebar ? (
						<ChevronRight size={24} />
					) : (
						<ChevronLeft size={24} />
					)}
				</button>
			</div>

			<div className='p-4'>
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => setIsModalOpen(true)}
					className='w-full flex items-center gap-3 p-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors'
				>
					<Plus size={24} />
					<span className='text-nowrap'>Add Block</span>
				</motion.button>
			</div>
		</motion.div>
	)
}
