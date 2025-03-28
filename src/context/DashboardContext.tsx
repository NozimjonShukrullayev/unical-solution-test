import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BlockData, Layout } from '../types/types'

interface DashboardContextType {
	blocks: BlockData[]
	isEditing: boolean
	isModalOpen: boolean
	isOpenSidebar: boolean
	setIsOpenSidebar: (value: boolean) => void
	setIsModalOpen: (value: boolean) => void
	handleAddBlock: (type: 'image' | 'chart', content?: { url?: string }) => void
	handleRemoveBlock: (id: string) => void
	handleLayoutChange: (layout: Layout[]) => void
	handleSave: () => void
	setIsEditing: (value: boolean) => void
}

const DashboardContext = createContext<DashboardContextType | undefined>(
	undefined
)

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isEditing, setIsEditing] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isOpenSidebar, setIsOpenSidebar] = useState(false)
	const [blocks, setBlocks] = useState<BlockData[]>(() => {
		const savedBlocks = localStorage.getItem('dashboardBlocks')
		return savedBlocks ? JSON.parse(savedBlocks) : []
	})

	useEffect(() => {
		if (!isEditing) {
			localStorage.setItem('dashboardBlocks', JSON.stringify(blocks))
		}
	}, [blocks, isEditing])

	const handleAddBlock = (type: 'image' | 'chart', content = {}) => {
		const newBlock: BlockData = {
			id: `block-${Date.now()}`,
			type,
			content,
			x: 0,
			y: Infinity,
			w: type === 'chart' ? 6 : 4,
			h: type === 'chart' ? 4 : 4,
			minW: 2,
			minH: 2,
		}
		setBlocks(prev => [...prev, newBlock])
		toast.success(
			`${type === 'image' ? 'Image' : 'Chart'} block added successfully!`
		)
	}

	const handleRemoveBlock = (id: string) => {
		setBlocks(blocks.filter(block => block.id !== id))
		toast.success('Block removed successfully!')
	}

	const handleLayoutChange = (layout: Layout[]) => {
		const sortedLayout = [...layout].sort((a, b) => a.y - b.y)
		const updatedBlocks = blocks.map(block => {
			const layoutItem = sortedLayout.find(
				layoutItem => layoutItem.i === block.id
			)
			if (layoutItem) {
				return {
					...block,
					x: layoutItem.x,
					y: layoutItem.y,
					w: layoutItem.w,
					h: layoutItem.h,
				}
			}
			return block
		})
		setBlocks(updatedBlocks)
	}

	const handleSave = () => {
		setIsEditing(false)
		localStorage.setItem('dashboardBlocks', JSON.stringify(blocks))
		toast.success('Dashboard saved successfully!')
	}

	return (
		<DashboardContext.Provider
			value={{
				blocks,
				isEditing,
				isModalOpen,
				isOpenSidebar,
				setIsOpenSidebar,
				setIsModalOpen,
				handleAddBlock,
				handleRemoveBlock,
				handleLayoutChange,
				handleSave,
				setIsEditing,
			}}
		>
			{children}
		</DashboardContext.Provider>
	)
}

export { DashboardContext }
