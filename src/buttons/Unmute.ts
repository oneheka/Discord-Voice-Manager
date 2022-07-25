import { ButtonInteraction, Message, VoiceChannel } from 'discord.js'
import { IRoom } from '../models/Room'
import { Document } from 'mongoose'
import Button from '../struct/base/Button'

export default new Button(
    'unmute',
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

            if(member?.voice?.channelId == channel.id) await member.voice.disconnect().catch(() => {})

            Promise.all([
                await channel.permissionOverwrites.create(member.id, {Speak: true}),
                await button.editReply({content: `Вы **открыли** ротик участнику ${member.toString()}`})
            ])
        })
    }
)