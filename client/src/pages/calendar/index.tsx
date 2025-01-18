import {Box} from "@mui/material";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export const CalendarPage = () => {
    return <Box className={'content'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '1900px',
                    minHeight: '100%',
                    flexGrow: 1
                }}>
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            height={'35rem'}
            locale={'ru'}
            firstDay={1}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true} 
        />
    </Box>
}