import {instance} from "../index.ts";
import {ActivityFormValues} from "../../types/activities";

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

    static create(body: ActivityFormValues) {
        return instance.post(`/activities`, body);
    }

    static update(body: {id : string, data: ActivityFormValues}) {
        return instance.patch(`/activities/${body.id}`, body.data);
    }

    static delete(body: {id: string}) {
        return instance.delete(`/activities/${body.id}`);
    }
}