const mongoose = require("mongoose")

module.exports = (bot) => {
    mongoose.connect(bot.config.internal.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log(`База данных подключена.`)
    })
    .catch(() => {})
}