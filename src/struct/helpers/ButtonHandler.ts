import { readdir } from 'fs'
import Button from '../base/Button'
import Core from '../Core'

export default (bot: Core) => {
    readdir(
        `${__dirname}/../../buttons`,
        (err, files) => {
            if(err) return

            files.filter(f => f.endsWith('.js') || f.endsWith('.ts'))
            .forEach(async (file): Promise<any> => {
                const button = (await import(`${__dirname}/../../buttons/${file}`)).default as Button
                bot.buttons.set(button.name, button.run)
            })
        }
    )
}