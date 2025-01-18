export type EventFormValues = {
    "name": string,
    "description": string,
    "date": string,
    "is_archived": boolean,
    "past_event_id": string,
    "theme_id": string,
    "event_managers": string[],
    "event_users": string[],
    "event_locations": string[]
}

export type EventsUsers = {
    "users": {
        "id": string,
        "name": string
    }
}

export type EventsLocations = {
    "locations": {
        "id": string,
        "name": string
    }
}

export type EventData = {
    "id": string,
    "name": string,
    "description": string,
    "date": string,
    "is_archived": boolean,
    "created_at": string,
    "updated_at": string,
    "past_event_id": string | null,
    "theme_id": string,
    "events_users": EventsUsers[],
    "events_managers": EventsUsers[],
    "events_locations": EventsLocations[]
}