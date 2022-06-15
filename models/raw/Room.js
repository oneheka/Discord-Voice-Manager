const mongoose = require('mongoose')

const model = mongoose.Schema({
    guildId: String,
    userId: String,
    channelId: String,
    leave: {type: Number, default: Date.now()}
})

module.exports = mongoose.model("Room", model, "room")