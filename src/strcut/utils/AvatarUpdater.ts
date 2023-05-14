import { Collection } from "discord.js";
import { Client } from "discord.js";
import fs, { watch } from "fs";
import { set } from "mongoose";

export default class AvatarUpdater {
    md5Map = new Collection<string, string>();
    readonly dir: string = `${__dirname}/../../../assets`;
    client: Client;

    constructor(client: Client) {
        this.client = client;
        let last = 0;
        watch(this.dir, (eventType, filename) => {
            if(filename !== 'avatar.png') return;
            let changed = false;
            if(!['change','rename'].includes(eventType)) return;
            try{
                let filePath = this.dir + '/' + filename;
                fs.access(filePath, fs.constants.F_OK, async (err) => {
                    if (!err)
                    if(last + 1000 > Date.now()) return;
                    setTimeout(() => {
                        this.client.emit('emojiStorageUpdate')
                    }, 1000)
                    last = Date.now();
                        
                })
            } catch(e) {}
        })
        
    }

}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));