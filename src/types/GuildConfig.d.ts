import { ButtonStyle } from 'discord.js';

export interface IButton {
    emoji: string
    title: string
}

export default interface IGuildConfig {
    defaultName?: string
    message: string
    style: ButtonStyle
    channels: {
        text: string
        voice: string
        category: string
    }
    line?: string
    color: number
    dot?: string
    buttons: {
        [key: string]: IButton
    },
    placeholder: {
        user: string,
        channel: string
    }
}