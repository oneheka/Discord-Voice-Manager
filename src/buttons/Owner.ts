import { ButtonInteraction, Message, VoiceChannel } from 'discord.js'
import Room, { IRoom } from '../models/Room'
import { Document } from 'mongoose'
import Button from '../struct/base/Button'

export default new Button(
    'owner',
    async (
        button: ButtonInteraction,
        room: Document<unknown, any, IRoom> & IRoom & { _id: Object; },
        channel: VoiceChannel
    ) => {                    
        await button.reply({content: 'Укажите участника', ephemeral: true})
                    
        const filter = (m: Message) => m.author.id === button.user.id
        const collector = button.channel.createMessageCollector({filter: filter, time: 30000, max: 1 })

        collector.on('collect', async (m: Message): Promise<any> => {
            const member = button.guild.members.cache.get(m.content) || m.mentions?.members?.first()

            if(!member || member.id == button.user.id || member.user.bot) return button.editReply({content: 'Участник **не был** найден'})
            if(!member?.voice?.channel) return button.editReply({content: 'Участник находится **не в голосовом** канале'})
            if(member.voice.channel.id !== room.channelId) return button.editReply({content: 'Участник находится **не в вашем** приватном канале'})

            const res = (
                await Room.findOne({guildId: button.guild.id, userId: member.id}) ??
                await Room.findOne({guildId: button.guild.id, userId: member.id, channelId: room.channelId})
            )

            res.channelId = member.voice.channel.id 
            room.channelId = '0'

            Promise.all([
                await res.save(),
                await room.save(),
                await button.editReply({content: `Участнику ${member.toString()} были переданы **права** на комнату`})
            ])
        })
    }
)