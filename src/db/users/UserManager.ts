import type { BunSQLiteDatabase } from "drizzle-orm/bun-sqlite";
import type { UserSetting } from "@/db/users/UserSchema";
import { userSettings } from "@/db/users/UserSchema";
import type { DBSchema } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export class UserManager {
    public constructor(private readonly db: BunSQLiteDatabase<DBSchema>) {}

    public async get(userId: string, guildId: string): Promise<UserSetting | undefined> {
        const result = await this.db.select().from(userSettings).where(
            and(
                eq(userSettings.userId, userId),
                eq(userSettings.guildId, guildId)
            )
        ).all()
        return result[0]
    }

    public async setCustomName(userId: string, guildId: string, customName: string): Promise<void> {
        await this.db.insert(userSettings).values({
            userId,
            guildId,
            customName,
            userLimit: 0
        }).onConflictDoUpdate({
            target: [userSettings.userId, userSettings.guildId],
            set: {
                customName
            }
        }).run()
    }

    public async setUserLimit(userId: string, guildId: string, userLimit: number): Promise<void> {
        await this.db.insert(userSettings).values({
            userId,
            guildId,
            customName: '0',
            userLimit
        }).onConflictDoUpdate({
            target: [userSettings.userId, userSettings.guildId],
            set: {
                userLimit
            }
        }).run()
    }

    public async reset(userId: string, guildId: string): Promise<void> {
        await this.db.delete(userSettings).where(
            and(
                eq(userSettings.userId, userId),
                eq(userSettings.guildId, guildId)
            )
        ).run()
    }
}