import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import {useQuery} from "react-query";
import {EventsApi} from "../../../api/events";
import {useMemo} from "react";
import {EventData} from "../../../types/events";
import {ActivitiesApi} from "../../../api/activities";

type CalendarProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const Calendar = ({ setOpen}: CalendarProps) => {

    const { data: events, isLoading: isLoadingEvents } = useQuery(
        ['events'],
        () => EventsApi.get({page: 1, take: 10000}),
        { refetchOnWindowFocus: false }
    );

    const { data: activities, isLoading: isLoadingActivities } = useQuery(
        ['activities'],
        () => ActivitiesApi.get({year: '2025'}),
        { refetchOnWindowFocus: false }
    );
    
     const INITIAL_EVENTS = useMemo(() => {
         if (events?.data?.data && activities?.data) {
             const eventsData = events?.data?.data?.map((event: EventData) => (
                 {id: event.id, title: event.name, start: new Date(event.date), backgroundColor: '#1DB8CA', borderColor: '#1DB8CA', display: 'block'}
             ))

             const activitiesData = activities?.data?.map((event: EventData) => (
                 {id: event.id, title: event.name, start: new Date(event.date), backgroundColor: '#1DB8CA'}
             ))

             return [...eventsData, ...activitiesData]
         }
     }, [activities?.data, events?.data?.data])

    const isLoading = isLoadingEvents || isLoadingActivities

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
        buttonText={{
            today:    'Сегодня',
            month:    'Месяц',
            week:     'Неделя',
            day:      'День',
            list:     'Лист'
        }}
        customButtons={{
            addActivity: {
                text: 'Добавить событие',
                click: () => setOpen(true),

            }
        }}
        headerToolbar={{
            left: 'dayGridMonth,timeGridWeek,timeGridDay',
            center: 'title',
            right: 'prev,next addActivity'
        }}
    />)
}