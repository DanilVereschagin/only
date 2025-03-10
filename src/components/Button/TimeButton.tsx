import React, { useState } from 'react';
import { TimeButtonProps } from '../../types/Timeline';

const TimeButton: React.FC<TimeButtonProps> = ({
	period,
	activeSlice,
	pos,
	index,
	setActiveSlice,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<button
			key={period}
			className={`timeline-dot ${
				activeSlice.toString() === period ? 'active' : ''
			}`}
			style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
			onClick={() => setActiveSlice(parseInt(period))}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{(activeSlice.toString() === period || isHovered) && (
				<span>{index + 1}</span>
			)}
		</button>
	);
};

export default TimeButton;
