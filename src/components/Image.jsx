import React from 'react'
import './image.css'
import { useLocation, useNavigate } from 'react-router-dom';

function Image() {
    const location = useLocation();
    console.log(location)
    return (
        <div>
            <img src={location.state.item} alt="" className='details-img' />
        </div>
    )
}

export default Image
