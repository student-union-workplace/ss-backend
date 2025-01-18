import {instance} from "../index.ts";
import {EventFormValues} from "../../types/events";

export class EventsApi {
    static get(body: {page: number, take: number}) {
        return instance.get(`/events?page=${body.page}&take=${body.take}`);
    }

    static getEvent(body: {id: string}) {
        return instance.get(`/events/${body.id}`);
    }

    static create(body: EventFormValues) {
        return instance.post(`/events`, body);
    }

    static delete(body: {id: string}) {
        return instance.delete(`/events/${body.id}`);
    }
}