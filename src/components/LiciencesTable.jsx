import React, { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component'
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';

function LiciencesTable() {
    const [ licenseData, setLecienceTable ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
                const response = await fetch('https://vehicle-share-api.runasp.net/api/license/Admin/', {
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
                setLecienceTable(result.data);

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
    const licenseColumns = [
        { name: 'ID', selector: row => row.id, sortable: true, center: true, width: '300px' },
        { name: 'Image Front', selector: row => <img src={row.imageFront} alt={row.id} onClick={() => grow(row.imageFront)} />, center: true , width: '175px' },
        { name: 'Image Back', selector: row => <img src={row.imageBack} alt={row.id} onClick={() => grow(row.imageBack)} />, center: true, width: '175px' },
        { name: 'Expiration', selector: row => row.expiration, sortable: true, center: true },
        // Add more columns as needed
    
        { name: 'Status',selector: row => getStatusString(row.status),sortable: true, center: true, width: '120px', conditionalCellStyles: [
                { when: row => row.status === 0, style: { color: '#4199b6', fontSize: '16px', fontWeight: '700' } },
                { when: row => row.status === 1, style: { color: 'green', fontSize: '16px', fontWeight: '700' } },
                { when: row => row.status === 2, style: { color: 'red', fontSize: '16px', fontWeight: '700' } },
            ] },
        
        
    ];

    const customStyles = {
        headCells: { style: { fontSize: '16px', fontWeight: 'bold', backgroundColor: "#176B87", color: "#fff" } },
        cells: { style: { fontSize: '14px', backgroundColor: "#eee" } },
    };
    const grow=(item)=>{
        navigate('/image',{state:{item}})
    }
    const handleReject = (id) => {
        console.log(id)
        const newData = licenseData.filter(row => row.id !== id);
        setLecienceTable(newData)

    }

    return (
        <div className='user-table'>
            {/* <div className="text-end">
                <input type="text" onChange={handleFilter} />
            </div> */}
            <DataTable
                responsive={true}
                highlightOnHover={true}
                data={licenseData}
                columns={licenseColumns}
                customStyles={customStyles}
                striped={true}
                pointerOnHover={true}
                fixedHeader={true}
            />
        </div>
    )
}

export default LiciencesTable
