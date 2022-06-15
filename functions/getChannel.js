module.exports = (message, channel, options = {}) => {
    let Channel = message.guild.channels.cache.find(c => c.name === channel)
    if(!Channel) Channel = message.guild.channels.cache.get(channel)
    if(!Channel && !options) Channel = message.mentions.channels.first()
    return Channel
}