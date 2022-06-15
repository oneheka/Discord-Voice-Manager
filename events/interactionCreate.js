class IntegrationCreate extends Event {
    constructor() {
        super("interactionCreate")
    }

    async run(bot, integration) {
        if(integration.channel.id == bot.config.ids.channels.text.privatrooms) return bot.emit('clickRoomButton', integration)
    }
}

module.exports = IntegrationCreate