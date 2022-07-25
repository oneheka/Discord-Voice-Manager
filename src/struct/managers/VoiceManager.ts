import { ChannelType, OverwriteType, VoiceState } from 'discord.js'
import { guilds, ownerRoomPerms } from '../../config'
import Room from '../../models/Room'
import Core from '../Core'

export default class VoiceManager {
    static async onRoomJoin(bot: Core, state: VoiceState) {
        const { member, channel, guild } = state
        if (!member || !guild || !channel) return
        if (member.user.bot) return
        const res = guilds.get(guild.id)
        if (!res) return

        if (channel.id == res.channels.voice) {
            const room = (
                await Room.findOne({guildId: guild.id, userId: member.id}) ??
                await Room.create({guildId: guild.id, userId: member.id})
            )

            if (room && member?.voice) {
                if (30000 > Number(Date.now()-room.leave)) return member.voice.disconnect().catch(() => {})
                if (guild.channels.cache.get(room.channelId)) return member.voice.setChannel(room.channelId).catch(() => {})
            }

            guild.channels.create({
                name: `${member.user.username}`,
                type: ChannelType.GuildVoice,
                parent: res.channels.category,
                permissionOverwrites: [
                    {
                        id: member.id,
                        ...ownerRoomPerms,
                        type: OverwriteType.Member
                    }
                ],
                reason: 'Создание приватной комнаты'
            }).then(async channel => {
                member?.voice?.setChannel(channel.id).then(async (): Promise<any> => {
                    room.channelId = channel.id
                    await room.save().catch(() => {})
                }).catch(async () => await channel.delete('Защита от ддоса приватных комнат').catch(() => {}))
            })

        }
    }

    static async onRoomLeave(bot: Core, state: VoiceState) {
        const { member, channel, guild } = state
        if (!member || !guild || !channel) return
        if (member.user.bot) return
        const res = guilds.get(guild.id)
        if (!res) return

        const room = await Room.findOne({guildId: guild.id, channelId: channel.id})

        if (!channel?.parent || channel.id == res.channels.voice) return
        if(channel.parent.id !== res.channels.category) return

        if(channel.members.size == 0) await channel.delete('Выход из комнаты').catch(() => {})

        if(room?.userId && room?.userId == member.id) {
            room.leave = Date.now()
            await room.save()    
        }
    }
}
