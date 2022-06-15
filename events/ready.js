class Ready extends Event {
    constructor() {
        super("ready")
    }

    async run(bot) {
        console.log(bot.user.tag)

        //bot.channels.cache.get('942397466664382485').send({embeds: [{title: '1'}]})

        bot.emit('messageEmbedUpdate', bot)
    }
}

module.exports = Ready