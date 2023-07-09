import { Client as DJSClient } from 'discord.js';
import InteractionHandler from './helpers/InteractionHandler';
import EventHandler from './helpers/EventHandler';
import db, { DB } from './DB'
import * as config from '../config';
import Logger from './utils/Logger';
import Utils from './utils/Utils';
import EmojiStorage from './utils/EmojisStorage';
import AvatarUpdater from './utils/AvatarUpdater';

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
    commands: InteractionHandler = new InteractionHandler('Commands')

    logger: Logger = new Logger()
    util: Utils = new Utils(this)

    emojisStorage: EmojiStorage = new EmojiStorage(this)
    avatarUpdater: AvatarUpdater = new AvatarUpdater(this)
    db: DB = db


    start() {
        this.events.load()
        this.buttons.load()
        this.modals.load()
        this.commands.load()

        this.db.connect(this)
        .then(async () => await this.login(config.internal.token))
    }
}