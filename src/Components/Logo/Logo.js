import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt 
                className="br2 shadow-2" 
                style={{ height: '150px', width: '150px', overflow: 'hidden' }}
                tiltMaxAngleX={10}  // Limit X tilt
                tiltMaxAngleY={10}  // Limit Y tilt
                perspective={1000}  // Set perspective for a more subtle effect
                glareEnable={true}  // Enable glare effect
                glareMaxOpacity={0.45}  // Set glare effect strength
                scale={1.05}  // Slightly scale up the content on hover
                flipVertically={false}  // Don't invert vertically
                flipHorizontally={true}  // Invert horizontally to tilt toward the inner part of the page
            >
                <div style={{ padding: '20px' }}>
                    <img alt='logo' src={brain} style={{ width: '100%', height: '100%' }} />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;