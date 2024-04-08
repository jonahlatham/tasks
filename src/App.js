import './App.css';
import React, { useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { StateContext } from './providers/State';

import TasksContainer from './components/TasksContainer';
import AddTask from './components/AddTask';
import EditDialog from './components/EditDialog';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { Stack, Snackbar, Alert } from '@mui/material';

function App() {
  const { theme, characterLimit, warningOpen, setWarningOpen } = useContext(StateContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Stack padding='20px' spacing={5} direction="column" margin='auto' maxWidth='600px'>
            <AddTask />
            <TasksContainer />
            <EditDialog />
            <Snackbar open={warningOpen} autoHideDuration={5000} onClose={() => setWarningOpen(false)}>
              <Alert onClose={() => setWarningOpen(false)} severity='warning'>
                <strong>You've reached your character limit.</strong> <br />
                <small>You're not that important. Keep it to {characterLimit} characters.</small>
              </Alert>
            </Snackbar>
          </Stack>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;