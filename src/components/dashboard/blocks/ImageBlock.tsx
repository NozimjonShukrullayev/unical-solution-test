import React from 'react'

interface ImageBlockProps {
	url: string | undefined
}

const ImageBlock: React.FC<ImageBlockProps> = ({ url }) => {
	return (
		<div className='w-full h-full relative'>
			<img
				src={url}
				alt='Block content'
				className='absolute inset-0 w-full h-full object-contain rounded'
				loading='lazy'
				style={{ maxHeight: '100%', maxWidth: '100%' }}
			/>
		</div>
	)
}

export default ImageBlock
