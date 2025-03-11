import React, { forwardRef, useState } from 'react';
import { TimeButtonProps } from '../../types/Timeline';

const TimeButton = forwardRef<HTMLButtonElement, TimeButtonProps>(
	({ period, activeSlice, pos, index, setActiveSlice }, ref) => {
		const [isHovered, setIsHovered] = useState(false);

		return (
			<button
				ref={ref}
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
	}
);

export default TimeButton;
