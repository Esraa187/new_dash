import React, { useState } from 'react'
import { StatusContext } from './StatusContext'
function StatusProvider(props) {
    const [user, setUser] = useState("")
    const [image, setImage] = useState("")
    const [checkerror, setCheckError] = useState([])


    return (
        <StatusContext.Provider value={{ user, setUser,image, setImage, checkerror, setCheckError}}>
            {props.children}
        </StatusContext.Provider>
    )
}

export default StatusProvider
