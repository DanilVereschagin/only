import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import TimeSlices from './pages/TimeSlices';
import Navbar from './components/Navbar/Navbar';

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path='/time-slices' element={<TimeSlices />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
