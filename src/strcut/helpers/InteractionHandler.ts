import { InteractionDirName } from '../../types/base/Interaction';
import { Collection } from 'discord.js';
import { readdir } from 'fs';
import Interaction from '../base/Interaction';

export default class InteractionHandler {
    readonly cache: Collection<string, Interaction> = new Collection()
    readonly dir: string

    constructor(type: InteractionDirName) {
        this.dir = `${__dirname}/../../app/${type}`
    }

    load() {
        readdir(this.dir, (err, files) => {
            if(err) return

            files.filter(f => f.endsWith('.ts') || f.endsWith('.js')).forEach(async file => {
                const int = (await import(`${this.dir}/${file}`)).default as Interaction
                this.cache.set(int.name, int)
            })
        })
    }
}