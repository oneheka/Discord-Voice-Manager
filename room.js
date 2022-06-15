console.clear()

const Core = require('./structures/Core.js')

const bot = new Core()

bot.login(bot.config.internal.token)