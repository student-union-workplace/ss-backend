import { EventFormValues} from "../../../types/events";

export const ADD_EVENT_INITIAL_VALUE: EventFormValues = {
    past_event_id: '',
    name: '',
    theme_id: '',
    description: '',
    date: null,
    event_locations: [],
    event_managers: [],
    event_users: [],
    is_archived: false
}