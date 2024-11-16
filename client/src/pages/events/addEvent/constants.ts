import { EventFormValues} from "../../../types/events";

export const ADD_EVENT_INITIAL_VALUE: EventFormValues = {
    lastEvent: '',
    title: '',
    theme: '',
    description: '',
    date: new Date(),
    place: [],
    responsible: [],
    team: []
}