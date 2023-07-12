import { ButtonInteraction, ChannelType } from 'discord.js';
import ActionRowBuilder from '../../../../strcut/utils/ActionRowBuilder';
import EmbedBuilder from '../../../../strcut/utils/EmbedBuilder';
import IGuildConfig from '../../../../types/GuildConfig';
import Client from '../../../../strcut/Client';

export default async (client: Client, button: ButtonInteraction<'cached'>, btn: ButtonInteraction<'cached'>, config: IGuildConfig) => {
    const channel = btn.member.voice?.channel

    if(!channel || channel.type !== ChannelType.GuildVoice) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                btn.member,
                config.buttons[button.customId]!.title,
                `**выбранный** голосовой канал **не** найден или **не** является **приватной комнатой**`
            ) ],
            components: []
        })
    }

    const get = await client.db.rooms.findChannel(channel.id)
    if(!get) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                btn.member,
                config.buttons[button.customId]!.title,
                `**выбранный** голосовой канал **не** найден или **не** является **приватной комнатой**`
            ) ],
            components: []
        })
    }

    return button.editReply({
        embeds: [ new EmbedBuilder().infoRoom(
            button.member,
            config,
            channel,
            get
        ) ],
        components: new ActionRowBuilder().checkMembersPermission(channel.id)
    })
}