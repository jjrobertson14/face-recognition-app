import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box, imageUrl }) => {
    return (
        <div className='center ma'>
            <div className='absolute, mt2, relative'>
                <img id='input-image' alt='' src={ imageUrl } style={{width: '500px', height: 'auto'}} />
                {/* to try this out: https://samples.clarifai.com/face-det.jpg */}
                <div className='bounding-box' style={{left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow}} />
            </div>
        </div>
    );
}

export default FaceRecognition;
