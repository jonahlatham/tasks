import React, { useContext } from 'react';
import { StateContext } from '../providers/State';

import { Stack, Typography, IconButton } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import UndoIcon from '@mui/icons-material/Undo';
import CheckIcon from '@mui/icons-material/Check';

const TaskItem = ({ task, handleOpenEdit, deleteTask, updateTaskCompletion }) => {
    const { theme } = useContext(StateContext);

    return (
        <Stack padding='10px' spacing={2} direction="row" justifyContent='space-between' alignItems='center' sx={{ boxShadow: `0 0 0 1px ${task?.isComplete ? theme.palette.primary.success : theme.palette.primary.default}`, borderRadius: '4px' }}>
            <Stack>
                <IconButton aria-label="edit" onClick={() => handleOpenEdit(task)}>
                    <EditIcon color="warning" />
                </IconButton>
            </Stack>

            <Typography variant="body2" component="div">
                {task?.message}
            </Typography>

            <Stack spacing={1} direction="row">
                <IconButton aria-label="delete" onClick={() => deleteTask(task)}>
                    <DeleteIcon color="error" />
                </IconButton>
                <IconButton aria-label="complete" onClick={() => updateTaskCompletion(task)}>
                    {task?.isComplete ? <UndoIcon color="warning" /> : <CheckIcon color="success" />}
                </IconButton>
            </Stack>
        </Stack>
    );
};

export default TaskItem;