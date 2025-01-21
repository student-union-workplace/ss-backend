import {instance} from "../index.ts";
import {EventFormValues, EventUpdateFormValues} from "../../types/events";

export class ActivitiesApi {
    static get(body: {year: string}) {
        return instance.get(`/activities?year=${body.year}`);
    }

    static getEvent(body: {id: string}) {
        return instance.get(`/activities/${body.id}`);
    }

    static changeStatus(body: {id: string}) {
        return instance.patch(`/activities/${body.id}/changeStatus`);
    }

    static create(body: EventFormValues) {
        return instance.post(`/activities`, body);
    }

    static update(body: {id : string, data: EventUpdateFormValues}) {
        return instance.patch(`/activities/${body.id}`, body.data);
    }

    static delete(body: {id: string}) {
        return instance.delete(`/activities/${body.id}`);
    }
}