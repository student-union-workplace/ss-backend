import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import {BrowserRouter as Router} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1DB8CA',
            light: '#F4FEFF',
            contrastText: '#FFF'
        },
        secondary: {
            main: '#F4FEFF',
        },
        error: {
            main: '#D32F2F',
        },
        warning: {
            main: '#EF6C00',
        },
        info: {
            main: '#0288D1',
        },
        success: {
            main: '#2E7D32',
        },
        action: {
            hover: '#F4FEFF'
        }
    },
    typography: {
        fontFamily: ['Manrope'].join(','),
        subtitle1: {
            fontSize: '14px',
            lineHeight: '24px',
        },
        subtitle2: {
            fontSize: '14px',
            lineHeight: '24px',
            fontWeight: '600',
        }
    }
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <ThemeProvider theme={theme}>
                <App/>
            </ThemeProvider>
        </Router>

    </StrictMode>,
)
