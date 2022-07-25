import { ButtonInteraction, VoiceChannel } from 'discord.js'
import { IRoom } from '../models/Room'
import { Document } from 'mongoose'
import Button from '../struct/base/Button'

export default new Button(
    'unlock',
    async (
        button: ButtonInteraction,
        room: Document<unknown, any, IRoom> & IRoom & { _id: Object; },
        channel: VoiceChannel
    ) => {
        Promise.all([
            await channel.permissionOverwrites.create(button.guild.id, {Connect: true}),
            await button.reply({content: `Вы **открыли** свою комнату`, ephemeral: true})    
        ])
    }
)