import { Logger } from "@/struct/utils/Logger";
import type { Event } from "@/struct/base/Event";
import type { Client } from "@/struct/Client";
import { readdirSync } from "fs";
import { join } from "path";

export class EventHandler {
    public static async loadEvents(client: Client): Promise<void> {
        const eventsDir = join(import.meta.dir, '../../app/Events')
        const files = readdirSync(eventsDir).filter((file) => file.endsWith('.ts') || file.endsWith('.js'))

        for (const file of files) {
            const eventModule = await import(join(eventsDir, file))
            const EventClass = eventModule.default || eventModule[Object.keys(eventModule)[0]]

            if (EventClass && typeof EventClass === 'function') {
                const event: Event = new EventClass()
                if (event.once) {
                    client.once(event.name, (...args) => event.run(client, ...args))
                } else {
                    client.on(event.name, (...args) => event.run(client, ...args))
                }
                Logger.event(event.name)
            }
        }
    }
}