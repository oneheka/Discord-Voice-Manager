import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, TextChannel, VoiceChannel } from 'discord.js'
import { guilds } from '../config'
import Event from '../struct/base/Event'
import Core from '../struct/Core'

export default new Event(
    'ready',
    async (bot: Core) => {
        console.log(`${bot.user.tag} вошел в сеть`)

        guilds
        .forEach((config) => {
            const voice = bot.channels.cache.get(config.channels.voice) as VoiceChannel
            const channel = bot.channels.cache.get(config.channels.text) as TextChannel
            if(voice) {
                voice.members.map(async (m) => await m.voice.disconnect('Избавление от багов').catch(() => {}))
            }
            if (channel) {
                if(config.message == '') return channel.send({embeds: [new EmbedBuilder().setTitle('1')]}).catch(() => {})

                channel.messages.fetch(config.message)
                .then(async (message) => {
                    const row1 = new ActionRowBuilder<ButtonBuilder>()
                    const row2 = new ActionRowBuilder<ButtonBuilder>()
                    const emojis = Object.values(config.emojis)
                    const names = Object.keys(config.emojis)

                    for ( let i = 0; emojis.length > i; i++ ) {
                        if(i % 2 == 0) {
                            row1.addComponents(new ButtonBuilder().setCustomId(names[i]).setEmoji(emojis[i]).setStyle(config.style))
                        } else {
                            row2.addComponents(new ButtonBuilder().setCustomId(names[i]).setEmoji(emojis[i]).setStyle(config.style))
                        }
                    }

                    const embed = new EmbedBuilder()
                    .setColor('#2f3136')
                    .setTitle('Управление приватной комнатой')
                    .setDescription('> Жми следующие кнопки, чтобы настроить свою комнату')
                    .setFooter({text: 'Использовать их можно только когда у тебя есть приватный канал'})
                    .setImage('https://cdn.discordapp.com/attachments/950282150043869214/962029835151089674/unknown.png')
                    .addFields(
                        {
                            name: '** **',
                            value: (`${config.emojis.limit} — установить лимит` + '\n'
                            + `${config.emojis.lock} — закрыть комнату` + '\n'
                            + `${config.emojis.unlock} — открыть комнату` + '\n'
                            + `${config.emojis.deluser} — забрать доступ` + '\n'
                            + `${config.emojis.adduser} — выдать доступ`),
                            inline: true
                        }
                    )
                    .addFields(
                        {
                            name: '** **',
                            value: (`${config.emojis.name} — сменить название` + '\n'
                            + `${config.emojis.owner} — передать владельца` + '\n'
                            + `${config.emojis.kick} — выгнать из комнаты` + '\n'
                            + `${config.emojis.mute} — забрать право говорить` + '\n'
                            + `${config.emojis.unmute} — вернуть право говорить`),
                            inline: true
                        }
                    )

                    if(message.editable) {
                        await message.edit({
                            embeds: [embed],
                            components: [row1, row2]
                        })
                    }
                })
            }
        })
    }
)