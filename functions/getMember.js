module.exports = (message, member, options) => {
    if(!options?.bot) {
        let members = message.guild.members.cache.filter(m => !m.user.bot)
        if(members.get(member)) {
            return members.get(member)
        } else if((!options || (options && !options?.integration)) && message.mentions.users.first()) {
            return members.get(message.mentions.users.first().id)
        } else return false
    } else {
        let members = message.guild.members.cache.filter(m => m)
        if(members.get(member)) {
            return members.get(member)
        } else if((!options || (options && !options?.integration)) && message.mentions.users.first()) {
            return members.get(message.mentions.users.first().id)
        } else return false
    }
}