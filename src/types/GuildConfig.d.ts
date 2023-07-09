import { ButtonStyle, ColorResolvable } from 'discord.js';

export interface IButton {
    title: string
}

export default interface IGuildConfig {
    defaultName?: string
    style: ButtonStyle
    line?: boolean
    color: ColorResolvable
    dot?: boolean
    buttons: {
        [key: string]: IButton
    },
    placeholder: {
        user: string,
        channel: string
    }
}