import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { json } from 'react-router-dom';

const MyComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData(); // Fetch data when the component mounts
    }, []);

    const fetchData = async () => {
        try {
            // Fetch data from your API endpoint
            const response = await fetch('https://dummyjson.com/products');
            const jsonData = await response.json();
            console.log(jsonData)
            setData(jsonData.products); // Update state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const columns = [
        {
            id: "id",
            name: 'id',
            selector: row => row.id,
            sortable: true,
            center: true,
            width: "80px"

        },
        {
            id: "username",
            name: 'Username',
            selector: row => row.title,
            sortable: true,
            center: true
        },
        {
            id: "username",
            name: 'xxx',
            selector: row => <img src={row.thumbnail} alt="" />,
            sortable: true,
            center: true
        },
        

    ];
    const ss = () => {
        console.log(data)
    }
    return (
        <div>
            <DataTable
                data={data}
                columns={columns}
            />
            <button onClick={ss}>sava</button>
        </div>
    );
};

export default MyComponent;
