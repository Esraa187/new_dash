import React, { useState } from 'react'
import { DataContext } from "./DataContext"
import logo from '../image/Untitled-21.png'
import lll from '../image/th (3).jpg'

function DataProvider(props) {
    const [data, setData] = useState([
        { id: 1, username: 'John', image: logo, phone: "+201277788076", statues: "pending" },
        { id: 2, username: 'Alice', phone: "+201221750329", statues: "pending" },
        { id: 3, username: 'Bob', phone: "+201211553622", statues: "pending" },
        { id: 4, username: 'John', phone: "+201277788076", statues: "pending" },
        { id: 5, username: 'Alice', phone: "+201221750329", statues: "pending" },
        { id: 6, username: 'Bob', phone: "+201211553622", statues: "pending" },
        { id: 7, username: 'John', phone: "+201277788076", statues: "pending" },
        { id: 8, username: 'Alice', phone: "+201221750329", statues: "pending" },
        { id: 9, username: 'Bob', phone: "+201211553622", statues: "pending" },
        { id: 10, username: 'John', phone: "+201277788076", statues: "pending" },
        { id: 11, username: 'Alice', phone: "+201221750329", statues: "pending" },
        { id: 12, username: 'Bob', phone: "+201211553622", statues: "pending" },

    ]);
    const [carData, setCarData] = useState([
        { id: 1, type: '##', model: "###", brand: '###', plate: 'xxxx', seats: '***', image: lll, LiceinesImageFront: logo, LiceinesImageBack: lll, LiceinesExpiration: "+201277788076", userid: 1, statues: "pending" },
        { id: 2, type: '###', model: "###", brand: '###', plate: 'xxxx', seats: '***', image: lll, LiceinesImageFront: logo, LiceinesImageBack: lll, LiceinesExpiration: "+201277788076", userid: 2, statues: "pending" },
    ]);
    const [personalData, setPersonalData] = useState([
        {
            id: 1, username: 'John', birthdata: "1/9/2002", gender: 'male', nationality: "###",
            address: 'usa', nationalcardimagefront: lll, nationalcardimageback: logo, profileimage: lll, createdon: "###", userid: 1, statues: "pending"
        },
    ]);
    const [tripData, setTripData] = useState([
        {
            id: 1, from: '###', to: "####", date: '###', recommendedprice: "###",
            avilableseats: 'usa', requestedseats: "###", createdon: '###', userdataid: 1, cardid: "###", statues: "pending"
        },
    ]);
    const [licenseData, setLecienceTable] = useState([
        { id: 1, imagefront: lll, imageback: logo, expiration: 'john@example.com', createdon: "###", userid: 1, statues: "pending" },
    ]);
    return (
        <DataContext.Provider value={{ data, setData, carData, setCarData, personalData, setPersonalData, tripData, setTripData, licenseData, setLecienceTable }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataProvider