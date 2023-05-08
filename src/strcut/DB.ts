import fs from 'fs';
import { ActionRowBuilder, ButtonBuilder, ChannelType, ComponentEmojiResolvable, EmojiResolvable, Guild, GuildEmoji, PermissionFlagsBits, PermissionsBitField, Webhook } from 'discord.js';
import { Creator, Room, Setting } from './../types/base/DB.d';
import sqlite3, { Database, Statement } from 'sqlite3'
import { open } from 'sqlite'
import { Collection, GuildChannelType } from 'discord.js';
import Client from './Client';
import EmbedBuilder from './utils/EmbedBuilder';

export class DB {
    //@ts-ignore
    file: Database<Database, Statement>;
    //@ts-ignore
    client: Client;
    //@ts-ignore
    creators: CreatorsManager;
    //@ts-ignore
    rooms: RoomManager;
    //@ts-ignore
    settings: SettingsManager;
    constructor() {
    }

    async connect(client: Client) {
        this.file = await open({
            filename: `${__dirname}/../../DB.db`,
            driver: sqlite3.cached.Database
        })
            
        this.client = client;
        this.creators = new CreatorsManager(this, this.client);
        this.rooms = new RoomManager(this, this.client);
        this.settings = new SettingsManager(this, this.client);
        this.init();
    }

    async init() {

        try {
            let creators = await this.file.all('SELECT * FROM voiceCreators') as Creator[];
            creators.forEach( (creator: Creator) => {
                this.creators.set(`${creator.guildId}.${creator.categoryId}`, creator);
            })
            this.client.on('ready', () => {
                creators.forEach( (creator: Creator) => {
                    let voice = this.client.channels.cache.get(creator.voiceChannelId);
                    let text = this.client.channels.cache.get(creator.textChannelId);
                    let category = this.client.channels.cache.get(creator.categoryId);
                    if(!voice || !text || !category) {
                        this.creators.dbDelete(creator.guildId, creator.categoryId);
                    }
                })
            })
        } catch {
            this.file.run('CREATE TABLE voiceCreators (id INTEGER PRIMARY KEY AUTOINCREMENT, guildId TEXT, textChannelId TEXT, voiceChannelId TEXT, categoryId TEXT)');
        }
        try {
            let rooms = await this.file.all('SELECT * FROM rooms') as Room[];
            rooms.forEach( (room: Room) => {
                this.rooms.set(room.voiceChannelId, room);
            })
        } catch {
            this.file.run('CREATE TABLE rooms (id INTEGER PRIMARY KEY AUTOINCREMENT, guildId TEXT, voiceChannelId TEXT, ownerId TEXT)');
        }
        try {
            let settings = await this.file.all('SELECT * FROM settings') as Setting[];
            settings.forEach( (setting: Setting) => {
                this.settings.set(setting.userId, setting);
            })
        } catch {
            this.file.run('CREATE TABLE settings (id INTEGER PRIMARY KEY AUTOINCREMENT, guildId TEXT, userId TEXT, name TEXT, userLimit INTEGER, locked INTEGER, visible INTEGER, leave INTEGER)');
        }
        
    }
}

class CreatorsManager extends Collection<string, Creator> {
    constructor(public db: DB, public client: Client) {
        super();
    }
    
    async dbGet(guildId: string, categoryId: string): Promise<Creator | undefined> {
        let result = this.get(`${guildId}.${categoryId}`);
        if (!result) {
            result = await this.db.file.all('SELECT * FROM voiceCreators WHERE guildId = ?', [guildId])[0];
            if(result)
                this.set(`${guildId}.${categoryId}`, result);
        }
        if(!result) {
            result = await this.create(guildId);
            this.set(`${guildId}.${result.categoryId}`, result);
        }

        return result;
    }
    dbSet(guildId: string, creator: Creator) {
        let creatorDb = this.db.file.all('SELECT * FROM voiceCreators WHERE guildId = ? AND categoryId = ?', [creator.guildId, creator.categoryId])[0] as Creator;
        if(!creatorDb) {
            this.db.file.run('INSERT INTO voiceCreators (guildId, textChannelId, voiceChannelId, categoryId) VALUES (?, ?, ?, ?)', [creator.guildId, creator.textChannelId, creator.voiceChannelId, creator.categoryId]);
        } else
            this.db.file.run('UPDATE voiceCreators SET textChannelId = ?, voiceChannelId = ?, categoryId = ? WHERE guildId = ?', [creator.textChannelId, creator.voiceChannelId, creator.categoryId, creator.guildId]);
        return this.set(guildId, creator);
    }
    dbDelete(guildId: string, categoryId: string) {

        let creator = this.get(`${guildId}.${categoryId}`);
        if(!creator) return;

        let text = this.client.channels.cache.get(creator.textChannelId);
        let voice = this.client.channels.cache.get(creator.voiceChannelId);
        let category = this.client.channels.cache.get(creator.categoryId);

        if(text) text.delete();
        if(voice) voice.delete();
        if(category) category.delete();

        this.db.file.run('DELETE FROM voiceCreators WHERE guildId = ? AND categoryId = ?', [guildId, categoryId]);
        return this.delete(`${guildId}.${categoryId}`);
    }

