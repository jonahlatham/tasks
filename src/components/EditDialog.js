import { useState, useContext } from 'react';

import { StateContext } from '../providers/State';

import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button } from '@mui/material';

const EditDialog = () => {
    const [message, setMessage] = useState('');
    const { textCheck, characterLimit, setWarningOpen, editItem, setEditItem, editOpen, setEditOpen, tasks, setTasks } = useContext(StateContext);

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (textCheck(message)) {
                updateTask();
            }
        }
    };
    const handleMessageChange = (e) => {
        const val = e.target.value;
        if (val.indexOf('\n') !== -1) {
            return;
        } else if (val.length <= characterLimit) {
            setMessage(val);
        } else {
            setWarningOpen(true);
            setMessage(val);
        }
    };
    const updateTask = () => {
        const newTasks = tasks.map(e => {
            if (e?.id === editItem?.id) { e.message = message }
            return e;
        })
        setTasks(newTasks)
        closeEditModal()
    }
    const closeEditModal = () => {
        setEditOpen(false)
        setEditItem(null)
        setMessage('')
    }

    return (
        <Dialog open={editOpen} onClose={closeEditModal}>
            <DialogTitle>Edit {editItem?.message}</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin='dense' fullWidth autoComplete="off" label="Task text" value={message}
                    onKeyDown={handleEnterPress} onChange={(e) => handleMessageChange(e)}
                    color={message?.length <= characterLimit ? 'primary' : 'error'}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeEditModal}>Cancel</Button>
                <Button onClick={updateTask} disabled={!textCheck(message)}>Save</Button>
            </DialogActions>
        </Dialog>
    )
};

export default EditDialog;