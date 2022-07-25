import { Message } from 'discord.js'
import { guilds } from '../config'
import Event from '../struct/base/Event'
import Core from '../struct/Core'

export default new Event(
    'messageCreate',
    async (bot: Core, message: Message) => {
        if (!message.guild || message.author.id == bot.user.id) return

        const get = guilds.get(message.guild.id)
        if (message.channel.id == get.channels.text) {
            if (message.deletable) await message.delete().catch(() => {})
        }
    }
)