import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import './useredit.css'

function PersonalEdit() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location)
    const { personalData, setPersonalData } = useContext(DataContext);
    const [formData, setFormData] = useState({
        id: location.state.row.id,
        username: location.state.row.username,
        birthdata: location.state.row.birthdata,
        gender: location.state.row.gender,
        nationality: location.state.row.nationality,
        address: location.state.row.address,
        nationalcardimagefront: location.state.row.nationalcardimagefront,
        nationalcardimageback: location.state.row.nationalcardimageback,
        profileimage: location.state.row.profileimage,
        createdon: location.state.row.createdon,
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
        const newData = [...personalData];
        newData[(location.state.row.id) - 1] = formData;
        setPersonalData(newData);
        console.log(newData[(location.state.row.id) - 1])
        navigate("/personal-data")
    }

    return (
        <div>
            <form className='user'>
                <div className="toghter">
                    <div>
                        <label htmlFor="">Username</label>
                        <input type="text" value={formData.username} onChange={handleChange} name='username' />
                    </div>
                    <div>
                        <label htmlFor="">Birthdate</label>
                        <input type="text" value={formData.birthdata} onChange={handleChange} name='birthdate' />
                    </div>
                </div>
                <div className="toghter">
                    <div>
                        <label htmlFor="">Gender</label>
                        <input type="text" value={formData.gender} onChange={handleChange} name='gender' />
                    </div>
                    <div>
                        <label htmlFor="">Nationality</label>
                        <input type="text" value={formData.nationality} onChange={handleChange} name='nationality' />
                    </div>
                </div>
                <div className="toghter">
                    <div>
                        <label htmlFor="">Address</label>
                        <input type="text" value={formData.address} onChange={handleChange} name='address' />
                    </div>
                    <div>
                        <label htmlFor="">CreatedOn</label>
                        <input type="text" value={formData.createdon} onChange={handleChange} name='createdon' />
                    </div>
                </div>
                <br /><br />
                <button onClick={save} className='save'>Save</button>
            </form>
        </div>
    )
}

export default PersonalEdit
