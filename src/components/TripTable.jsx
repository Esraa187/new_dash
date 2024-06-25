import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

function TripTable() {
    const [tripData, setTripData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
                const response = await fetch('https://vehicle-share-api.runasp.net/api/trip/Admin/', {
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
                // Transform data to include combined 'from' and 'to' fields
                const transformedData = result.data.map(trip => ({
                    ...trip,
                    from: `${trip.fromLatitude}, ${trip.fromLongitude}`,
                    to: `${trip.toLatitude}, ${trip.toLongitude}`,
                }));
                setTripData(transformedData);
                console.log(transformedData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    
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

    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true, center: true, width: "80px" },
        { name: 'From', selector: row => row.from, sortable: true, center: true },
        { name: 'To', selector: row => row.to, sortable: true, center: true },
        { name: 'Date', selector: row => row.date, sortable: true, center: true },
        { name: 'Recommended Price', selector: row => row.recommendedPrice, sortable: true, center: true, width: "200px" },
        { name: 'Available Seats', selector: row => row.availableSeats, sortable: true, center: true, width: "200px" },
        { name: 'Requested Seats', selector: row => row.requestedSeats, sortable: true, center: true, width: "200px" },
        { name: 'Created On', selector: row => row.createdOn, sortable: true, center: true, width: "150px" },
        { name: 'Is Finished', selector: row => row.isFinished ? 'true' : 'false', sortable: true, center: true, width: "150px" },
        { name: 'User Data ID', selector: row => row.userDataId, sortable: true, center: true, width: "150px" },
        { name: 'Car ID', selector: row => row.carId, sortable: true, center: true },
       
    ];

    const handleReject = (id) => {
        console.log(id);
        const newData = tripData.filter(row => row.id !== id);
        setTripData(newData);
    }

    const [x, setX] = useState({});
    const handleRowClick = (row) => {
        setX(row);
    }

    const handleFilter = (e) => {
        const newData = tripData.filter(row => {
            return row.username.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setTripData(newData);
    }

    return (
        <div className='user-table'>
            {/* <div className="text-end">
                <input type="text" onChange={handleFilter} />
            </div> */}
            <DataTable
                responsive={true}
                highlightOnHover={true}
                className="custom-table"
                data={tripData}
                columns={columns}
                customStyles={customStyles}
                striped={true}
                pointerOnHover={true}
                fixedHeader={true}
                onRowClicked={handleRowClick}
            />
        </div>
    );
}

export default TripTable;