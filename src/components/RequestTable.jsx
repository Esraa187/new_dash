import React, { useState } from 'react'
import DataTable from 'react-data-table-component'

function RequestTable() {
    const [data, setdata] = useState([
        { id: 1, status: 'John', seats: "+201277788076", createdon:"###",userdataid:"1",tripid: 'john@example.com',statues:"pending" },
    ]);
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
                color: "#fff"
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
            name: 'id',
            selector: row => row.id,
            sortable: true,
            center: true,
            width:"80px"
        },
        {
            id: "status",
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            center: true
        },
        {
            id: "seats",
            name: 'Seats',
            selector: row => row.seats,
            sortable: true,
            center: true

        },
        {
            id: "createdon",
            name: 'CreatedOn',
            selector: row => row.createdon,
            sortable: true,
            center: true,
            width:"150px"


        },
        {
            id: "userdataid",
            name: 'UserDataId',
            selector: row => row.userdataid,
            sortable: true,
            center: true

        },
        {
            id: "tripid",
            name: 'TripId',
            selector: row => row.tripid,
            sortable: true,
            center: true

        },
        {
            id: "statues",
            name: 'Statues',
            selector: row => row.statues,
            sortable: true,
            center: true,
            conditionalCellStyles : [
                {
                    when: row => row.statues === "pending",
                    style: {
                        color: '#4199b6',
                        fontSize: '16px',
                        fontWeight:"700"
                    },
                },
                {
                    when: row => row.statues === "accepted",
                    style: {
                        color: 'green',
                        fontSize: '16px',
                        fontWeight:"700"
                    },
                },
                {
                    when: row => row.statues === "rejected",
                    style: {
                        color: 'red',
                        fontSize: '16px',
                        fontWeight:"700"
                    },
                },
                
            ],
        },
    ];
    const handleReject = (id) => {
        console.log(id)
        const newData = data.filter(row => row.id !== id);
        setdata(newData)

    }

    return (
        <div className='user-table'>
            {/* <div className="text-end">
                <input type="text" onChange={handleFilter} />
            </div> */}
            <DataTable
                responsive={true}
                highlightOnHover={true}
                data={data}
                columns={columns}
                customStyles={customStyles}
                striped={true}
                pointerOnHover={true}
                fixedHeader={true}
            />
        </div>
    )
}

export default RequestTable
