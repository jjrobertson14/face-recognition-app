import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box, imageUrl }) => {
    return (
        <div className='center ma'>
            <div className='absolute, mt2, relative'>
                <img id='input-image' alt='' src={ imageUrl } style={{width: '500px', height: 'auto'}} />
                {/* urls to try this out with: 
                https://samples.clarifai.com/face-det.jpg 
                https://media.self.com/photos/5b64a1ee56b2e2706f75579f/4:3/w_752,c_limit/bo-bridges-bike-shot.jpg
                https://s3-us-west-2.amazonaws.com/flx-editorial-wordpress/wp-content/uploads/2019/07/08154231/700JW3.jpg
                */}
                <div className='bounding-box' style={{left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow}} />
            </div>
        </div>
    );
}

export default FaceRecognition;