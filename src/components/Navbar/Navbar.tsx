import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
	return (
		<nav className='navbar'>
			<Link className='gradient-btn' to='/'>
				Home
			</Link>
			<Link className='gradient-btn' to='/time-slices'>
				Time Slices
			</Link>
		</nav>
	);
};

export default Navbar;
