import React, { useState, useContext } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './rejectdialog.css'
import { StatusContext } from '../context/StatusContext';
export default function RejectDialog({ open, handleClose }) {
    const { checkerror, setCheckError } = useContext(StatusContext);

    const [checkboxes, setCheckboxes] = useState({
        100: false,
        101: false,
        102: false,
        103: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxes((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const printSelectedCheckboxes = () => {
        const selectedCheckboxes = Object.keys(checkboxes).filter((key) => checkboxes[key]);
        console.log('Selected checkboxes:', selectedCheckboxes);
        setCheckboxes({
            100: false,
            101: false,
            102: false,
            103: false,
        })
    };
    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent >
                    <h1 className='rejecttitle'>Rejected Reasons</h1>
                    <div className='check-container'>
                        <input type="checkbox"
                            className='checbox'
                            name="100"
                            checked={checkboxes[100]}
                            onChange={handleCheckboxChange} />
                        <label className='checkerror'>"Error Lorem ipsum, dolor sit amet consectetur adipisicing." </label>
                    </div>
                    <div className='check-container'>
                        <input type="checkbox"
                            className='checbox'
                            name="101"
                            checked={checkboxes[101]}
                            onChange={handleCheckboxChange}
                        />
                        <label className='checkerror'>"Error Lorem ipsum, dolor sit amet consectetur adipisicing." </label>
                    </div>
                    <div className='check-container'>
                        <input type="checkbox"
                            className='checbox'
                            name="102"
                            checked={checkboxes[102]}
                            onChange={handleCheckboxChange} />
                        <label className='checkerror'>"Error Lorem ipsum, dolor sit amet consectetur adipisicing." </label>
                    </div>
                    <div className='check-container'>
                        <input type="checkbox"
                            className='checbox'
                            name="103"
                            checked={checkboxes[103]}
                            onChange={handleCheckboxChange} />
                        <label className='checkerror'>"Error Lorem ipsum, dolor sit amet consectetur adipisicing." </label>
                    </div>
                    {/* if you want to know what selected */}
                    {/* <ul>
                        {getSelectedCheckboxes().map((checkbox) => (
                            <li key={checkbox}>{checkbox}</li>
                        ))}
                    </ul> */}
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className='rejectcancel'>Cansel</button>
                    <button onClick={printSelectedCheckboxes} className='rejectsend'>Send</button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}