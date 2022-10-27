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
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import {API_URL} from "./config.js"

const EditModuleButton = ({code, callFunc}) => {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")

    const handleOpen = () => {
        setOpen(true)
        setTitle("")
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleSubmit = () => {
        axios.put(API_URL, {
            moduleCode: code,
            moduleTitle: title
        }).then((response) => {
            if (response.code != 200) {
                // Pop up error message
            } 
            console.log(response.data)
        })
        handleClose();
        callFunc();
    }

    return (
        <div>
            <IconButton aria-label="Edit" onClick={handleOpen}>
                <EditRoundedIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Module Details</DialogTitle>
                <DialogContent>
                    <Grid container direction="column" justify="center" alignItems='center'>
                    <br></br>
                    <FormControl>
                        <TextField label="Module Title" variant="outlined" required={true} type={title} defaultValue='' onChange={handleTitleChange}/>
                    </FormControl>
                    <br></br>
                    </Grid>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Edit
                </Button>
                </DialogActions>
            </Dialog>       
        </div>

    );
}
export default EditModuleButton;