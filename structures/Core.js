const { Client, Collection } = require('discord.js')
const { readdir } = require('fs')

const Event = require('./utils/Event.js')
const config = require('../config.js')

module.exports = class Core extends Client {
    constructor() {
        super({
            intents: config.intents
        })

        this.buttons = new Collection()
        this.menus = new Collection()

        this.config = config

        global.Event = Event

        readdir('./structures/handlers', (err, files) => {
            if(files && files.length > 0) {
                files.filter(f => f.endsWith('.js')).forEach(file => {
                    require(`./handlers/${file}`)(this)
                })
            }
        })
    }
}