const Room = require("../models/raw/Room.js")

class ClickRoomButton extends Event {
    constructor() {
        super("clickRoomButton")
    }

    async run(bot, button) {
        let room = await Room.findOne({guildId: button.guild.id, userId: button.member.id})

        if(!room || !button.member?.voice || !button.member?.voice?.channel) return button.reply({content: "Зайдите в свой приватный канал", ephemeral: true})
        let channel = bot.channels.cache.get(room.channelId)

        if(!channel) await room.remove()
        if(channel && channel.members.size == 0) await channel.delete().catch(() => {})

        if(button.member.voice.channel.id !== room.channelId) return button.reply({content: "Зайдите в свой приватный канал", ephemeral: true})

        if(button.customId == 'pvname') {
            button.reply({content: 'Укажите новое название канала', ephemeral: true})
            const filter = m => m.author.id === button.user.id
            const collector = button.channel.createMessageCollector({filter: filter, time: 30000, max: 1 })

            collector.on('collect', m => {
                if(m.content.length > 20) m.content = m.content.slice(0, 20)
                channel.edit({name: m.content})

                return button.editReply({content: `Вы изменили название канала на **${m.content}**`})
            })
        } else if(button.customId == 'pvlimit') {
            button.reply({content: 'Укажите новый лимит канала', ephemeral: true})
            const filter = m => m.author.id === button.user.id
            const collector = button.channel.createMessageCollector({filter: filter, time: 30000, max: 1 })

            collector.on('collect', m => {
                if(isNaN(m.content) || 0 > m.content || m.content > 99) return button.editReply({content: `Укажите число не больше **99**. Если вы укажите 0, то лимит изменится на безграничное число присоеденений`})
                channel.edit({userLimit: m.content})

                return button.editReply({content: `Вы изменили лимит канала на **${m.content}**`})
            })
        } else if(button.customId == 'pvlock') {
            channel.permissionOverwrites.create(button.guild.id, {CONNECT: false})
            return button.reply({content: `Вы **закрыли** свою комнату`, ephemeral: true})
        } else if(button.customId == 'pvunlock') {
            channel.permissionOverwrites.create(button.guild.id, {CONNECT: true})
            return button.reply({content: `Вы **открыли** свою комнату`, ephemeral: true})
        } else if(button.customId == 'pvkick') {
            button.reply({content: "Укажите участника", ephemeral: true})
            const filter = m => m.author.id === button.user.id
            const collector = button.channel.createMessageCollector({filter: filter, time: 30000, max: 1 })

            collector.on('collect', m => {
                let member = getMember(m, m.content)
                if(!member || member.id == button.user.id || member.user.bot) return button.editReply({content: `Участник не был найден`, ephemeral: true})
                if(!member?.voice?.channel) return button.editReply({content: `Участник находится не в голосовом канале`, ephemeral: true})
                if(member.voice.channel.id !== room.channelId) return button.editReply({content: "Участник находится не в вашем приватном канале", ephemeral: true})

                member.voice.disconnect()
                return button.editReply({content: `Участник <@!${member.id}> был выгнан с комнаты`, ephemeral: true})
            })

        } else if(button.customId == 'pvcrown') {
            button.reply({content: "Укажите участника", ephemeral: true})
            const filter = m => m.author.id === button.user.id
            const collector = button.channel.createMessageCollector({filter: filter, time: 30000, max: 1 })

            collector.on('collect', async m => {
                let member = getMember(m, m.content)
                if(!member || member.id == button.user.id || member.user.bot) return button.editReply({content: `Участник не был найден`, ephemeral: true})
                if(!member?.voice?.channel) return button.editReply({content: `Участник находится не в голосовом канале`, ephemeral: true})
                if(member.voice.channel.id !== room.channelId) return button.editReply({content: "Участник находится не в вашем приватном канале", ephemeral: true})

                let newRoom = await Room.findOne({guildId: button.guild.id, userId: member.id})
                if(newRoom) newRoom.channelId = room.channelId
                else newRoom = await Room.create({guildId: button.guild.id, userId: member.id, channelId: room.channelId})
                
                room.channelId = '0'
                await room.save().catch(() => {})
                await newRoom.save().catch(() => {})
                
                return button.editReply({content: `Участнику <@!${member.id}> были переданы права на комнату`, ephemeral: true})
            })
        } else if(button.customId == 'pvadduser') {
            button.reply({content: "Укажите участника", ephemeral: true})
            const filter = m => m.author.id === button.user.id
            const collector = button.channel.createMessageCollector({filter: filter, time: 30000, max: 1 })

            collector.on('collect', m => {
                let member = getMember(m, m.content)
                if(!member || member.id == button.user.id || member.user.bot) return button.editReply({content: `Участник не был найден`, ephemeral: true})

                channel.permissionOverwrites.create(member.id, {CONNECT: true})
                return button.editReply({content: `Участник <@!${member.id}> теперь **может** присоеденяться к **вашей** комнате`, ephemeral: true})
            })
        } else if(button.customId == 'pvremoveuser') {
            button.reply({content: "Укажите участника", ephemeral: true})
            const filter = m => m.author.id === button.user.id
            const collector = button.channel.createMessageCollector({filter: filter, time: 30000, max: 1 })

            collector.on('collect', m => {
                let member = getMember(m, m.content)
                if(!member || member.id == button.user.id || member.user.bot) return button.editReply({content: `Участник не был найден`, ephemeral: true})

                channel.permissionOverwrites.create(member.id, {CONNECT: false})
                return button.editReply({content: `Участник <@!${member.id}> больше **не может** присоеденяться к **вашей** комнате`, ephemeral: true})
            })
        } else if(button.customId == 'pvmute') {
            button.reply({content: "Укажите участника", ephemeral: true})
            const filter = m => m.author.id === button.user.id
            const collector = button.channel.createMessageCollector({filter: filter, time: 30000, max: 1 })

            collector.on('collect', m => {
                let member = getMember(m, m.content)
                if(!member || member.id == button.user.id || member.user.bot) return button.editReply({content: `Участник не был найден`, ephemeral: true})

                channel.permissionOverwrites.create(member.id, {SPEAK: false})
                return button.editReply({content: `Вы **закрыли** ротик участнику <@!${member.id}>`, ephemeral: true})
            })
        } else if(button.customId == 'pvunmute') {
            button.reply({content: "Укажите участника", ephemeral: true})
            const filter = m => m.author.id === button.user.id
            const collector = button.channel.createMessageCollector({filter: filter, time: 30000, max: 1 })

            collector.on('collect', m => {
                let member = getMember(m, m.content)
                if(!member || member.id == button.user.id || member.user.bot) return button.editReply({content: `Участник не был найден`, ephemeral: true})

                channel.permissionOverwrites.create(member.id, {SPEAK: true})
                return button.editReply({content: `Вы **открыли** ротик участнику <@!${member.id}>`, ephemeral: true})
            })
        }
    }
}

module.exports = ClickRoomButton