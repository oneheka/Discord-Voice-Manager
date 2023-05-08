import { Awaitable, ButtonInteraction, ModalSubmitInteraction, CommandInteraction } from 'discord.js';

import { TRoom } from '../../database/room/Room'
import Client from '../Client'
import IGuildConfig from '../GuildConfig'

export interface IInteraction {
    name: string
    run: ButtonRun | ModalRun
}

export type InteractionDirName = 'Buttons' | 'Modals' | 'Commands'

export type ButtonRun = (client: Client, interaction: ButtonInteraction<'cached'>, config: IGuildConfig) => Awaitable<void>
export type ModalRun = (client: Client, interaction: ModalSubmitInteraction<'cached'>, config: IGuildConfig, res?: Setting, room: Room) => Awaitable<void>
export type CommandRun = (client: Client, interaction: CommandInteraction<'cached'>) => Awaitable<void>