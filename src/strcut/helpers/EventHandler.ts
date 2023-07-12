import { readdir } from 'fs';
import Event from '../base/Event';
import Client from '../Client';

export default class EventHandler {
    readonly dir: string

    constructor(
        private client: Client
    ) {
        this.dir = `${__dirname}/../../app/Events`
    }

    load() {
        readdir(this.dir, (err, files) => {
            if(err) return

            files.filter(f => f.endsWith('.ts') || f.endsWith('.js')).forEach(async file => {
                const event = (await import(`${this.dir}/${file}`)).default as Event
                if(event.options?.once) {
                    this.client.once(event.options.name, event.run.bind(null, this.client))
                } else {
                    this.client.on(event.options.name, event.run.bind(null, this.client))
                }
            })
        })
    }
}
