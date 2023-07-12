import { ButtonInteraction, ChannelSelectMenuInteraction, ChannelType } from 'discord.js';
import ActionRowBuilder from '../../../../strcut/utils/ActionRowBuilder';
import EmbedBuilder from '../../../../strcut/utils/EmbedBuilder';
import IGuildConfig from '../../../../types/GuildConfig';
import Client from '../../../../strcut/Client';

export default async (client: Client, button: ButtonInteraction<'cached'>, menu: ChannelSelectMenuInteraction<'cached'>, config: IGuildConfig) => {
    if(menu.channels.size === 0) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                menu.member,
                config.buttons[button.customId]!.title,
                `Вы **не** выбрали канал`
            ) ],
            components: []
        })
    }

    const channel = menu.channels.first()

    const get = await client.db.rooms.findChannel(channel!.id)
    if(!channel || channel.type !== ChannelType.GuildVoice || !get) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                menu.member,
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