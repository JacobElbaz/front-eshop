import React from 'react'
import './About.css';
import img1 from '../images/intro-img.png';

function About() {
	return (
		<div class="section">
			<div class="container">
				<div class="content-section">
					<div class="title">
						<h1>About Us</h1>
					</div>
					<div class="content">
						<h3>Welcome to Game Zone</h3>
						<p>Game Zone is the premiere source and community for both niche and unique games across the globe. We provide fun daily content, memes, and comprehensive coverage of the latest and greatest video games. We are the new enthusiast gaming press, for the digital age.</p>
						<img src={img1}></img>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About