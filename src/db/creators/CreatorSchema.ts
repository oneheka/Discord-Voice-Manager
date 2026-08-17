import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const creators = sqliteTable('creators', {
    guildId: text('guild_id').primaryKey(),
    categoryId: text('category_id').notNull(),
    voiceTriggerId: text('voice_trigger_id').notNull(),
    textPanelId: text('text_panel_id').notNull(),
    panelMessageId: text('panel_message_id').notNull()
})

export type Creator = typeof creators.$inferSelect
export type CreateCreatorInput = typeof creators.$inferInsert