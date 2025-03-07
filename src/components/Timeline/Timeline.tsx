import React, { useState, useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { gsap } from 'gsap';
import './Timeline.scss';
import 'swiper/swiper-bundle.css';

interface TimelineEvent {
	date: string;
	year: string;
	description: string;
}

interface TimelineProps {
	periods: {
		year: number;
		events: TimelineEvent[];
	}[];
}

const Timeline: React.FC<TimelineProps> = ({ periods }) => {
	const [activeYear, setActiveYear] = useState(periods[0].year);
	const swiperRef = useRef<Swiper | null>(null);
	const circleRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	// Расчет позиций для точек
	const calculatePositions = () => {
		const count = periods.length;
		return periods.map((_, index) => {
			const angle = (index * 360) / count - 90;
			return {
				x: Math.cos((angle * Math.PI) / 180) * 120 + 150,
				y: Math.sin((angle * Math.PI) / 180) * 120 + 150,
			};
		});
	};

	// Инициализация Swiper
	const initSwiper = () => {
		swiperRef.current = new Swiper(`.swiper-container-${activeYear}`, {
			slidesPerView: 1,
			spaceBetween: 30,
		});
	};

	// Анимация переключения
	const animateTransition = () => {
		gsap.from(containerRef.current, {
			duration: 0.5,
			opacity: 0.5,
			y: 20,
		});
	};

	useEffect(() => {
		initSwiper();
		animateTransition();
		return () => swiperRef.current?.destroy();
	}, [activeYear]);

	return (
		<div className='timeline' ref={containerRef}>
			<div className='timeline-circle' ref={circleRef}>
				{periods.map((period, index) => {
					const pos = calculatePositions()[index];
					return (
						<button
							key={period.year}
							className={`timeline-dot ${
								activeYear === period.year ? 'active' : ''
							}`}
							style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
							onClick={() => setActiveYear(period.year)}
						>
							<span>{period.year}</span>
						</button>
					);
				})}
			</div>

			<div className='timeline-info'>
				<div className={`swiper-container swiper-container-${activeYear}`}>
					<div className='swiper-wrapper'>
						{periods
							.find((p) => p.year === activeYear)
							?.events.map((event, index) => (
								<div key={index} className='swiper-slide'>
									<h3>{event.year}</h3>
									<p>{event.description}</p>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Timeline;
