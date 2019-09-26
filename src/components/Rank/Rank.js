import React from 'react';
import './Rank.css';

const Rank = () => {
    return (
        <div className='ma3 pa3 bg-purple center' style={{maxWidth: 'fit-content', flexDirection: 'column'}}>
           <div className='white f4'>
               {'Player, your current rank is: '}
           </div>
           <div className='f2'>
                {'rank text'}
           </div>
        </div>
    );
}

export default Rank;
