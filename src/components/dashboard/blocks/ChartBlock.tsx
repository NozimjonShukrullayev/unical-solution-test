import {
	ArcElement,
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip,
} from 'chart.js'
import { motion } from 'framer-motion'
import { Bar, Doughnut, Line } from 'react-chartjs-2'

// Registratsiya
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	ArcElement,
	Tooltip,
	Legend
)

type ChartType = 'bar' | 'line' | 'doughnut'

interface ChartBlockProps {
	type?: ChartType
}

const chartData = {
	labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
	datasets: [
		{
			label: 'Sales',
			data: [65, 45, 75, 55, 42, 90],
			backgroundColor: [
				'#3b82f6',
				'#60a5fa',
				'#93c5fd',
				'#bfdbfe',
				'#60a5fa',
				'#3b82f6',
			],
			borderColor: '#2563eb',
			borderWidth: 1,
			fill: false,
			tension: 0.4,
		},
	],
}

const options = {
	responsive: true,
	maintainAspectRatio: false,
}

const ChartBlock: React.FC<ChartBlockProps> = ({ type = 'bar' }) => {
	const renderChart = () => {
		switch (type) {
			case 'line':
				return <Line data={chartData} options={options} />
			case 'doughnut':
				return <Doughnut data={chartData} options={options} />
			case 'bar':
			default:
				return <Bar data={chartData} options={options} />
		}
	}

	return (
		<div className='w-full h-full relative flex items-end justify-around'>
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.4 }}
				className='w-full h-full p-4 pb-20 bg-white rounded-2xl'
			>
				<div className='px-24'>
					<p className='text-lg rounded-sm border font-semibold text-gray-500 mb-4 p-2 bg-slate-100/45 w-full min-w-16'>
						Chart
					</p>
				</div>
				<div className='w-full h-full flex items-center justify-center'>
					{renderChart()}
				</div>
			</motion.div>
		</div>
	)
}

export default ChartBlock
