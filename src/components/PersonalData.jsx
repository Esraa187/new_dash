import React, { useState, useEffect, useContext } from 'react';
import DataTable from 'react-data-table-component';
import './table.css';
import Cookies from 'js-cookie';
import RejectDialog from './RejectDialog';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '@mui/material';

function PersonalData() {
    const [personalData, setPersonalData] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [openimg, setOpenImg] = useState(false);
    const handleCloseImg = () => {
        setOpenImg(false);
        setSelectedImage(null);
    };
    const handleClose = () => {
        setOpen(false);
    };
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

    useEffect(() => {
        fetchData();
    }, []);

    const getStatusString = (status) => {
        switch (status) {
            case 0:
                return 'Pending';
            case 1:
                return 'Accepted';
            case 2:
                return 'Rejected';
            default:
                return '';
        }
    };


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
        { name: 'Profile Image', selector: row => <img src={row.profileImage} alt={row.name} onClick={() => grow(row.profileImage)} />, center: true, width: '150px' },
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
                    <button className='accept-btn' onClick={() => updateUserDataStatus(row, 1)}>Accept</button>
                    <button className='reject-btn' onClick={() => updateUserDataStatus(row, 2)}>Reject</button>
                </div>
            ), center: true, width: '200px'
        }
    ];

    const updateUserDataStatus = async (row, Status) => {
        try {
            const userDataId = row.id;
            console.log(`User data ID is : ${userDataId} , status is : ${getStatusString(Status)}`);
            const token = Cookies.get('token');

            const requestBody = { status: Status };

            if (Status === 2) {
                setOpen(true);
                requestBody.message = `userdata ID  has been refused.`;
            }
            else {
             alert(`Successfully updated status to: ${getStatusString(Status)} for Userdata ID :  ${userDataId}`);
            }

            const response = await fetch(`https://vehicle-share-api.runasp.net/api/UserData/Admin/${userDataId}`, {
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
            await fetchData();


        } catch (error) {
            console.error('Error updating license status:', error);
        }
    };

    const grow = (item) => {
        setOpenImg(true)
        setSelectedImage(item)
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
          <RejectDialog open={open} handleClose={handleClose} />

        <Dialog open={openimg} onClose={handleCloseImg}  >
            <DialogContent>
                {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: "500px", height: "500px" }} />}
            </DialogContent>
        </Dialog>
        </div>
    );
}

export default PersonalData;