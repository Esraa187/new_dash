import React, { useState } from 'react'
import { StatusContext } from './StatusContext'
function StatusProvider(props) {
    const [user, setUser] = useState("")
    return (
        <StatusContext.Provider value={{ user, setUser }}>
            {props.children}
        </StatusContext.Provider>
    )
}

export default StatusProvider
