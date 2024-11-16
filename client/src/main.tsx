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
            contrastText: '#FFF'
        },
        secondary: {
            main: '#9C27B0',
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
    },
    typography: {
        fontFamily: ['Manrope'].join(','),
        body2: {
            fontSize: '24px'
        },

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
