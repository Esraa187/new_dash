import React, { useState } from 'react'
import { SideBarContext } from './SideBarContext'
function SideBarProvider(props) {
    const [show, setShow] = useState(true)
    return (
        <SideBarContext.Provider value={{ show, setShow }}>
            {props.children}
        </SideBarContext.Provider>
    )
}

export default SideBarProvider
