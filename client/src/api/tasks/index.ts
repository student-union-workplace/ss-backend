import {instance} from "../index.ts";
import {TaskFormValues} from "../../types/tasks";

export class TasksApi {
    static get() {
        return instance.get(`/tasks`);
    }

    static getTask(body: {id: string}) {
        return instance.get(`/tasks/${body.id}`);
    }

    static create(body: TaskFormValues) {
        return instance.post(`/tasks`, body);
    }

    static update(body: {id: string, data: TaskFormValues}) {
        return instance.patch(`/tasks/${body.id}`, body.data);
    }

    static delete(body: {id: string}) {
        return instance.delete(`/tasks/${body.id}`);
    }
}