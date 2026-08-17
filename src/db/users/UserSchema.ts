import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";

export const userSettings = sqliteTable('user_settings', {
    userId: text('user_id').notNull(),
    guildId: text('guild_id').notNull(),
    customName: text('custom_name').default('0'),
    userLimit: integer('user_limit').default(0)
}, (table) => [
    primaryKey({ columns: [table.userId, table.guildId] })
])

export type UserSetting = typeof userSettings.$inferSelect
export type CreateUserSettingInput = typeof userSettings.$inferInsert