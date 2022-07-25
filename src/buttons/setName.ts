import { ButtonInteraction, Message, VoiceChannel } from 'discord.js'
import { IRoom } from '../models/Room'
import { Document } from 'mongoose'
import Button from '../struct/base/Button'

export default new Button(
    'name',
    async (
        button: ButtonInteraction,
        room: Document<unknown, any, IRoom> & IRoom & { _id: Object; },
        channel: VoiceChannel
    ) => {
        if(room.cooldown > Date.now()) return await button.reply({content: `Попробуйте <t:${Math.round(room.cooldown/1000)}:R>`, ephemeral: true})
                    
        await button.reply({content: 'Укажите новое название канала', ephemeral: true})
                    
        const filter = (m: Message) => m.author.id === button.user.id
        const collector = button.channel.createMessageCollector({filter: filter, time: 30000, max: 1 })

        collector.on('collect', async (m: Message): Promise<any> => {
            if(m.content.length > 20) m.content = m.content.slice(0, 20)
                        
            room.cooldown = Math.round(Date.now() + (60*5*1000))

            Promise.all([
                await room.save(),
                await channel.edit({name: m.content}),
                await button.editReply({content: `Вы изменили название канала на **${m.content}**`})
            ])
        })
    }
)