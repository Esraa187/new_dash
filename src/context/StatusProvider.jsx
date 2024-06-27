import React, { useState } from 'react'
import { StatusContext } from './StatusContext'
function StatusProvider(props) {
    const [user, setUser] = useState("")
    const [image, setImage] = useState("")

    return (
        <StatusContext.Provider value={{ user, setUser,image, setImage }}>
            {props.children}
        </StatusContext.Provider>
    )
}

export default StatusProvider
