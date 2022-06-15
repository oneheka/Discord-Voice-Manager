const { readdir } = require("fs")

module.exports = (bot) => {
    readdir("./events/", (err, files) => {
        if(err) return
        if(files && files.length > 0) {
            files.filter(f => f.endsWith(".js")).forEach(file => {
                let event = require(`../../events/${file}`)
                let pull = new event()
                bot.on(file.split(".")[0], pull.run.bind(null, bot))
            })
        }
    })
}