import { Client, Collection } from 'discord.js'
import { intents, internal } from '../config'
import { readdir } from 'fs'

export default class Core extends Client {
    readonly functions: Collection<string, Function> = new Collection()
    readonly buttons: Collection<string, Function> = new Collection()

    constructor() {
        super({
            intents: intents
        })
    }

    start(): void {
        readdir(
            `${__dirname}/../struct/helpers/`,
            (err, files) => {
                if(err) return

                files.filter(f => f.endsWith('.js') || f.endsWith('.ts'))
                .forEach(async (file): Promise<any> => {
                    const get = (await import(`./helpers/${file}`)).default as Function
                    get(this)
                })
            }
        )

        void this.login(internal.token)
    }
}