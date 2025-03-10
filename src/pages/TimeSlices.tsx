import React, { useEffect, useState } from 'react';
import Timeline from '../components/Timeline/Timeline';

const TimeSlices = () => {
	const [periods, setPeriods] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchPeriods = async () => {
		try {
			const response = await fetch('http://localhost:4000/time-slices');
			const data = await response.json();
			setPeriods(data);
		} catch (error) {
			console.error('Error fetching periods:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		document.title = 'Time Slices';
		fetchPeriods();
	}, []);

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	return (
		<>
			<Timeline periods={periods} />
		</>
	);
};

export default TimeSlices;
