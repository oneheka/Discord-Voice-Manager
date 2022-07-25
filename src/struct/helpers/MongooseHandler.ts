import { internal } from '../../config'
import Core from '../Core'
import mongoose from 'mongoose'

export default (bot: Core) => {
    mongoose.connect(
        internal.mongoURL,
        {
            autoIndex: true
        }
    ).then(() => {
        console.log(`База данных подключена.`)
    })
    .catch(() => {})
}