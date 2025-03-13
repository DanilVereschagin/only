import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import { gsap } from 'gsap';
import './TimelineMobile.scss';
import { TimelineProps } from '../../../types/Timeline';

const Timeline: React.FC<TimelineProps> = ({ periods }) => {
	const [activeSlice, setActiveSlice] = useState(periods[0].id);
	const containerRef = useRef<HTMLDivElement>(null);
	const fromRef = useRef<HTMLDivElement>(null);
	const toRef = useRef<HTMLDivElement>(null);
	const [animatedFrom, setAnimatedFrom] = useState(periods[0].from);
	const [animatedTo, setAnimatedTo] = useState(periods[0].to);

	useEffect(() => {
		const activePeriod = periods.find((p) => p.id === activeSlice);
		if (activePeriod) {
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

	return (
		<div className='timeline_mobile' ref={containerRef}>
			<div className='timeline-label_mobile'>Исторические даты</div>

			<div className='timeline-date_mobile from' ref={fromRef}>
				{animatedFrom}
			</div>

			<div className='timeline-date_mobile to' ref={toRef}>
				{animatedTo}
			</div>

			<div className='timeline-center-line-horizontal_mobile'></div>

			<div className='timeline-info_mobile'>
				<Swiper
					className='swiper-container'
					modules={[Pagination, A11y]}
					slidesPerView={1.5}
					spaceBetween={25}
					pagination={{
						clickable: true,
						el: '.swiper-pagination',
					}}
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

			<div className='timeline-navigation_mobile'>
				<p className='timeline-navigation-title_mobile'>
					0{activeSlice}/0{periods.length}
				</p>
				<button
					className={`timeline-button_mobile ${
						activeSlice === 1 ? 'disabled_mobile' : ''
					}`}
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
					className={`timeline-button_mobile ${
						activeSlice === periods.length ? 'disabled_mobile' : ''
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
			<div className='swiper-pagination'></div>
		</div>
	);
};

export default Timeline;
