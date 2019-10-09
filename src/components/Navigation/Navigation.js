import React from 'react';

const Navigation = ({ onRouteChange }) => {
    return (
        <nav className='flex justify-end'>
            <p 
              onClick={() => onRouteChange('SignIn')} 
              className='f5 ba br-pill link purple dim black underline pa2 pointer mr2'> 
              Sign Out 
            </p>
        </nav>
    );
}

export default Navigation;
