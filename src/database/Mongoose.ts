import mongoose from 'mongoose'
import Client from '../strcut/Client'
import RoomManager from './room/RoomManager'

export default class Mongoose {
    readonly rooms: RoomManager = new RoomManager()

    constructor(
        private client: Client
    ) {}

    async connect() {
        await mongoose.connect(
            this.client.config.internal.mongoURL,
            {
                autoIndex: true,
                autoCreate: true
            }
        )
        .then(async () => {
            await this.init()
            this.client.logger.login(`База данных MongoDB подключена`)
        })
        .catch((err: Error) => console.log(err))
    }

    async init() {
        await this.rooms.init()
    }
}