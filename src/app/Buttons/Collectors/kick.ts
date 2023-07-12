import { ButtonInteraction, UserSelectMenuInteraction } from 'discord.js';
import EmbedBuilder from '../../../strcut/utils/EmbedBuilder';
import IGuildConfig from '../../../types/GuildConfig';
import Client from '../../../strcut/Client';

export default async (client: Client, button: ButtonInteraction<'cached'>, menu: UserSelectMenuInteraction<'cached'>, config: IGuildConfig) => {
    if(menu.users.size === 0) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                menu.member,
                config.buttons[menu.customId]!.title,
                `Вы **не** выбрали пользоваетля`
            ) ],
            components: []
        })
    }

    const member = menu.members.first()

    if(!member) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                menu.member,
                config.buttons[menu.customId]!.title,
                `Участник **сервера** не найден`
            ) ],
            components: []
        })
    }

    if(member.id === menu.member.id) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                menu.member,
                config.buttons[menu.customId]!.title,
                `Вы **не** можете **выгнать** самого себя`
            ) ],
            components: []
        })
    }

    const voice = menu.member.voice.channel!
    if(voice.id !== member.voice?.channelId) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                menu.member,
                config.buttons[menu.customId]!.title,
                `${member.toString()} **не** находится в ${voice.toString()}`
            ) ],
            components: []
        })
    }

    client.util.disconnectMember(member)

    return button.editReply({
        embeds: [ new EmbedBuilder().default(
            menu.member,
            config.buttons[menu.customId]!.title,
            `Вы успешно **выгнали** пользователя ${member.toString()} **говорить** в ${voice.toString()}`
        ) ],
        components: []
    })
}