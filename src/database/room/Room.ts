import { Schema, Document, model } from 'mongoose'

export interface IRoom {
    guildId: string
    userId: string
    channelId: string

    name: string
    limit: number

    leave: number
    cooldown: number
    created: number
}

export type TRoom = IRoom & Document

export default model<IRoom>(
    'Room',
    new Schema(
        {
            guildId: { type: String, required: true },
            userId: { type: String, required: true },
            channelId: { type: String, required: true },

            name: { type: String, default: '0' },
            limit: { type: Number, default: 0 },
            
            leave: { type: Number, default: 0 },
            cooldown: { type: Number, default: 0 },
            created: { type: Number, default: Date.now() }
        }
    ),
    'room'
)