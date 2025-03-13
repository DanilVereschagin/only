import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import { gsap } from 'gsap';
import './Timeline.scss';
import { TimelineProps } from '../../../types/Timeline';
import TimeButton from '../../Button/TimeButton';

const Timeline: React.FC<TimelineProps> = ({ periods }) => {
	const [activeSlice, setActiveSlice] = useState(periods[0].id);
	const [activeTitle, setActiveTitle] = useState(periods[0].title);
	const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
	const [animatedFrom, setAnimatedFrom] = useState(periods[0].from);
	const [animatedTo, setAnimatedTo] = useState(periods[0].to);
	const circleRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
	const fromRef = useRef<HTMLDivElement>(null);
	const toRef = useRef<HTMLDivElement>(null);

	const calculatePositions = (activeIndex: number) => {
		const count = periods.length;
		const circle = circleRef.current;
		if (!circle) return [];

		const { width } = circle.getBoundingClientRect();
		const radius = width / 2;

		const startAngle = -90;
		const activeAngle = 30;
		const angleStep = 360 / count;

		const newPositions = periods.map((_, index) => {
			const angle =
				startAngle + activeAngle + (index - activeIndex) * angleStep;
			const x = Math.cos((angle * Math.PI) / 180) * radius;
			const y = Math.sin((angle * Math.PI) / 180) * radius;
			return {
				x: x + radius,
				y: y + radius,
			};
		});

		return newPositions;
	};

	const animatePoints = (newPositions: { x: number; y: number }[]) => {
		buttonsRef.current.forEach((button, index) => {
			if (button) {
				gsap.to(button, {
					duration: 1,
					ease: 'circ.out',
				});
			}
		});
	};

	useEffect(() => {
		const activeIndex = periods.findIndex((p) => p.id === activeSlice);
		const newPositions = calculatePositions(activeIndex);
		setPositions(newPositions);
		animatePoints(newPositions);
	}, [activeSlice, periods]);

	useEffect(() => {
		const activeIndex = periods.findIndex((p) => p.id === activeSlice);

		const handleResize = () => {
			const newPositions = calculatePositions(activeIndex);
			setPositions(newPositions);
			animatePoints(newPositions);
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [activeSlice, circleRef.current]);

	useEffect(() => {
		const activePeriod = periods.find((p) => p.id === activeSlice);
		if (activePeriod) {
			setActiveTitle(activePeriod.title);

			gsap.to(fromRef.current, {
				duration: 1,
				innerText: activePeriod.from,
				snap: { innerText: 1 },
				ease: 'power1.out',
			});

			gsap.to(toRef.current, {
				duration: 1,
				innerText: activePeriod.to,
				snap: { innerText: 1 },
				ease: 'power1.out',
			});
		}
	}, [activeSlice, periods]);

	const activePeriod = periods.find((p) => p.id === activeSlice);

	return (
		<div className='timeline' ref={containerRef}>
			<div className='timeline-label'>Исторические даты</div>
			<div className='gradient-line'></div>
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
						ref={(el) => {
							buttonsRef.current[index] = el;
						}}
					/>
				))}

				<div className='timeline-date from' ref={fromRef}>
					{animatedFrom}
				</div>

				<div className='timeline-date to' ref={toRef}>
					{animatedTo}
				</div>
				<div
					className='timeline-active-title'
					style={{
						top: `${
							positions.find((_, i) => periods[i].id === activeSlice)?.y
						}px`,
						left: `${
							positions.find((_, i) => periods[i].id === activeSlice)?.x
						}px`,
					}}
				>
					{activeTitle}
				</div>
			</div>

			<div className='timeline-navigation'>
				<p className='timeline-navigation-title'>
					0{activeSlice}/0{periods.length}
				</p>
				<button
					className={`timeline-button ${activeSlice === 1 ? 'disabled' : ''}`}
					onClick={() => {
						if (activeSlice > 1) {
							setActiveSlice(activeSlice - 1);
						}
					}}
					disabled={activeSlice === 1}
				>
					{'<'}
				</button>
				<button
					className={`timeline-button ${
						activeSlice === periods.length ? 'disabled' : ''
					}`}
					onClick={() => {
						if (activeSlice < periods.length) {
							setActiveSlice(activeSlice + 1);
						}
					}}
					disabled={activeSlice === periods.length}
				>
					{'>'}
				</button>
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
