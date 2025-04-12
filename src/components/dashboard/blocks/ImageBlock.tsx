import React from 'react'

interface ImageBlockProps {
	url: string | undefined
}

const ImageBlock: React.FC<ImageBlockProps> = ({ url }) => {
	return (
		<div className='w-full h-full relative'>
			<div className='px-24'>
				<p className='text-lg rounded-sm border font-semibold text-gray-500 mb-4 p-2 bg-slate-100/45 w-full min-w-16'>
					Image
				</p>
			</div>
			<img
				src={url}
				alt='Block content'
				className='object-contain rounded w-full h-full'
				loading='lazy'
				style={{ maxHeight: '100%', maxWidth: '100%' }}
			/>
		</div>
	)
}

export default ImageBlock
