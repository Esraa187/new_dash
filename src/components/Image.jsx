import React,{useContext} from 'react'
import './image.css'
import { useLocation } from 'react-router-dom';
import { StatusContext } from '../context/StatusContext';

function Image() {
    const { image, setImage } = useContext(StatusContext);
    const location = useLocation();
    console.log(location)
    setImage(location.state.item)
    
    return (
        <div>
            {/* <img src={image} alt="" className='details-img' /> */}
        </div>
    )
}

export default Image
