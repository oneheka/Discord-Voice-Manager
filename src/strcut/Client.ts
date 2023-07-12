import { Client as DJSClient } from 'discord.js';
import InteractionHandler from './helpers/InteractionHandler';
import EventHandler from './helpers/EventHandler';
import Mongoose from '../database/Mongoose';
import * as config from '../config';
import Logger from './utils/Logger';
import Utils from './utils/Utils';

export default class Client extends DJSClient {
    constructor() {
        super({
            intents: config.intents
        })
    }

    readonly config = config

    events: EventHandler = new EventHandler(this)

    buttons: InteractionHandler = new InteractionHandler('Buttons')
    modals: InteractionHandler = new InteractionHandler('Modals')

    logger: Logger = new Logger()
    util: Utils = new Utils(this)

    db: Mongoose = new Mongoose(this)

    start() {
        this.events.load()
        this.buttons.load()
        this.modals.load()
    
        this.db.connect()
        .then(async () => await this.login(config.internal.token))
    }
}