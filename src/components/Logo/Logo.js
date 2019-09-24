import React from 'react';
import './Logo.css'
import Tilt from 'react-tilt'
import foxImg from './icons8-fox-32.png';


const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className='Tilt shadow-2' options={{ max : 25, perspective : 750, speed : 150, reverse: true }} style={{ height: 150, width: 150 }} >
                <div className='Tilt-inner pa3'>
                    <img style={{ height: '50px', width: '50px'}} src={foxImg} alt='minimal fox head'></img>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;
