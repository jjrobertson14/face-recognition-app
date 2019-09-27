import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className='center ma'>
            <div className='absolute, mt2'>
                <img alt='' src={ imageUrl } style={{width: '500px', height: 'auto'}} />
            {/* to try this out: https://samples.clarifai.com/face-det.jpg */}
            </div>
        </div>
    );
}

export default FaceRecognition;
