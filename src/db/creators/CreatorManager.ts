import type { CreateCreatorInput, Creator } from "@/db/creators/CreatorSchema";
import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import { creators } from "@/db/creators/CreatorSchema";
import type { DBSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

export class CreatorManager {
    public constructor(private readonly db: BunSQLiteDatabase<DBSchema>) {}

    public async get(guildId: string): Promise<Creator | undefined> {
        const result = await this.db.select().from(creators).where(eq(creators.guildId, guildId)).all()
        return result[0]
    }

    public async set(data: CreateCreatorInput): Promise<void> {
        await this.db.insert(creators).values(data).onConflictDoUpdate({
            target: creators.guildId,
            set: data
        }).run()
    }

    public async delete(guildId: string): Promise<void> {
        await this.db.delete(creators).where(eq(creators.guildId, guildId)).run()
    }

    public async getAll(): Promise<Creator[]> {
        return await this.db.select().from(creators).all()
    }
}