class MessageCreate extends Event {
    constructor() {
        super("messageCreate")
    }

    async run(bot, message) {
        if(message.channel.id == bot.config.ids.channels.text.privatrooms) return message.delete()
    }
}

module.exports = MessageCreate