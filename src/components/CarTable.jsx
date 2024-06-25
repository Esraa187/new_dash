import React, { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component'
import './table.css'
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

function CarTable() {

    const [ carData,setCarData ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
                const response = await fetch('https://vehicle-share-api.runasp.net/api/car/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setCarData(result.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    });
    


    const getStatusString = (status) => {
        switch(status) {
            case 0:
                return 'pending';
            case 1:
                return 'accepted';
            case 2:
                return 'rejected';
            default:
                return '';
        }
    };


    const customStyles = {
        rows: {
            style: {
            },

        },
        headCells: {
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: "#0E46A3",
                color: "#fff",
            },
        },
        cells: {
            style: {
                fontSize: '14px',
            },
        },
    };

    const carColumns = [
        { name: 'ID', selector: row => row.id, sortable: true, center: true },
        { name: 'Type', selector: row => row.type, sortable: true, center: true },
        { name: 'Model Year', selector: row => row.modelYear, sortable: true, center: true },
        { name: 'Brand', selector: row => row.brand, sortable: true, center: true },
        { name: 'Plate', selector: row => row.plate, sortable: true, center: true },
        { name: 'Seats', selector: row => row.seats, sortable: true, center: true },
        { name: 'Image', selector: row => <img src={row.image} alt={row.id} onClick={() => grow(row.image)} />, center: true, width: '150px' },
        { name: 'License Image Front', selector: row => <img src={row.licenseImageFront} alt={row.id} onClick={() => grow(row.licenseImageFront)} />, center: true, width: '200px' },
        { name: 'License Image Back', selector: row => <img src={row.licenseImageBack} alt={row.id} onClick={() => grow(row.licenseImageBack)} />, center: true, width: '200px' },
        { name: 'License Expiration', selector: row => row.licenseExpiration, sortable: true, center: true, width: '200px' },
        {  name: 'Status',selector: row => getStatusString(row.status),sortable: true, center: true, width: '120px', conditionalCellStyles: [
           { when: row => row.status === 0, style: { color: '#4199b6', fontSize: '16px', fontWeight: '700' } },
           { when: row => row.status === 1, style: { color: 'green', fontSize: '16px', fontWeight: '700' } },
           { when: row => row.status === 2, style: { color: 'red', fontSize: '16px', fontWeight: '700' } },
       ] },
       { name: 'Actions', selector: row => (
        <div>
            <button className='accept-btn' onClick={() => updateCarStatus(row, 'accepted')}>Accept</button>
            <button className='reject-btn' onClick={() => updateCarStatus(row, 'rejected')}>Reject</button>
        </div>
    ), center: true , width: '200px' }
    ];

    const grow=(item)=>{
        navigate('/image',{state:{item}})
    }
    const navigate = useNavigate();
    const handleRowClick = (row) => {
        navigate('/details', { state: row });
    }
    const handleFilter = (e) => {
        const newData = carData.filter(row => {
            return row.username.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setCarData(newData)
    }
    const updateCarStatus = (row, status) => {
        // Update license data
        console.log('License ID ${row.id} status updated to ${status}');
    };

    return (
        <div className='user-table'>
            {/* <div className="text-end">
                <input type="text" onChange={handleFilter} />
            </div> */}
            <DataTable
                responsive={true}
                highlightOnHover={true}
                data={carData}
                columns={carColumns}
                customStyles={customStyles}
                striped={true}
                pointerOnHover={true}
                fixedHeader={true}
            />
        </div>
    )
}

export default CarTable
