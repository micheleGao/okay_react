import React from 'react';
import { Container, Image } from 'react-bootstrap';

const Home = () => {
	return (
		<Container className='p-5 border rounded-3 bg-light'>
				<Container>
					{/* <div className="parent">
						<div className="photos">
							<img className="music-logo" src="https://www.paint.org/wp-content/uploads/2019/11/Van-Gogh-The-Starry-Night-adult-coloring-page-1.jpg"/>
						</div>
					</div> */}
                    <Image src="https://www.paint.org/wp-content/uploads/2019/11/Van-Gogh-The-Starry-Night-adult-coloring-page-1.jpg" fluid />
				</Container>
		</Container>

	);
	
};
export default Home;