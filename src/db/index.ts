import type { CreateActiveRoomInput, CreateCreatorInput, UserSetting, ActiveRoom, Creator, DBSchema } from "@/db/schema";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { CreatorManager } from "@/db/creators/CreatorManager";
import { RoomManager } from "@/db/rooms/RoomManager";
import { UserManager } from "@/db/users/UserManager";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { schema } from "@/db/schema";
import { mkdirSync } from "fs";

export class DatabaseManager {
    private static instance: DatabaseManager
    public db!: BunSQLiteDatabase<DBSchema>
    private sqlite!: Database
    public creators!: CreatorManager
    public rooms!: RoomManager
    public users!: UserManager

    private constructor() {
        mkdirSync('./data', { recursive: true })
        this.sqlite = new Database('./data/database.sqlite')
        this.sqlite.run('PRAGMA journal_mode = WAL;')
        this.initTables()
        this.db = drizzle(this.sqlite, { schema })
        this.creators = new CreatorManager(this.db)
        this.rooms = new RoomManager(this.db)
        this.users = new UserManager(this.db)
    }

    public static getInstance(): DatabaseManager {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager()
        }
        return DatabaseManager.instance
    }

    private initTables(): void {
        this.sqlite.run(`
            CREATE TABLE IF NOT EXISTS creators (
                guild_id TEXT PRIMARY KEY,
                category_id TEXT NOT NULL,
                voice_trigger_id TEXT NOT NULL,
                text_panel_id TEXT NOT NULL,
                panel_message_id TEXT NOT NULL
            );
        `)

        this.sqlite.run(`
            CREATE TABLE IF NOT EXISTS active_rooms (
                channel_id TEXT PRIMARY KEY,
                guild_id TEXT NOT NULL,
                owner_id TEXT NOT NULL,
                created_at INTEGER NOT NULL,
                cooldown INTEGER DEFAULT 0
            );
        `)

        this.sqlite.run(`
            CREATE TABLE IF NOT EXISTS user_settings (
                user_id TEXT NOT NULL,
                guild_id TEXT NOT NULL,
                custom_name TEXT DEFAULT '0',
                user_limit INTEGER DEFAULT 0,
                PRIMARY KEY (user_id, guild_id)
            );
        `)
    }

    public async getCreator(guildId: string): Promise<Creator | undefined> {
        return await this.creators.get(guildId)
    }

    public async setCreator(data: CreateCreatorInput): Promise<void> {
        await this.creators.set(data)
    }

    public async deleteCreator(guildId: string): Promise<void> {
        await this.creators.delete(guildId)
    }

    public async getAllCreators(): Promise<Creator[]> {
        return await this.creators.getAll()
    }

    public async getActiveRoom(channelId: string): Promise<ActiveRoom | undefined> {
        return await this.rooms.get(channelId)
    }

    public async getRoomByOwner(guildId: string, ownerId: string): Promise<ActiveRoom | undefined> {
        return await this.rooms.getByOwner(guildId, ownerId)
    }

    public async createActiveRoom(data: CreateActiveRoomInput): Promise<void> {
        await this.rooms.create(data)
    }

    public async updateRoomOwner(channelId: string, newOwnerId: string): Promise<void> {
        await this.rooms.updateOwner(channelId, newOwnerId)
    }

    public async updateRoomCooldown(channelId: string, cooldown: number): Promise<void> {
        await this.rooms.updateCooldown(channelId, cooldown)
    }

    public async deleteActiveRoom(channelId: string): Promise<void> {
        await this.rooms.delete(channelId)
    }

    public async getActiveRoomsByGuild(guildId: string): Promise<ActiveRoom[]> {
        return await this.rooms.getByGuild(guildId)
    }

    public async getAllActiveRooms(): Promise<ActiveRoom[]> {
        return await this.rooms.getAll()
    }

    public async getUserSetting(userId: string, guildId: string): Promise<UserSetting | undefined> {
        return await this.users.get(userId, guildId)
    }

    public async setUserCustomName(userId: string, guildId: string, customName: string): Promise<void> {
        await this.users.setCustomName(userId, guildId, customName)
    }

    public async setUserLimit(userId: string, guildId: string, userLimit: number): Promise<void> {
        await this.users.setUserLimit(userId, guildId, userLimit)
    }

    public async resetUserSettings(userId: string, guildId: string): Promise<void> {
        await this.users.reset(userId, guildId)
    }
}

export const db = DatabaseManager.getInstance()