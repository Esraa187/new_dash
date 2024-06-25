import React, { useContext, useState } from 'react'
import { SideBarContext } from '../context/SideBarContext';
import { IoMenu } from "react-icons/io5";
import './header.css'
import { MdNotifications } from "react-icons/md";
import FormDialog from './FormDialog';
import { StatusContext } from '../context/StatusContext';

function Header() {
    const { user } = useContext(StatusContext);

    const { show, setShow } = useContext(SideBarContext);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleClickOpen = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };
    return (
        <div className='navbar'>
            <IoMenu onClick={() => { setShow(!show) }} className='toggle-icon' />
            <MdNotifications className='notification' />
            <button className='login' >
                {user}
            </button>
            <FormDialog open={dialogOpen} handleClose={handleClose} />
        </div>
    )
}

export default Header
