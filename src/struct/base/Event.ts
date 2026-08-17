import type { ClientEvents } from "discord.js";
import type { Client } from "@/struct/Client";

export abstract class Event<K extends keyof ClientEvents = keyof ClientEvents> {
    public abstract readonly name: K
    public readonly once: boolean = false

    public abstract run(client: Client, ...args: ClientEvents[K]): Promise<void> | void
}