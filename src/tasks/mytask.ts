import { Task, TaskController } from "@ten24group/fw24";

@Task('mytask', {
    schedule: 'rate(5 minutes)',
})
export class Task1 extends TaskController {

    async initialize() {
        // register DI factories
        return Promise.resolve();
    }

    async process() {
        console.log('Hello from Task!');
        return Promise.resolve();
    }
}

export const handler = Task1.CreateHandler(Task1);
