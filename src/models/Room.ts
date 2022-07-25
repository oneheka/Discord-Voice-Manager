import { Schema, model } from 'mongoose'

export interface IRoom {
    guildId: string,
    userId: string,
    channelId: string,

    leave: number,
    cooldown: number
}

const schema = new Schema(
    {
        guildId: { type: String, required: true },
        userId: { type: String, required: true },
        channelId: { type: String, default: '0' },

        leave: { type: Number, default: Date.now() },
        cooldown: { type: Number, default: Date.now() }
    }
)

export default model<IRoom>('Room', schema, 'room')