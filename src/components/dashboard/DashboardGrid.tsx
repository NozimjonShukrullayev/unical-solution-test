import { Fragment, LegacyRef, useEffect, useRef, useState } from 'react'
import GridLayout from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { useDashboard } from '../../hooks/useDashboard'
import { useWindowSize } from '../../hooks/useWindowSize'
import Block from './Block'

const BREAKPOINTS = {
	lg: 1200,
	md: 996,
	sm: 768,
	xs: 480,
	xxs: 0,
}

const COLS = {
	lg: 12,
	md: 10,
	sm: 6,
	xs: 4,
	xxs: 2,
}

export const DashboardGrid = () => {
	const layoutRef: LegacyRef<HTMLDivElement> = useRef(null)
	const { blocks, isEditing, handleLayoutChange, setIsEditing, handleSave } =
		useDashboard()
	const { width } = useWindowSize()
	const [containerWidth, setContainerWidth] = useState(0)

	useEffect(() => {
		setContainerWidth(layoutRef.current?.offsetWidth || 0)
	}, [width])

	const getBreakpoint = () => {
		if (width >= BREAKPOINTS.lg) return 'lg'
		if (width >= BREAKPOINTS.md) return 'md'
		if (width >= BREAKPOINTS.sm) return 'sm'
		if (width >= BREAKPOINTS.xs) return 'xs'
		return 'xxs'
	}

	const currentBreakpoint = getBreakpoint()

	return (
		<div className='bg-white rounded-lg shadow-lg p-6 overflow-hidden'>
			{!blocks.length && !isEditing ? (
				<div>No blocks added</div>
			) : (
				<Fragment>
					<div className='mb-4 flex justify-between items-center'>
						<h2 className='text-xl font-semibold text-gray-700'>
							{isEditing ? 'Edit Dashboard' : 'View Dashboard'}
						</h2>
						<button
							onClick={isEditing ? handleSave : () => setIsEditing(true)}
							className={`px-4 py-2 rounded-lg ${
								isEditing
									? 'bg-green-500 hover:bg-green-600'
									: 'bg-blue-500 hover:bg-blue-600'
							} text-white transition-colors`}
						>
							{isEditing ? 'Save Dashboard' : 'Edit Dashboard'}
						</button>
					</div>
				</Fragment>
			)}

			<div className='rounded-lg min-h-[75vh]' ref={layoutRef}>
				<GridLayout
					className='layout'
					layout={blocks.map(block => ({
						i: block.id,
						x: block.x || 0,
						y: block.y || 0,
						w: Math.min(block.w || 4, COLS[currentBreakpoint]),
						h: block.h || 4,
						minW: 2,
						maxW: COLS[currentBreakpoint],
						minH: 2,
						maxH: 12,
						static: !isEditing,
					}))}
					cols={COLS[currentBreakpoint]}
					rowHeight={100}
					width={containerWidth}
					isDraggable={isEditing}
					isResizable={isEditing}
					onLayoutChange={handleLayoutChange}
					margin={[24, 24]}
					containerPadding={[0, 24]}
					compactType='vertical'
					preventCollision={false}
					useCSSTransforms={true}
					droppingItem={{ i: 'new-block', w: 2, h: 2 }}
					style={{ minHeight: '400px' }}
				>
					{blocks.map(block => (
						<div key={block.id} className='group z-10'>
							<Block data={block} />
						</div>
					))}
				</GridLayout>
			</div>
		</div>
	)
}