    async create(guildId: string): Promise<Creator> {
        let guild = this.client.guilds.cache.get(guildId) as Guild
        let category = await guild.channels.create({ name: 'Приватные каналы', type: ChannelType.GuildCategory  })
        let voiceChannel = await guild.channels.create({ name: 'Создать канал [+]', parent: category.id, type: ChannelType.GuildVoice })
        let textChannel = await guild.channels.create({ name: 'инструкция', type: ChannelType.GuildText, parent: category.id, permissionOverwrites: [{ id: guild.id, deny: [ PermissionFlagsBits.MentionEveryone, PermissionFlagsBits.SendMessages, PermissionFlagsBits.CreatePublicThreads, PermissionFlagsBits.CreatePrivateThreads, PermissionFlagsBits.ManageThreads] }] })
        
        let webhook = await textChannel.createWebhook({
            name: this.client.config.settings.webhook.name,
            avatar: `${__dirname}/../../assets/avatar.png`
        }) as Webhook

        let row1 = new ActionRowBuilder<ButtonBuilder>(), row2 = new ActionRowBuilder<ButtonBuilder>();
        let config = this.client.config.settings;
        for ( let i = 0; Object.keys(config.buttons).length > i; i++ ) {
            if(i % 2 === 0) {
                row1.addComponents(
                    new ButtonBuilder().setCustomId(Object.keys(config.buttons)[i]).setEmoji(this.client.emojisStorage.cache.get(Object.keys(config.buttons)[i])!.toString()).setStyle(config.style)
                )
            } else {
                row2.addComponents(
                    new ButtonBuilder().setCustomId(Object.keys(config.buttons)[i]).setEmoji(this.client.emojisStorage.cache.get(Object.keys(config.buttons)[i])!.toString()).setStyle(config.style)
                )
            }
        }

        webhook.send({embeds: [new EmbedBuilder().settingRoomEmbed(this.client)], components: [
            row1, row2
        ]})

        this.dbSet(`${guildId}.${category.id}`, {
            guildId: guildId,
            textChannelId: textChannel.id,
            voiceChannelId: voiceChannel.id,
            categoryId: category.id
        })

        return {
            guildId: guildId,
            textChannelId: textChannel.id,
            voiceChannelId: voiceChannel.id,
            categoryId: category.id
        }
    }
}

class RoomManager extends Collection<string, Room> {
    constructor(public db: DB, public client: Client) {
        super();
    }
    
    async dbGet(voiceChannelId: string): Promise<Room | undefined> {
        let result = this.get(`${voiceChannelId}`);
        if (!result) {
            result = await this.db.file.all('SELECT * FROM rooms WHERE voiceChannelId = ?', [voiceChannelId])[0];
            if(result)
                this.set(`${voiceChannelId}`, result);
        }
        return result;
    }
    dbSet(room: Room) {
        let roomDb = this.db.file.all('SELECT * FROM rooms WHERE voiceChannelId = ?', [room.voiceChannelId])[0];
        if(!roomDb) {
            this.db.file.run('INSERT INTO rooms (voiceChannelId, ownerId) VALUES (?, ?)', [room.voiceChannelId, room.ownerId]);
        } else
            this.db.file.run('UPDATE rooms SET ownerId = ? WHERE voiceChannelId = ?', [room.ownerId, room.voiceChannelId]);
        return this.set(`${room.voiceChannelId}`, room);
    }
    dbDelete(voiceChannelId: string) {

        let room = this.client.channels.cache.get(voiceChannelId);
        if(room) room.delete(); 

        this.db.file.run('DELETE FROM rooms WHERE voiceChannelId = ?', [voiceChannelId]);
        return this.delete(`${voiceChannelId}`);
    }
}

class SettingsManager extends Collection<string, Setting> {
    constructor(public db: DB, public client: Client) {
        super();
    }

    async dbGet(userId: string): Promise<Setting | undefined> {
        let result = this.get(`${userId}`);
        if (!result) {
            result = await this.db.file.all('SELECT * FROM settings WHERE userId = ?', [userId])[0];
            if(result)
                this.set(`${userId}`, result);
            else {
                result = {
                    userId: userId,
                    name: this.client.users.cache.get(userId)?.username || '???',
                    userLimit: 0,
                    locked: 0,
                    visible: 0,
                    leave: 0
                }
                this.set(`${userId}`, result);
                this.db.file.run('INSERT INTO settings (userId, name, userLimit, locked, visible, leave) VALUES (?, ?, ?, ?, ?, ?)', [result.userId, result.name, result.userLimit, result.locked, result.visible, result.leave]);
            }
        }
        return result;
    }

    dbSet(setting: Setting) {
        let settingDb = this.db.file.all('SELECT * FROM settings WHERE userId = ?', [setting.userId])[0];
        if(!settingDb) {
            this.db.file.run('INSERT INTO settings (userId, name, userLimit, locked, visible, leave) VALUES (?, ?, ?, ?, ?, ?)', [setting.userId, setting.name, setting.userLimit, setting.locked, setting.visible, setting.leave]);
        } else
            this.db.file.run('UPDATE settings SET name = ?, userLimit = ?, locked = ?, visible = ?, leave = ? WHERE userId = ?', [setting.name, setting.userLimit, setting.locked, setting.visible, setting.leave, setting.userId]);
        return this.set(`${setting.userId}`, setting);
    }

    dbDelete(guildId: string, userId: string) {
        this.db.file.run('DELETE FROM settings WHERE userId = ?', [userId]);
        return this.delete(`${userId}`);
    }

}

let db = new DB();

export default db;