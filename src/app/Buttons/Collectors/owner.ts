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

    if(member.user.bot) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                menu.member,
                config.buttons[menu.customId]!.title,
                `Вы **не** можете **передать** ${menu.member.voice.channel!.toString()} боту`
            ) ],
            components: []
        })
    }

    if(member.id === menu.member.id) {
        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                menu.member,
                config.buttons[menu.customId]!.title,
                `Вы **не** можете **передать** ${menu.member.voice.channel!.toString()} самому себе`
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

    await voice.permissionOverwrites.delete(menu.user.id)
    await voice.permissionOverwrites.create(
        member.id,
        {
            Speak: true, Stream: true, UseVAD: true, Connect: true, ViewChannel: true, PrioritySpeaker: true, CreateInstantInvite: true,
            MoveMembers: false, ManageRoles: false, ManageWebhooks: false, ManageChannels: false
        }
    )

    const room = await client.db.rooms.findChannel(voice.id)
    if(room) {
        const res = await client.db.rooms.findUser(menu.guildId, member.id)
        res.channelId = voice.id
        await client.db.rooms.remove(room)
        await client.db.rooms.save(res)
    }

    return button.editReply({
        embeds: [ new EmbedBuilder().default(
            menu.member,
            config.buttons[menu.customId]!.title,
            `Вы успешно **передали** ${voice.toString()} пользователя ${member.toString()}. Ваши **права** в ${voice.toString()} были **сброшены**`
        ) ],
        components: []
    })
}