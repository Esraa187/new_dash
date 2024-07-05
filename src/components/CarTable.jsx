import React, { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import './table.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import RejectDialog from './RejectDialog';
import { Dialog, DialogContent } from '@mui/material';
import { StatusContext } from "../context/StatusContext";

function CarTable() {
    const { checkerror } = useContext(StatusContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openimg, setOpenImg] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [status, setStatus] = useState(null);
  
    const handleOpen = (row, status) => {
        setSelectedRow(row);
        setStatus(status);
        setOpen(true);
    };
    const handleCloseImg = () => {
        setOpenImg(false);
        setSelectedImage(null);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        updateCarStatus(selectedRow, status);
    }, [checkerror]);

    const [carData, setCarData] = useState([]);

    const fetchCarData = async () => {
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

    useEffect(() => {
        fetchCarData();
    }, []);


    const getStatusString = (status) => {
        switch (status) {
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
        {
            name: 'Status', selector: row => getStatusString(row.status), sortable: true, center: true, width: '120px', conditionalCellStyles: [
                { when: row => row.status === 0, style: { color: '#4199b6', fontSize: '16px', fontWeight: '700' } },
                { when: row => row.status === 1, style: { color: 'green', fontSize: '16px', fontWeight: '700' } },
                { when: row => row.status === 2, style: { color: 'red', fontSize: '16px', fontWeight: '700' } },
            ]
        },
        {
            name: 'Actions', selector: row => (
                <div>
                    <button className='accept-btn' onClick={() => updateCarStatus(row, 1)}>Accept</button>
                    <button className='reject-btn'  onClick={() => handleOpen(row, 2)}>Reject</button>
                </div>
            ), center: true, width: '200px'
        }
    ];

    const grow = (item) => {
        setOpenImg(true)
        setSelectedImage(item)
    };
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
    const updateCarStatus = async (row, Status) => {
        try {
            const carId = row.id;
            const userDataId = row.userDataId;
            console.log(`Car ID ${carId} status updated to ${getStatusString(Status)} : ${typeof (Status)} `);
            const token = Cookies.get('token');

            const requestBody = { status: Status };
            if (Status === 2) {
                let error = checkerror.toString(); // Use checkerror from the context
                requestBody.message = error;
                console.log(`The error is: ${error}`);
                
            }
            else {
                alert(`Successfully updated status to: ${getStatusString(Status)} for Car ID ${carId}`);
            }    
            const response = await fetch(`https://vehicle-share-api.runasp.net/api/Car/Admin/${carId}`, {
                method: 'Put', // or 'PUT' based on your API design
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody), // Send the status in the request body
            });

            if (!response.ok) {
                throw new Error(`Failed to update status: ${response.statusText}`);
            }
            await fetchCarData(userDataId);

        } catch (error) {
            console.error('Error updating car status:', error);
        }
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
            <RejectDialog 
                open={open} 
                handleClose={handleClose} 
                updateStatus={updateCarStatus} 
                row={selectedRow} 
                status={status} 
                source="car"
      />
            <Dialog open={openimg} onClose={handleCloseImg}  >
                <DialogContent>
                    {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: "500px", height: "500px" }} />}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CarTable
