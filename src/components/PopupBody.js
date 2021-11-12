import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function PopupBody({openPopup,title,form}) {
    return (
        <Dialog open={openPopup}maxWidth="md" >
            <DialogTitle>
                <div>{title}</div>
            </DialogTitle>
            <DialogContent dividers >
                {form}
            </DialogContent>
        </Dialog>
    )
}