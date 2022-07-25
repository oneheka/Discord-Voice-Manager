const { readdir } = require("fs")

module.exports = (bot) => {
    readdir("./functions/", (err, files) => {
        if(err) return
        if(files && files.length > 0) {
            files.filter(f => f.endsWith(".js")).forEach(file => {
                eval(`global.${file.split(".")[0]} = ${require(`../../functions/${file}`)}`)
            })
        }
    })
}