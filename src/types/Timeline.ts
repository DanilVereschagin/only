export interface TimelineEvent {
	date: string;
	description: string;
}

export interface TimelineProps {
	periods: {
		id: number;
		title: string;
		from: number;
		to: number;
		events: TimelineEvent[];
	}[];
}

export interface TimeButtonProps {
	period: string;
	activeSlice: number;
	pos: {
		x: number;
		y: number;
	};
	index: number;
	setActiveSlice: (year: number) => void;
}
