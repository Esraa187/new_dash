import React, { useState, useContext, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import './table.css';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

function Table() {
    const navigate = useNavigate();
    const { carData, tripData, personalData, licenseData, data, setData } = useContext(DataContext);
    
    const customStyles = {
        rows: {
            style: {},
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

    const columns = [
        {
            id: "id",
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            center: true,
            width: "300px",
        },
        {
            id: "username",
            name: 'Username',
            selector: row => row.userName,
            sortable: true,
            center: true,
        },
        {
            id: "phone",
            name: 'Phone',
            selector: row => row.phone,
            sortable: true,
            center: true,
        },
    ];


    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);

    const handleRowClick = (row) => {
        const newCarData = carData.filter((item) => item.userid === row.id);
        const newPersonalData = personalData.filter((item) => item.userid === row.id);
        const newTripData = tripData.filter((item) => item.userdataid === row.id);
        const newLicenseData = licenseData.filter((item) => item.userid === row.id);

        navigate('/details', { state: { row, car: newCarData, personal: newPersonalData, trip: newTripData, license: newLicenseData } });
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
            try {
                const response = await fetch('https://vehicle-share-api.runasp.net/api/User/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                setData(result.data);
                setFilter(result.data);  // Initialize filter state with fetched data
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [setData]);

    useEffect(() => {
        const result = data.filter((item) => {
            return item.userName && item.userName.toLowerCase().includes(search.toLowerCase());
        });
        setFilter(result);
    }, [search, data]);

    return (
        <div className='user-table'>
            <DataTable
                responsive={true}
                highlightOnHover={true}
                onRowClicked={handleRowClick}
                className="custom-table"
                data={filter}
                columns={columns}
                customStyles={customStyles}
                striped={true}
                pointerOnHover={true}
                fixedHeader={true}
                pagination
                subHeader
                subHeaderComponent={
                    <input
                        type="text"
                        placeholder="Search..."
                        className='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }
                subHeaderAlign="left"
            />
        </div>
    );
}

export default Table;
