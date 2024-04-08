import React, { useContext } from 'react';

import { StateContext } from '../providers/State';
import TaskItem from './TaskItem';

import { Stack, Alert, Typography, } from '@mui/material';

const TasksContainer = () => {
    const { tasks, setTasks, completed, setCompleted, setEditOpen, setEditItem } = useContext(StateContext);

    const updateTaskCompletion = (task) => {
        if (task.isComplete) {
            setCompleted((prevCompleted) => prevCompleted.filter((e) => e.id !== task.id));
            setTasks((prevTasks) => [...prevTasks, { ...task, isComplete: false }]);
        } else {
            setTasks((prevTasks) => prevTasks.filter((e) => e.id !== task.id));
            setCompleted((prevCompleted) => [...prevCompleted, { ...task, isComplete: true }]);
        }
    };
    const deleteTask = (task) => {
        if (task?.isComplete) {
            const newTasks = completed.filter(e => e.id !== task?.id)
            setCompleted(newTasks)
        } else {
            const newTasks = tasks.filter(e => e.id !== task?.id)
            setTasks(newTasks)
        }
    }
    const handleOpenEdit = (item) => {
        setEditOpen(true);
        setEditItem(item);
    }

    return (
        <>
            <Stack spacing={2}>
                <Typography variant="body1">To do:</Typography>
                {tasks?.length >= 1 ?
                    <Stack spacing={2} direction="column">
                        {tasks?.map((e, i) => {
                            return (<div key={i}>
                                <TaskItem
                                    task={e}
                                    handleOpenEdit={handleOpenEdit}
                                    deleteTask={deleteTask}
                                    updateTaskCompletion={updateTaskCompletion}
                                />
                            </div>)
                        })
                        }
                    </Stack>
                    :
                    <Alert severity="info">
                        Looks like you're all caught up for now.
                        Feel free to use the text field above to add new tasks and keep the momentum going!
                    </Alert>
                }
            </Stack>

            {completed?.length >= 1 ?
                <Stack spacing={2} direction="column">
                    <Typography variant="subtitle1">Completed:</Typography>
                    {completed?.map((e, i) => {
                        return (<div key={i}>
                            <TaskItem
                                task={e}
                                handleOpenEdit={handleOpenEdit}
                                deleteTask={deleteTask}
                                updateTaskCompletion={updateTaskCompletion}
                            />
                        </div>)
                    })
                    }
                </Stack> : ''
            }
        </>
    );
};

export default TasksContainer;