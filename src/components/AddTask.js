import { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid'

import { StateContext } from '../providers/State';

import { TextField, IconButton, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const AddTask = () => {
    const [message, setMessage] = useState('');
    const { textCheck, characterLimit, tasks, setTasks, setWarningOpen } = useContext(StateContext);

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            if (textCheck(message)) {
                addTask();
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
    const addTask = () => {
        const newTask = {
            id: uuidv4(),
            message,
            isComplete: false
        }
        setTasks([...tasks, newTask]);
        setMessage('')
    }

    return (
        <TextField autoFocus autoComplete="off" id="outlined-basic" label="Add a task" variant="outlined"
            onKeyDown={handleEnterPress} onChange={(e) => handleMessageChange(e)} value={message}
            color={message.length <= characterLimit ? 'primary' : 'error'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={addTask} disabled={!textCheck(message)}>
                            <SendIcon color={!textCheck(message) ? "default" : "primary"} />
                        </IconButton>
                    </InputAdornment>
                ),
            }} />
    );
};

export default AddTask;