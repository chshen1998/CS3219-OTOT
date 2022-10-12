import {useState, useEffect} from 'react';
import axios from "axios";
import {Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import IconButton from '@material-ui/core/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import {API_URL} from "./config.js"

const DeleteModuleButton = ({code, callFunc}) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        axios.delete(API_URL+code).then((response) => {
            if (response.code != 200) {
                // Pop up error message
            } 
            console.log(response.data)
            handleClose();
            callFunc();
        })
    }

    return (
        <div>
            <IconButton aria-label="Delete" onClick={handleOpen}>
                <DeleteRoundedIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Delete Module</DialogTitle>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="primary">
                    Confirm
                </Button>
                </DialogActions>
            </Dialog>       
        </div>
    );
}
export default DeleteModuleButton;