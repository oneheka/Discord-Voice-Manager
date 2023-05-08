import { ApplicationCommandDataResolvable } from 'discord.js';
import { ButtonRun, CommandRun, ModalRun } from '../../types/base/Interaction';

export default class Interaction {
    constructor(
        public name: string,
        public run: (ButtonRun | ModalRun | CommandRun),
        public options?: ApplicationCommandDataResolvable
    ) {}
}