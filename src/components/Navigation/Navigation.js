import React from 'react';

const Navigation = ({ isSignedIn, onRouteChange }) => {

  if (isSignedIn) {
    return (
      <nav className='flex justify-end'>
        <p 
          onClick={() => onRouteChange('SignIn')} 
          className='f5 ba br-pill link purple dim black underline pa2 pointer mr2'> 
          Sign Out 
        </p>
      </nav>
    );
  } else {
    return (
      <nav className='flex justify-end'>
        <p 
          onClick={() => onRouteChange('SignIn')} 
          className='f5 ba br-pill link purple dim black underline pa2 pointer mr2'> 
          Sign In
        </p>
        <p 
          onClick={() => onRouteChange('Register')} 
          className='f5 ba br-pill link purple dim black underline pa2 pointer mr2'> 
          Register
        </p>
      </nav>
    )
  }
}

export default Navigation;
