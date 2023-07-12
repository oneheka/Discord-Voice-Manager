import { Collection } from 'discord.js'
import Room, { TRoom } from './Room'

export default class RoomManager extends Collection<string, TRoom> {
    async init() {
        (await this.array()).forEach(res => {
            this.set(`${res.guildId}.${res.userId}`, res)
        })
    }

    array() {
        return Room.find({}).exec()
    }

    async findUser(guildId: string, userId: string, channelId: string = '0') {
        const cache = this.get(`${guildId}.${userId}`)
        if(cache) {
            return cache
        } else {
            return (await Room.findOne({guildId, userId}) ?? await this.create(guildId, userId, channelId))
        }
    }

    async findChannel(channelId: string) {
        const cache = this.find(r => r.channelId === channelId)
        if(cache) {
            return cache
        } else {
            return (await Room.findOne({channelId}))
        }
    }

    async create(guildId: string, userId: string, channelId: string) {
        const doc = await Room.create({guildId, userId, channelId})
        await doc.save()
        this.set(`${guildId}.${userId}`, doc)
        return doc
    }

    async save(res: TRoom) {
        await res.save()
        this.set(`${res.guildId}.${res.userId}`, res)
    }

    async remove(res: TRoom) {
        if(this.has(`${res.guildId}.${res.userId}`)) {
            this.delete(`${res.guildId}.${res.userId}`)
        }

        await res.remove()
    }
}