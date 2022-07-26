import { ButtonInteraction, GuildMember, Interaction, VoiceChannel } from 'discord.js'
import { guilds } from '../config'
import Room from '../models/Room'
import Event from '../struct/base/Event'
import Core from '../struct/Core'

export default new Event(
    'interactionCreate',
    async (bot: Core, interaction: Interaction) => {
        const config = guilds.get(interaction.guild.id)
        if(interaction.isButton() && interaction.channel.id === config.channels.text) {
            const button = interaction as ButtonInteraction
            const author = interaction.member as GuildMember
            const room = await Room.findOne({guildId: button.guild.id, userId: author.id})

            if(!room || !author?.voice?.channel) return button.reply({content: 'Вы находитесь **не в голосовом** канале', ephemeral: true})
            let channel = interaction.guild.channels.cache.get(room.channelId) as VoiceChannel
    
            if(!channel) await room.remove()
            if(channel && channel.members.size == 0) await channel.delete().catch(() => {})
    
            if(author.voice.channel.id !== room.channelId) return button.reply({content: 'Зайдите в **свой** приватный канал', ephemeral: true})

            if(bot.buttons.has(button.customId)) {
                return bot.buttons.get(button.customId)(button, room, channel)
            } else {
                if(!button.deferred) await button.deferUpdate().catch(() => {})
                return
            }
        }
    }
)
