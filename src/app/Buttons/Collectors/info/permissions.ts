import { ButtonInteraction, ChannelType } from 'discord.js';
import ActionRowBuilder from '../../../../strcut/utils/ActionRowBuilder';
import EmbedBuilder from '../../../../strcut/utils/EmbedBuilder';
import IGuildConfig from '../../../../types/GuildConfig';
import Client from '../../../../strcut/Client';

export default async (client: Client, button: ButtonInteraction<'cached'>, btn: ButtonInteraction<'cached'>, config: IGuildConfig) => {
    const channel = btn.guild.channels.cache.get(btn.customId.split('.')[1])

    if(!channel || channel.type !== ChannelType.GuildVoice) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                btn.member,
                'Права пользователей приватной комнаты',
                `этой **комнаты** больше **нет**`
            ) ],
            components: []
        })
    }

    const get = await client.db.rooms.findChannel(channel.id)
    if(!get) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                btn.member,
                'Права пользователей приватной комнаты',
                `этой **комнаты** больше **нет**`
            ) ],
            components: []
        })
    }

    return button.editReply({
        embeds: [ new EmbedBuilder().permissions(
            button.member,
            channel
        ) ],
        components: new ActionRowBuilder().pages(channel, 0)
    })
}