import { EventOptions, EventRun } from '../../types/base/Event';

export default class Event {
    constructor(
        public options: EventOptions,
        public run: EventRun
    ) {}
}