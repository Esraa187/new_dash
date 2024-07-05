import React, { useState, useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import './rejectdialog.css';
import { StatusContext } from '../context/StatusContext';

export default function RejectDialog({ open, handleClose, updateStatus, row, status, source }) {
    const { checkerror, setCheckError } = useContext(StatusContext);
    
    const initialCheckboxes = source === 'license' ? {
        100: false,
        101: false,
        102: false,
    } : {
        100: false,
        101: false,
        102: false,
        103: false,
    };
    const [checkboxes, setCheckboxes] = useState(initialCheckboxes);
    const [callback, setCallback] = useState(null);
  
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxes((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    // useEffect(() => {
    //     if (source === 'license') {
    //         updateStatus(row, status);
    //     } else if (source === 'personal') {
    //         updateStatus(row, status);
    //     } else if (source === 'car') {
    //         updateStatus(row, status);
    //     }
    // }, [callback]);

    const printSelectedCheckboxes = (callback) => {
        const selectedCheckboxes = Object.keys(checkboxes).filter((key) => checkboxes[key]);
        setCheckError(selectedCheckboxes); // Set check error with selected checkboxes
        handleClose(); // Close the dialog
        console.log('Selected checkboxes:', selectedCheckboxes);

        setCallback(() => callback);
        setCheckboxes(initialCheckboxes);
    };

    const handleSend = () => {
        printSelectedCheckboxes(() => {
            if (source === 'license') {
                updateStatus(row, status);
            } else if (source === 'personal') {
                updateStatus(row, status);
            } else if (source === 'car') {
                updateStatus(row, status);
            }
        });
    };

    const getLabel = (id) => {
        if (source === 'personal') {
            return {
                100: 'The face of personal card is wrong or not clear ',
                101: 'The back of personal card is wrong or not clear ',
                102: 'The national number is wrong ',
                103: 'The personal image is wrong or not clear ',
            }[id];
        } else if (source === 'license') {
            return {
                100: 'The face of the personal License is wrong or not clear',
                101: 'The back of the personal License is wrong or not clear ',
                102: 'The expiration date of personal License is wrong',
            }[id];
        } else if (source === 'car') {
            return {
                100: 'The face of the Car License is wrong or not clear ',
                101: 'The back of the Car License is wrong or not clear ',
                102: 'The expiration date of Car License is wrong ',
                103: 'The car picture is wrong or not clear ',
            }[id];
        }
        return 'Error';
    };

    const checkboxIds = source === 'license' ? [100, 101, 102] : [100, 101, 102, 103];

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
                    {checkboxIds.map((id) => (
                        <div className='check-container' key={id}>
                            <input type="checkbox"
                                className='checbox'
                                name={id.toString()}
                                checked={checkboxes[id]}
                                onChange={handleCheckboxChange} />
                            <label className='checkerror'>{getLabel(id)}</label>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className='rejectcancel'>Cancel</button>
                    <button onClick={handleSend} className='rejectsend'>Send</button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}