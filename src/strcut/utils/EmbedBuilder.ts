import { EmbedBuilder as DJSEmbedBuilder, GuildMember, VoiceChannel } from 'discord.js';
import { settings } from '../../config';
import { TRoom } from '../../database/room/Room';
import Utils from './Utils';
import Client from '../Client';

export default class EmbedBuilder extends DJSEmbedBuilder {
    default(member: GuildMember, title: string, description: string) {
        return this.setTitle(title).setColor(settings!.color)
        .setDescription(`${member.toString()}, ${description}`)
        .setThumbnail(Utils.getAvatar(member))
    }

    settingRoomEmbed(client: Client) {
        return this.setTitle('Управление приватной комнатой')
        .setColor(settings.color)
        .setDescription(
            '> Жми следующие кнопки, чтобы настроить свою комнату' + '\n'
        ).setImage(settings?.line ? 'https://cdn.discordapp.com/attachments/966972126806573089/1104607266533031966/line.png' : null)
        .setURL('https://github.com/HekaHub/Discord-Voice-Manager')
        .addFields([ {
            name: '** **',
            value: 
            Object.keys(settings.buttons).filter((btn, i) => i % 2 == 0)
            .map(btn => 
                //@ts-ignore
                (settings.dot || '') + (settings.buttons[btn] ? (`${client.emojisStorage.cache.get(btn)} ・ ${settings.buttons[btn].title.toLowerCase()}`) : '')
            ).join('\n'),
            inline: true
        },
        {  
            name: '** **',
            value: Object.keys(settings.buttons).filter((btn, i) => i % 2 == 1)
            .map(btn => 
                //@ts-ignore
                (settings.dot || '') + (settings.buttons[btn] ? (`${client.emojisStorage.cache.get(btn)} ・ ${settings.buttons[btn].title.toLowerCase()}`) : '')
            ).join('\n'),
            inline: true
        }
        ])
        .setFooter({text: 'Использовать их можно только когда у тебя есть приватный канал'})
    }

    infoRoom(member: GuildMember, channel: VoiceChannel, get: TRoom) {
        const guildPerms = channel.permissionOverwrites.cache.get(member.guild.id)
        //@ts-ignore
        return this.setTitle(settings.buttons['info'].title)
        .setThumbnail(Utils.getAvatar(member))
        .setColor(settings.color)
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
        .setColor(settings!.color)
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