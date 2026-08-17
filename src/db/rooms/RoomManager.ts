import type { CreateActiveRoomInput, ActiveRoom } from "@/db/rooms/RoomSchema";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { activeRooms } from "@/db/rooms/RoomSchema";
import type { DBSchema } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export class RoomManager {
    public constructor(private readonly db: BunSQLiteDatabase<DBSchema>) {}

    public async get(channelId: string): Promise<ActiveRoom | undefined> {
        const result = await this.db.select().from(activeRooms).where(eq(activeRooms.channelId, channelId)).all()
        return result[0]
    }

    public async getByOwner(guildId: string, ownerId: string): Promise<ActiveRoom | undefined> {
        const result = await this.db.select().from(activeRooms).where(
            and(
                eq(activeRooms.guildId, guildId),
                eq(activeRooms.ownerId, ownerId)
            )
        ).all()
        return result[0]
    }

    public async create(data: CreateActiveRoomInput): Promise<void> {
        await this.db.insert(activeRooms).values({
            channelId: data.channelId,
            guildId: data.guildId,
            ownerId: data.ownerId,
            createdAt: data.createdAt,
            cooldown: data.cooldown ?? 0
        }).run()
    }

    public async updateOwner(channelId: string, newOwnerId: string): Promise<void> {
        await this.db.update(activeRooms).set({
            ownerId: newOwnerId
        }).where(eq(activeRooms.channelId, channelId)).run()
    }

    public async updateCooldown(channelId: string, cooldown: number): Promise<void> {
        await this.db.update(activeRooms).set({
            cooldown
        }).where(eq(activeRooms.channelId, channelId)).run()
    }

    public async delete(channelId: string): Promise<void> {
        await this.db.delete(activeRooms).where(eq(activeRooms.channelId, channelId)).run()
    }

    public async getByGuild(guildId: string): Promise<ActiveRoom[]> {
        return await this.db.select().from(activeRooms).where(eq(activeRooms.guildId, guildId)).all()
    }

    public async getAll(): Promise<ActiveRoom[]> {
        return await this.db.select().from(activeRooms).all()
    }
}