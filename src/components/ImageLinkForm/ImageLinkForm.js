import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {

    return (
        <div>
            <p className='f4 center' style={{textAlign: "center"}}>
                {'This fox over here is really good at detecting faces.'}
                <br></br>
                {'Just give him a url for an image, and he\'ll find any faces within.'}
            </p>
            <div className='center'>
                <div className='form pa3 br3 shadow-5 center'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}></input>
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Submit</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;
