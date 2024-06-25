import React, { useState, useContext } from 'react';
import './leftsidemenu.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import { IoMdSettings } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { BiTrip } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import { FaRightToBracket } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { SideBarContext } from '../context/SideBarContext';
import { RiAdminLine } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";
import { IoChevronForwardOutline } from "react-icons/io5";
import { IoChevronDownOutline } from "react-icons/io5";
import logo from '../image/Untitled-21.png'
const LeftSideMenu = () => {
    const { show } = useContext(SideBarContext);
    const [dropdown, setDropdown] = useState(true);
    const toggleDropdown = () => {
        setDropdown(!dropdown);
    };

    return (
        <div>
            {show ? (
                <div className='left-side-menu active'>
                    <div className='project-name'>
                        <img src={logo} alt="" />
                        <span>Ride Mate</span>
                    </div>
                    <hr />
                    <ul className="menu-items">
                        <li >
                            <a >
                                <MdHome className='menu-icons' />Dashboard
                            </a>
                        </li>
                        <li onClick={toggleDropdown}>
                            <Link >
                                <IoMdSettings className='menu-icons' />Components{!dropdown ? <IoChevronForwardOutline className='open-icon' /> : <IoChevronDownOutline className='open-icon' />}
                            </Link>
                        </li>
                        {dropdown ? (
                            <ul className="dropdown-menu">
                                <li >
                                    <Link to='/table'>
                                        <FaUserAlt className='menu-icons' />Users
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/personal-data'>
                                        <FaDatabase className='menu-icons' />Personal Data
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/trip'>
                                        <BiTrip className='menu-icons' />Trips
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/car'>
                                        <FaCar className='menu-icons' />Cars
                                    </Link>
                                </li>
                                <li >
                                    <Link to='/request'>
                                        <FaRightToBracket className='menu-icons' />Requsts
                                    </Link>
                                </li>
                                <li ><Link to='/licienses'>
                                    <FaRegAddressCard className='menu-icons' />Licenes
                                </Link></li>
                            </ul>
                        ) : null}
                        <li>
                            <Link to='/table'>
                                <RiAdminLine className='menu-icons' />Admin Profile
                            </Link>
                        </li>
                        <li>
                            <Link to='/table2'>
                                <FaChartLine className='menu-icons' />Charts
                            </Link>
                        </li>
                        
                    </ul>
                </div>) : null}
        </div>
    );
};

export default LeftSideMenu;
