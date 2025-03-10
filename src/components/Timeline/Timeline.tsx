import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import { gsap } from 'gsap';
import './Timeline.scss';
import { TimelineProps } from '../../types/Timeline';
import TimeButton from '../Button/TimeButton';

const Timeline: React.FC<TimelineProps> = ({ periods }) => {
	const [activeSlice, setActiveSlice] = useState(periods[0].id);
	const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
	const circleRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const calculatePositions = () => {
		const count = periods.length;

		const circle = circleRef.current;
		if (!circle) return [];

		const { width, height } = circle.getBoundingClientRect();
		const radius = width / 2;

		const newPositions = periods.map((_, index) => {
			const angle = (index * 360) / count - 90;
			const x = Math.cos((angle * Math.PI) / 180) * radius;
			const y = Math.sin((angle * Math.PI) / 180) * radius;
			return {
				x: x + radius,
				y: y + radius,
			};
		});

		setPositions(newPositions);
	};

	const animateTransition = () => {
		gsap.from(containerRef.current, {
			duration: 0.5,
			y: 20,
		});
	};

	useEffect(() => {
		animateTransition();
	}, [activeSlice]);

	useEffect(() => {
		calculatePositions();

		const handleResize = () => {
			calculatePositions();
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [circleRef.current]);

	return (
		<div className='timeline' ref={containerRef}>
			<div className='timeline-label'>Исторические даты</div>
			<div className='timeline-center-line-vertical'></div>
			<div className='timeline-center-line-horizontal'></div>
			<div className='timeline-circle' ref={circleRef}>
				{positions.map((pos, index) => (
					<TimeButton
						key={periods[index].title}
						period={periods[index].id.toString()}
						activeSlice={activeSlice}
						pos={pos}
						index={index}
						setActiveSlice={setActiveSlice}
					/>
				))}
			</div>

			<div className='timeline-info'>
				<Swiper
					className='swiper-container'
					modules={[Navigation, A11y]}
					slidesPerView={3}
					spaceBetween={50}
					navigation
				>
					{periods
						.find((p) => p.id === activeSlice)
						?.events.map((event, index) => (
							<SwiperSlide key={index} className='swiper-slide'>
								<h3 className='slide-title'>{event.date}</h3>
								<p className='slide-description'>{event.description}</p>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
};

export default Timeline;
