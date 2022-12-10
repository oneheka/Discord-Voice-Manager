import { VoiceChannel } from 'discord.js';
import EmbedBuilder from '../../strcut/utils/EmbedBuilder';
import Interaction from '../../strcut/base/Interaction';

export default new Interaction(
    'limit',
    async (client, modal, config, res): Promise<any> => {
        await modal.deferReply({ephemeral: true})

        const count = Number(modal.fields.getTextInputValue('count'))

        if(0 > count || isNaN(count)) {
            return modal.editReply({
                embeds: [ new EmbedBuilder().default(
                    modal.member,
                    config.buttons[modal.customId]!.title,
                    `**количество** слотов должно быть **положительным** числом`
                ) ]
            })
        }

        if(res) {
            res.limit = count
            await client.db.rooms.save(res)
        }

        await (modal.member.voice.channel as VoiceChannel).setUserLimit(count)

        return modal.editReply({
            embeds: [ new EmbedBuilder().default(
                modal.member,
                config.buttons[modal.customId]!.title,
                `Вы **установили** новое количество **слотов** для своей **приватной комнаты** ${modal.member.voice.channel!.toString()}`
            ) ]
        })
    }
)