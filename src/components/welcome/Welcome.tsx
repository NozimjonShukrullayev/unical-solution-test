import { motion } from 'framer-motion'
import { Layout } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const Welcome = ({ onComplete }: { onComplete: () => void }) => {
	const [name, setName] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!name.trim()) {
			toast.error('Please enter your name')
			return
		}
		setIsSubmitting(true)
		localStorage.setItem('userName', name)
		toast.success('Welcome to Dashboard Builder!')

		// Animate out
		await new Promise(resolve => setTimeout(resolve, 500))
		onComplete()
	}

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ y: '100%', transition: { duration: 0.5, ease: 'easeInOut' } }}
			className='fixed inset-0 z-[60] flex items-center justify-center'
			style={{
				backgroundImage:
					'url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm' />

			<div className='relative max-w-md w-full mx-4'>
				<motion.div
					initial={{ y: 20, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2 }}
					className='bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-2xl'
				>
					<div className='flex justify-center mb-6'>
						<motion.div
							animate={{
								rotate: [0, 360],
								scale: [1, 1.2, 1],
							}}
							transition={{
								duration: 4,
								repeat: Infinity,
								ease: 'linear',
							}}
							className='relative'
						>
							<div className='absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-50' />
							<Layout size={48} className='text-blue-500 relative z-10' />
						</motion.div>
					</div>

					<motion.h1
						initial={{ y: -20 }}
						animate={{ y: 0 }}
						className='text-2xl font-bold text-center mb-6'
					>
						Welcome to Dashboard Builder
					</motion.h1>

					<form onSubmit={handleSubmit} className='space-y-4'>
						<div>
							<label
								htmlFor='name'
								className='block text-sm font-medium text-gray-700 mb-1'
							>
								What's your name?
							</label>
							<input
								type='text'
								id='name'
								value={name}
								onChange={e => setName(e.target.value)}
								className='w-full px-4 py-2 bg-white/50 backdrop-blur-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
								placeholder='Enter your name'
							/>
						</div>

						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							animate={
								isSubmitting
									? {
											scale: [1, 0.9, 1.1, 0.9, 1],
											rotate: [0, 0, 180, 180, 0],
									  }
									: {}
							}
							type='submit'
							disabled={isSubmitting}
							className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50'
						>
							Get Started
						</motion.button>
					</form>
				</motion.div>
			</div>
		</motion.div>
	)
}
