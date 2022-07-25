import { ButtonInteraction, Message, VoiceChannel } from 'discord.js'
import { IRoom } from '../models/Room'
import { Document } from 'mongoose'
import Button from '../struct/base/Button'

export default new Button(
    'limit',
    async (
        button: ButtonInteraction,
        room: Document<unknown, any, IRoom> & IRoom & { _id: Object; },
        channel: VoiceChannel
    ) => {                    
        await button.reply({content: 'Укажите новый лимит канала', ephemeral: true})
                    
        const filter = (m: Message) => m.author.id === button.user.id
        const collector = button.channel.createMessageCollector({filter: filter, time: 30000, max: 1 })

        collector.on('collect', async (m: Message): Promise<any> => {
            const num = parseInt(m.content)
            if(isNaN(num) || 0 > num || num > 99) return button.editReply({content: `Укажите число не больше **99**. Если вы укажите **0**, то лимит изменится на **безграничное** число присоеденений`})

            Promise.all([
                await channel.edit({userLimit: num}),
                await button.editReply({content: `Вы изменили лимит канала на **${m.content}**`})
            ])
        })
    }
)