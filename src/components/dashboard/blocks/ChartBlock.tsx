import { motion } from 'framer-motion'

const sampleChartData = {
	bar: [
		{ label: 'Jan', value: 65 },
		{ label: 'Feb', value: 45 },
		{ label: 'Mar', value: 75 },
		{ label: 'Apr', value: 55 },
		{ label: 'May', value: 42 },
		{ label: 'Jun', value: 27 },
		{ label: 'Jul', value: 39 },
		{ label: 'Aug', value: 87 },
	],
}

const ChartBlock = () => {
	return (
		<div className='w-full h-full relative flex items-end justify-around p-4'>
			<p className='absolute top-5 text-base py-2 bg-slate-100/45 mx-5 text-gray-500 text-center w-4/5'>
				Image
			</p>
			{sampleChartData.bar.map((item, index) => (
				<motion.div
					key={index}
					initial={{ height: 0 }}
					animate={{ height: `${item.value}%` }}
					transition={{ duration: 0.5, delay: index * 0.1 }}
					className='flex flex-col items-center'
				>
					<div
						className='w-8 bg-blue-500 rounded-t'
						style={{ height: `${item.value}%` }}
					></div>
					<span className='text-sm mt-2'>{item.label}</span>
				</motion.div>
			))}
		</div>
	)
}

export default ChartBlock
