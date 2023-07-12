import { EmbedBuilder as DJSEmbedBuilder, GuildMember, VoiceChannel } from 'discord.js';
import { guilds } from '../../config';
import { TRoom } from '../../database/room/Room';
import GuildConfig from '../../types/GuildConfig';
import Utils from './Utils';

export default class EmbedBuilder extends DJSEmbedBuilder {
    default(member: GuildMember, title: string, description: string) {
        return this.setTitle(title).setColor(guilds.get(member.guild.id)!.color)
        .setDescription(`${member.toString()}, ${description}`)
        .setThumbnail(Utils.getAvatar(member))
    }

    settingRoomEmbed(config: GuildConfig) {
        return this.setTitle('Управление приватной комнатой')
        .setColor(config.color)
        .setDescription(
            'Жми следующие кнопки, чтобы настроить свою комнату' + '\n'
            + 'Использовать их можно только когда у тебя есть приватный канал' + '\n\n'
            + (
                (config.dot || '') + (config.buttons.rename ? (`${config.buttons.rename.emoji} — \`${config.buttons.rename.title.toLowerCase()}\`` + '\n') : '')
                + (config.dot || '') + (config.buttons.limit ? (`${config.buttons.limit.emoji} — \`${config.buttons.limit.title.toLowerCase()}\`` + '\n') : '')
                + (config.dot || '') + (config.buttons.close ? (`${config.buttons.close.emoji} — \`${config.buttons.close.title.toLowerCase()}\`` + '\n') : '')
                + (config.dot || '') + (config.buttons.hide ? (`${config.buttons.hide.emoji} — \`${config.buttons.hide.title.toLowerCase()}\`` + '\n') : '')
                + (config.dot || '') + (config.buttons.user ? (`${config.buttons.user.emoji} — \`${config.buttons.user.title.toLowerCase()}\`` + '\n') : '')
                + (config.dot || '') + (config.buttons.speak ? (`${config.buttons.speak.emoji} — \`${config.buttons.speak.title.toLowerCase()}\`` + '\n') : '')
                + (config.dot || '') + (config.buttons.kick ? (`${config.buttons.kick.emoji} — \`${config.buttons.kick.title.toLowerCase()}\`` + '\n') : '')
                + (config.dot || '') + (config.buttons.reset ? (`${config.buttons.reset.emoji} — \`${config.buttons.reset.title.toLowerCase()}\`` + '\n') : '')
                + (config.dot || '') + (config.buttons.owner ? (`${config.buttons.owner.emoji} — \`${config.buttons.owner.title.toLowerCase()}\`` + '\n') : '')
                + (config.dot || '') + (config.buttons.info ? (`${config.buttons.info.emoji} — \`${config.buttons.info.title.toLowerCase()}\``) : '')
            )
        ).setImage(config?.line ? config.line : null)
    }

    infoRoom(member: GuildMember, config: GuildConfig, channel: VoiceChannel, get: TRoom) {
        const guildPerms = channel.permissionOverwrites.cache.get(member.guild.id)

        return this.setTitle(config.buttons.info.title)
        .setThumbnail(Utils.getAvatar(member))
        .setColor(guilds.get(member.guild.id)!.color)
        .setDescription(
            '**Приватная комната:**' + ` ${channel.toString()}` + '\n'
            + '**Пользователи:**' + ` ${channel.members.size}/${channel.userLimit === 0 ? 'ꝏ' : channel.userLimit}` + '\n'
            + '**Владелец:**' + ` <@!${get.userId}>` + '\n'
            + '**Время создания:**' + ` <t:${Math.round(get.created/1000)}>` + '\n'
            + '**Видна ли комната всем:**' + ` ${guildPerms && guildPerms.deny.has('ViewChannel') ? '❌' : '✅'}` + '\n'
            + '**Доступна ли комната всем:**' + ` ${guildPerms && guildPerms.deny.has('Connect') ? '❌' : '✅'}` + '\n'
        )
    }

    permissions(member: GuildMember, channel: VoiceChannel, page: number = 0) {
        const array = channel.permissionOverwrites.cache
        .filter(p => channel.guild.members.cache.has(p.id))
        .map(p => p)

        const max = Math.ceil(array.length/5) === 0 ? 1 : Math.ceil(array.length/5)

        const embed = this.setTitle('Права пользователей приватной комнаты')
        .setThumbnail(Utils.getAvatar(member))
        .setColor(guilds.get(member.guild.id)!.color)
        .setFooter(
            { text: `Страница: ${page+1}/${max}` }
        )

        for ( let i = page*5; (i < array.length && i < 5*(page+1)) ; i++ ) {
            const p = array[i]
            const target = member.guild.members.cache.get(p.id)
            if(target) {
                embed.addFields(
                    {
                        name: `${i+1}. ${target.displayName}`,
                        value: (
                            `> Подключиться: ${p.deny.has('Connect') ? '❌' : '✅'}` + '\n'
                            + `> Говорить: ${p.deny.has('Speak') ? '❌' : '✅'}`
                        )
                    }
                )
            }
        }

        return embed.setDescription((embed.data.fields || [] )?.length === 0 ? 'Пусто' : null)
    }
}