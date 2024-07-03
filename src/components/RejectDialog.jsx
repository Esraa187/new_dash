import React, { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import './rejectdialog.css';
import { StatusContext } from '../context/StatusContext';

export default function RejectDialog({ open, handleClose, updateLicenseStatus, row, status }) {
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

    const printSelectedCheckboxes = (callback) => {
        const selectedCheckboxes = Object.keys(checkboxes).filter((key) => checkboxes[key]);
        setCheckError([]); // Reset checkerror state to empty array
        setCheckError(selectedCheckboxes); // Set checkerror with selected checkboxes
        handleClose(); // Close the dialog
        if (callback) callback(); // Execute the callback after the state update
        console.log('Selected checkboxes:', selectedCheckboxes);
    };

    const handleSend = () => {
        printSelectedCheckboxes(() => {
            updateLicenseStatus(row, status);
        });
    };

    useEffect(() => {
        console.log(checkerror.toString());
    }, [checkerror]);

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
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
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className='rejectcancel'>Cancel</button>
                    <button onClick={handleSend} className='rejectsend'>Send</button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
