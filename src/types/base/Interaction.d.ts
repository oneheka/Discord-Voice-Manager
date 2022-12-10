import { Awaitable, ButtonInteraction, ModalSubmitInteraction } from 'discord.js';

import { TRoom } from '../../database/room/Room'
import Client from '../Client'
import IGuildConfig from '../GuildConfig'

export interface IInteraction {
    name: string
    run: ButtonRun | ModalRun
}

export type InteractionDirName = 'Buttons' | 'Modals'

export type ButtonRun = (client: Client, interaction: ButtonInteraction<'cached'>, config: IGuildConfig) => Awaitable<void>
export type ModalRun = (client: Client, interaction: ModalSubmitInteraction<'cached'>, config: IGuildConfig, res?: TRoom) => Awaitable<void>