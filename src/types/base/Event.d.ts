import { Awaitable } from 'discord.js';
import Client from '../../strcut/Client';

export interface IEvent {
    options: EventOptions
    run: EventRun
}

export interface EventOptions {
    name: string
    once?: boolean
}

export type EventRun = (client: Client, ...args: any[]) => Awaitable<void>