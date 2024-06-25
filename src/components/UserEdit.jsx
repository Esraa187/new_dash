import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import './useredit.css'

function UserEdit() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location)
  const { data, setData } = useContext(DataContext);
  const [formData, setFormData] = useState({
    id: location.state.row.id,
    username: location.state.row.username,
    phone: location.state.row.phone,
    image: location.state.row.image,
    statues: location.state.row.statues,
  })
  const handleChange = (e) => {
    setFormData(
      { ...formData, [e.target.name]: e.target.value }
    )
  }
  const save = (e) => {
    e.preventDefault();
    const newData = [...data];
    newData[(location.state.row.id) - 1] = formData;
    setData(newData);
    console.log(newData[(location.state.row.id) - 1])
    navigate("/table")
  }

  return (
    <div>
      <form className='user'>
        <label htmlFor="">Username</label>
        <input type="text" value={formData.username} onChange={handleChange} name='username' /><br /><br />
        <label htmlFor="">Phone</label>
        <input type="text" onChange={handleChange} value={formData.phone} name='phone' /><br /><br />
        <button onClick={save} className='save'>Save</button>
      </form>
    </div>
  )
}

export default UserEdit
