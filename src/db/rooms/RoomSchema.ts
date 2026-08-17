import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const activeRooms = sqliteTable('active_rooms', {
    channelId: text('channel_id').primaryKey(),
    guildId: text('guild_id').notNull(),
    ownerId: text('owner_id').notNull(),
    createdAt: integer('created_at').notNull(),
    cooldown: integer('cooldown').default(0)
})

export type ActiveRoom = typeof activeRooms.$inferSelect
export type CreateActiveRoomInput = typeof activeRooms.$inferInsert