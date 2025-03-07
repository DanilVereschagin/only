import React, { useEffect } from 'react';
import Timeline from '../components/Timeline/Timeline';

const periods = [
	{
		year: 2015,
		events: [
			{
				date: '13 сентября',
				year: '2015',
				description:
					'Частное солнечное затмение, видимое в Южной Африке и части Антарктиды',
			},
		],
	},
	{
		year: 2016,
		events: [
			{
				date: '2016',
				year: '2016',
				description: 'Телескоп «Хаббл» обнаружил галактику GN-211',
			},
		],
	},
	{
		year: 2017,
		events: [
			{
				date: '2017',
				year: '2017',
				description: 'Tesla представила электрический грузовик Semi',
			},
		],
	},
];

const TimeSlices = () => {
	useEffect(() => {
		document.title = 'Time Slices';
	}, []);

	return (
		<>
			<Timeline periods={periods} />
		</>
	);
};

export default TimeSlices;
