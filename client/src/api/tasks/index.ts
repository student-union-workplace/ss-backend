import {instance} from "../index.ts";
import {UserFormValues} from "../../types/users";

export class TasksApi {
    static get() {
        return instance.get(`/tasks`);
    }

    static getTask(body: {id: string}) {
        return instance.get(`/tasks/${body.id}`);
    }

    static create(body: UserFormValues) {
        return instance.post(`/tasks`, body);
    }

    static update(body: {id: string}) {
        return instance.post(`/tasks/${body.id}`, body);
    }

    static delete(body: {id: string}) {
        return instance.delete(`/tasks/${body.id}`);
    }
}