class VoiceManager {
    async onRoomJoin(bot, state) {
        const Room = require('../../models/raw/Room.js')
        if(!state) return
        const { member, channel, guild } = state
        if(!member || !guild || !channel) return
        if(member.user.bot) return

        if(channel.id == bot.config.ids.channels.voice.createPrivate) {
            let room = await Room.findOne({guildId: guild.id, userId: member.id})
            if(room && member?.voice) {
                if(30000 > parseInt(Date.now()-room.leave)) return member.voice.disconnect().catch(() => {})
                if(bot.channels.cache.get(room.channelId)) return member.voice.setChannel(room.channelId).catch(() => {})
            }
            guild.channels.create(`${member.user.username}`, {
                type: "GUILD_VOICE",
                parent: bot.config.ids.channels.categories.privatrooms
            }).then(async channel => {
                if(!room) {
                    room = await Room.create({guildId: guild.id, userId: member.id, channelId: channel.id})
                }
                channel.permissionOverwrites.create(member.id, bot.config.permissions.privateroom.creator)
                try {
                    member?.voice?.setChannel(channel).catch(() => {})
                    room.channelId = channel.id
                    await room.save().catch(() => {})
                } catch(err) {
                    return channel.delete()
                }
            })
        }
    }

    async onRoomLeave(bot, state) {
        const Room = require('../../models/raw/Room.js')
        if(!state) return
        const { member, channel, guild } = state
        if(!member || !guild || !channel) return
        if(member.user.bot) return

        let room = await Room.findOne({guildId: guild.id, channelId: channel.id})
        if(room) {
            room.leave = Date.now()
            room.save().catch(() => {})
            if(channel.members.size == 0) channel.delete().catch(() => {})
        }
    }
}

module.exports = VoiceManager