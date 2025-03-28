import { motion } from 'framer-motion'
import { TrashIcon } from 'lucide-react'
import { useDashboard } from '../../hooks/useDashboard'
import { BlockData } from '../../types/types'
import ChartBlock from './blocks/ChartBlock'
import ImageBlock from './blocks/ImageBlock'

const Block = ({ data }: { data: BlockData }) => {
	const { handleRemoveBlock, isEditing } = useDashboard()

	const renderContent = () => {
		switch (data.type) {
			case 'image':
				return <ImageBlock url={data.content.url} />
			case 'chart':
				return <ChartBlock />
			default:
				return null
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			className='relative w-full h-full bg-white rounded-lg shadow-lg overflow-hidden block-shadow'
			style={{ cursor: isEditing ? 'move' : 'default' }}
		>
			{isEditing && (
				<motion.button
					initial={{ opacity: 1 }}
					animate={{ opacity: 1 }}
					whileHover={{ opacity: 1 }}
					className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 z-50 transition-all group-hover:opacity-100'
					onClick={() => handleRemoveBlock(data.id)}
				>
					<TrashIcon size={21} />
				</motion.button>
			)}
			{renderContent()}
		</motion.div>
	)
}

export default Block
