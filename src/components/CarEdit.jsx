import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import './useredit.css'

function CarEdit() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)
    const { carData, setCarData } = useContext(DataContext);
    const [formData, setFormData] = useState({
        id: location.state.row.id,
        type: location.state.row.type,
        model: location.state.row.model,
        brand: location.state.row.brand,
        plate: location.state.row.plate,
        seats: location.state.row.seats,
        image: location.state.row.image,
        LiceinesImageFront: location.state.row.LiceinesImageFront,
        LiceinesImageBack: location.state.row.LiceinesImageBack,
        LiceinesExpiration: location.state.row.LiceinesExpiration,
        userid: location.state.row.userid,
        statues: location.state.row.statues
    })
    const handleChange = (e) => {
        setFormData(
            { ...formData, [e.target.name]: e.target.value }
        )
    }
    const save = (e) => {
        e.preventDefault();
        const newData = [...carData];
        newData[(location.state.row.id) - 1] = formData;
        setCarData(newData);
        console.log(newData[(location.state.row.id) - 1])
        navigate("/car")
    }

    return (
        <div>
            <form className='user'>
                <div className="toghter">
                    <div>
                        <label htmlFor="">Type</label>
                        <input type="text" value={formData.type} onChange={handleChange} name='type' />
                    </div>
                    <div>
                        <label htmlFor="">Model</label>
                        <input type="text" value={formData.model} onChange={handleChange} name='model' />
                    </div>
                </div>
                <div className="toghter">
                    <div>
                        <label htmlFor="">Brand</label>
                        <input type="text" value={formData.brand} onChange={handleChange} name='brand' />
                    </div>
                    <div>
                        <label htmlFor="">Plate</label>
                        <input type="text" value={formData.plate} onChange={handleChange} name='plate' />
                    </div>
                </div>
                <div className="toghter">
                    <div>
                        <label htmlFor="">Seats</label>
                        <input type="text" value={formData.seats} onChange={handleChange} name='seats' />
                    </div>
                    <div>
                        <label htmlFor="">LiceinesExpiration</label>
                        <input type="text" value={formData.LiceinesExpiration} onChange={handleChange} name='LiceinesExpiration' />
                    </div>
                </div>
                <br /><br />
                <button onClick={save} className='save'>Save</button>
            </form>
        </div>
    )
}

export default CarEdit
