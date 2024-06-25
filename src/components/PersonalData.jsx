import React, { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import './table.css';
import { useNavigate } from 'react-router-dom';

function PersonalData() {
    const [personalData, setPersonalData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
                const response = await fetch('https://vehicle-share-api.runasp.net/api/UserData/Admin/userdata/', {
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
                setPersonalData(result.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    });
    

    const customStyles = {
        rows: { style: {} },
        headCells: {
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                backgroundColor: "#0E46A3",
                color: "#fff"
            },
        },
        cells: { style: { fontSize: '14px' } },
    };

    const userColumns = [
        { name: 'ID', selector: row => row.id, sortable: true, center: true, width: "80px" },
        { name: 'Name', selector: row => row.name, sortable: true, center: true },
        { name: 'National ID', selector: row => row.nationalId, sortable: true, center: true },
        { name: 'Birthdate', selector: row => row.birthdate, sortable: true, center: true },
        { name: 'Gender', selector: row => row.gender ? 'Male' : 'Female', sortable: true, center: true },
        { name: 'Nationality', selector: row => row.nationality, sortable: true, center: true },
        { name: 'Address', selector: row => row.address, sortable: true, center: true },
        { name: 'Profile Image', selector: row => <img src={row.profileImage} alt={row.name} onClick={() => grow(row.profileImage)} />, center: true, width: '150px' }
        
    ];


    const grow = (item) => {
        navigate('/image', { state: { item } });
    };

    const handleReject = (id) => {
        console.log(id);
        const newData = personalData.filter(row => row.id !== id);
        setPersonalData(newData);
    };

    const [x, setX] = useState({});
    const handleRowClick = (row) => {
        setX(row);
    };

    const handleFilter = (e) => {
        const newData = personalData.filter(row => row.username.toLowerCase().includes(e.target.value.toLowerCase()));
        setPersonalData(newData);
    };

    return (
        <div className='user-table'>
            {/* <div className="text-end">
                <input type="text" onChange={handleFilter} />
            </div> */}
            <DataTable
                responsive={true}
                highlightOnHover={true}
                onRowClicked={handleRowClick}
                className="custom-table"
                data={personalData}
                columns={userColumns}
                customStyles={customStyles}
                striped={true}
                pointerOnHover={true}
                fixedHeader={true}
            />
        </div>
    );
}

export default PersonalData;