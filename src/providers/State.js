import React, { createContext, useState } from 'react';
import { createTheme } from '@mui/material/styles';

export const StateContext = createContext({});
export const StateProvider = (props) => {
    const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#1976d2',
                default: '#333333',
                error: '#f44336',
                warning: '#ff9800',
                success: '#4caf50'
            },
            background: {
                default: '#000000'
            }
        },
    });
    const characterLimit = 50;

    const [tasks, setTasks] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [warningOpen, setWarningOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editItem, setEditItem] = useState(null);

    const textCheck = (text) => {
        const regex = /[^\s\r\n]/;
        return text && text.length <= characterLimit && text.length >= 1 && regex.test(text)
    }

    return (
        <StateContext.Provider
            value={{
                theme,
                characterLimit,
                tasks,
                setTasks,
                completed,
                setCompleted,
                warningOpen,
                setWarningOpen,
                editOpen,
                setEditOpen,
                editItem,
                setEditItem,
                textCheck
            }}
        >
            {props.children}
        </StateContext.Provider>
    );
};