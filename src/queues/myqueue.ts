import { Queue, QueueController } from "@ten24group/fw24";

@Queue('myqueue')
export class myqueue extends QueueController {

    async initialize() {
        // register DI factories
        return Promise.resolve();
    }

    async process(event: any, context: any) {
        const message = event.Records[0].body;
        console.log(message);
        return Promise.resolve();
    }
}

export const handler = myqueue.CreateHandler(myqueue);
