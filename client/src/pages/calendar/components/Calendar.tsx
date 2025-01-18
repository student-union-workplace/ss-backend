import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {useQuery} from "react-query";
import {EventsApi} from "../../../api/events";
import {useMemo} from "react";
import {EventData} from "../../../types/events";

export const Calendar = () => {

    const { data: events, isLoading } = useQuery(
        ['events'],
        () => EventsApi.get({page: 1, take: 10000}),
        { refetchOnWindowFocus: false }
    );
    
     const INITIAL_EVENTS = useMemo(() => {
         if (events?.data?.data) {
             return events?.data?.data?.map((event: EventData) => (
                 {id: event.id, title: event.name, start: event.date}
             ))
         }
     }, [events?.data?.data])

    return (!isLoading && <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        height={'35rem'}
        locale={'ru'}
        firstDay={1}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        initialEvents={INITIAL_EVENTS}
    />)
}