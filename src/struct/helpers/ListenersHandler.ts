import { readdir } from 'fs'
import Event from '../base/Event'
import Core from '../Core'

export default (bot: Core) => {
    readdir(
        `${__dirname}/../../listeners`,
        (err, files) => {
            if(err) return

            files.filter(f => f.endsWith('.js') || f.endsWith('.ts'))
            .forEach(async (file): Promise<any> => {
                const listen = (await import(`${__dirname}/../../listeners/${file}`)).default as Event
                bot.on(listen.name, listen.run.bind(null, bot))
            })
        }
    )
}