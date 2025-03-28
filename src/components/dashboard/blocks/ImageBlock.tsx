import React from 'react'

interface ImageBlockProps {
	url: string | undefined
}

const ImageBlock: React.FC<ImageBlockProps> = ({ url }) => {
	return (
		<div className='w-full h-full relative'>
			<p className='absolute top-2 left-5 text-base py-2 bg-slate-100/45 mx-5 text-gray-500 text-center w-4/5'>
				Image
			</p>
			<img
				src={url}
				alt='Block content'
				className='absolute top-[55%] left-2/4 transform -translate-x-2/4 -translate-y-2/4 object-contain rounded'
				loading='lazy'
				style={{ maxHeight: '100%', maxWidth: '100%' }}
			/>
		</div>
	)
}

export default ImageBlock
