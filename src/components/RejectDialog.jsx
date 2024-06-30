import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import './rejectdialog.css'
export default function RejectDialog({ open, handleClose }) {
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
                        <input type="checkbox" className='checbox' />
                        <label className='checkerror'>"Error Lorem ipsum, dolor sit amet consectetur adipisicing." </label>
                    </div>
                    <div className='check-container'>
                        <input type="checkbox" className='checbox' />
                        <label className='checkerror'>"Error Lorem ipsum, dolor sit amet consectetur adipisicing." </label>
                    </div>
                    <div className='check-container'>
                        <input type="checkbox" className='checbox' />
                        <label className='checkerror'>"Error Lorem ipsum, dolor sit amet consectetur adipisicing." </label>
                    </div>
                    <div className='check-container'>
                        <input type="checkbox" className='checbox' />
                        <label className='checkerror'>"Error Lorem ipsum, dolor sit amet consectetur adipisicing." </label>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className='rejectcancel'>Cansel</button>
                    <button onClick={handleClose} className='rejectsend'>Send</button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}