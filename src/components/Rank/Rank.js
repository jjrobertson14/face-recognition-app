import React from 'react';
import './Rank.css';

const Rank = ({name, entries}) => {
    return (
        <div className='ma3 pa3 bg-purple center' style={{maxWidth: 'fit-content', flexDirection: 'column'}}>
           <div className='white f4'>
               {name + ', your current rank is: '}
           </div>
           <div className='f2'>
                {entries}
           </div>
        </div>
    );
}

export default Rank;
