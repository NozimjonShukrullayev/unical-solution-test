import { AnimatePresence, motion } from 'framer-motion'
import { BarChart, Image as ImageIcon, Upload, X } from 'lucide-react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDashboard } from '../../hooks/useDashboard'

export const AddBlockModal = () => {
	const {
		isModalOpen,
		setIsModalOpen,
		handleAddBlock,
		setIsOpenSidebar,
		setIsEditing,
	} = useDashboard()
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string>('')
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [selectedType, setSelectedType] = useState<'image' | 'chart' | null>(
		null
	)

	const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			if (file.type.startsWith('image/')) {
				setSelectedFile(file)
				// Create preview URL for UI
				const previewUrl = URL.createObjectURL(file)
				setPreviewUrl(previewUrl)

				// Convert to base64 for storage
				const reader = new FileReader()
				reader.onloadend = () => {
					if (typeof reader.result === 'string') {
						setPreviewUrl(reader.result)
					}
				}
				reader.readAsDataURL(file)

				toast.success('Image selected successfully!')
			} else {
				toast.error('Please select an image file')
			}
		}
	}

	const handleAddBlockAndClose = () => {
		if (selectedType === 'image') {
			if (!selectedFile) {
				toast.error('Please select an image')
				return
			}
			handleAddBlock('image', { url: previewUrl })
		} else if (selectedType === 'chart') {
			handleAddBlock('chart')
		}
		setIsEditing(true)
		setIsOpenSidebar(false)
		setIsModalOpen(false)
		setSelectedType(null)
		setSelectedFile(null)
		setPreviewUrl('')
	}

	return (
		<AnimatePresence>
			{isModalOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className='fixed inset-0 z-[70] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'
				>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						className='bg-white rounded-xl p-6 w-full max-w-md shadow-2xl'
					>
						<div className='flex justify-between items-center mb-6'>
							<h2 className='text-xl font-semibold'>Add New Block</h2>
							<button
								onClick={() => setIsModalOpen(false)}
								className='p-1 hover:bg-gray-100 rounded-full transition-colors'
							>
								<X size={20} />
							</button>
						</div>

						{!selectedType ? (
							<div className='grid grid-cols-2 gap-4'>
								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setSelectedType('image')}
									className='flex flex-col items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-colors'
								>
									<ImageIcon size={32} className='text-blue-500' />
									<span>Image Block</span>
								</motion.button>

								<motion.button
									whileHover={{ scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
									onClick={() => setSelectedType('chart')}
									className='flex flex-col items-center gap-3 p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-colors'
								>
									<BarChart size={32} className='text-blue-500' />
									<span>Chart Block</span>
								</motion.button>
							</div>
						) : (
							<div className='space-y-4'>
								{selectedType === 'image' && (
									<div className='space-y-4'>
										<input
											type='file'
											ref={fileInputRef}
											onChange={handleFileSelect}
											accept='image/*'
											className='hidden'
										/>

										<motion.div
											whileHover={{ scale: 1.02 }}
											whileTap={{ scale: 0.98 }}
											onClick={() => fileInputRef.current?.click()}
											className='border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition-colors'
										>
											<div className='flex flex-col items-center gap-3'>
												<Upload size={32} className='text-blue-500' />
												<span className='text-gray-600'>
													Click to select an image
												</span>
											</div>
										</motion.div>

										{previewUrl && (
											<div className='relative rounded-xl overflow-hidden'>
												<img
													src={previewUrl}
													alt='Preview'
													className='w-full h-48 object-cover'
												/>
												<button
													onClick={() => {
														setSelectedFile(null)
														setPreviewUrl('')
													}}
													className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600'
												>
													<X size={16} />
												</button>
											</div>
										)}
									</div>
								)}

								<div className='flex gap-3 justify-end mt-6'>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={() => setSelectedType(null)}
										className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'
									>
										Back
									</motion.button>
									<motion.button
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
										onClick={handleAddBlockAndClose}
										className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
									>
										Add Block
									</motion.button>
								</div>
							</div>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
