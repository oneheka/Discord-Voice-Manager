import { VoiceChannel } from 'discord.js';
import EmbedBuilder from '../../strcut/utils/EmbedBuilder';
import Interaction from '../../strcut/base/Interaction';

export default new Interaction(
    'rename',
    async (client, modal, config, res): Promise<any> => {
        await modal.deferReply({ephemeral: true})

        const name = modal.fields.getTextInputValue('name')

        const voice = modal.member.voice.channel as VoiceChannel

        if(res) {
            if(res.cooldown > Date.now()) {
                return modal.editReply({
                    embeds: [ new EmbedBuilder().default(
                        modal.member,
                        config.buttons[modal.customId]!.title,
                        `**приватную комнату** ${voice.toString()} можно будет **переименовать** через **<t:${Math.round(res.cooldown/1000)}:R>**`        
                    ) ]
                })
            }

            res.name = name
            res.cooldown = Date.now() + (60*2.5*1000)
            await client.db.rooms.save(res)
        }

        await voice.setName(name)

        return modal.editReply({
            embeds: [ new EmbedBuilder().default(
                modal.member,
                config.buttons[modal.customId]!.title,
                `Вы **установили** новое имя для своей **приватной комнаты** ${voice.toString()}`
            ) ]
        })
    }
)
