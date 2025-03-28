export interface BlockData {
	id: string
	type: 'image' | 'chart'
	content: {
		url?: string
		chartType?: 'bar' | 'line' | 'pie'
		data?: { label: string; value: number }[]
	}
	x: number
	y: number
	w: number
	h: number
	minW: number
	minH: number
}

export interface Layout {
	i: string
	x: number
	y: number
	w: number
	h: number
}
