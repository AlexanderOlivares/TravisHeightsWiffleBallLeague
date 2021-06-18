import React from 'react'
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
	return (
		<div style={{display: 'flex', justifyContent: "space-around"}}>
			<div>
			<Link to="/">Home</Link>	
				</div>	
			<div>
			<Link to="/games">Games</Link>	
			</div>	
			<div>
			<Link to="/contact">Contact</Link>	
			</div>	
		</div>
	)
}

export default Navbar;