import type { InteractionReplyOptions, GuildMember, VoiceChannel } from "discord.js";
import type { Button, Modal, Select } from "@/struct/base/Interaction";
import { Collection, MessageFlags } from "discord.js";
import { Embeds } from "@/struct/utils/EmbedBuilder";
import { Logger } from "@/struct/utils/Logger";
import type { ActiveRoom } from "@/db/schema";
import type { Interaction } from "discord.js";
import { readdirSync } from "fs";
import { i18n } from "@/i18n";
import { join } from "path";
import { db } from "@/db";

export class InteractionHandler {
    private static buttons = new Collection<string, Button>()
    private static modals = new Collection<string, Modal>()
    private static selects = new Collection<string, Select>()

    public static async loadInteractions(): Promise<void> {
        const baseDir = join(import.meta.dir, '../../app/Interactions')

        await this.loadCategory<Button>(join(baseDir, 'Buttons'), this.buttons)
        await this.loadCategory<Modal>(join(baseDir, 'Modals'), this.modals)
        await this.loadCategory<Select>(join(baseDir, 'Selects'), this.selects)

        Logger.info(`Loaded interactions: ${this.buttons.size} buttons, ${this.modals.size} modals, ${this.selects.size} selects`)
    }

    private static async loadCategory<T extends { customId: string }>(dir: string, collection: Collection<string, T>): Promise<void> {
        const files = readdirSync(dir).filter((file) => file.endsWith('.ts') || file.endsWith('.js'))

        for (const file of files) {
            const module = await import(join(dir, file))
            const ItemClass = module.default || module[Object.keys(module)[0]]

            if (ItemClass && typeof ItemClass === 'function') {
                const instance: T = new ItemClass()
                collection.set(instance.customId, instance)
            }
        }
    }

    private static async resolveRoom(interaction: Interaction, requiresOwner: boolean): Promise<{ channel: VoiceChannel, activeRoom: ActiveRoom } | null> {
        const member = interaction.member as GuildMember

        if (!requiresOwner) {
            let activeRoom = member.voice.channelId ? await db.getActiveRoom(member.voice.channelId) : undefined
            if (!activeRoom) activeRoom = await db.getRoomByOwner(interaction.guild!.id, interaction.user.id)

            if (!activeRoom) {
                if (interaction.isRepliable()) await interaction.reply({ embeds: [ Embeds.error(i18n.responses.notInAnyRoom, interaction.guildId || undefined) ], flags: MessageFlags.Ephemeral }).catch(() => null)
                return null
            }

            const channel = interaction.guild!.channels.cache.get(activeRoom.channelId) as VoiceChannel | undefined
            if (!channel) {
                if (interaction.isRepliable()) await interaction.reply({ embeds: [ Embeds.error(i18n.responses.roomNotFound, interaction.guildId || undefined) ], flags: MessageFlags.Ephemeral }).catch(() => null)
                return null
            }

            return { channel, activeRoom }
        }

        const voiceChannelId = member.voice.channelId
        if (!voiceChannelId) {
            if (interaction.isRepliable()) await interaction.reply({ embeds: [ Embeds.error(i18n.responses.notInVoice, interaction.guildId || undefined) ], flags: MessageFlags.Ephemeral }).catch(() => null)
            return null
        }

        const activeRoom = await db.getActiveRoom(voiceChannelId)
        if (!activeRoom || activeRoom.ownerId !== interaction.user.id) {
            if (interaction.isRepliable()) await interaction.reply({ embeds: [ Embeds.error(i18n.responses.notOwner, interaction.guildId || undefined) ], flags: MessageFlags.Ephemeral }).catch(() => null)
            return null
        }

        const channel = interaction.guild!.channels.cache.get(voiceChannelId) as VoiceChannel | undefined
        if (!channel) {
            if (interaction.isRepliable()) await interaction.reply({ embeds: [ Embeds.error(i18n.responses.roomNotFound, interaction.guildId || undefined) ], flags: MessageFlags.Ephemeral }).catch(() => null)
            return null
        }

        return { channel, activeRoom }
    }

    public static async handle(interaction: Interaction): Promise<void> {
        if (!interaction.guild || !interaction.member) return

        try {
            if (interaction.isButton()) {
                const button = this.buttons.get(interaction.customId)
                if (!button) return

                const context = await this.resolveRoom(interaction, button.requiresOwner)
                if (context) await button.run(interaction, context.channel, context.activeRoom)
                return
            }

            if (interaction.isModalSubmit()) {
                const modal = this.modals.get(interaction.customId)
                if (!modal) return

                const context = await this.resolveRoom(interaction, modal.requiresOwner)
                if (context) await modal.run(interaction, context.channel, context.activeRoom)
                return
            }

            if (interaction.isUserSelectMenu()) {
                const select = this.selects.get(interaction.customId)
                if (!select) return

                const context = await this.resolveRoom(interaction, select.requiresOwner)
                if (context) await select.run(interaction, context.channel, context.activeRoom)
            }
        } catch (error: any) {
            if (error?.code === 10062 || error?.code === 40060) {
                return
            }

            Logger.error(`Error handling interaction ${interaction.id}`, error)
            if (interaction.isRepliable() && !interaction.replied) {
                const payload: InteractionReplyOptions = {
                    embeds: [ Embeds.error(i18n.responses.unknownError, interaction.guildId || undefined) ],
                    flags: MessageFlags.Ephemeral
                }
                if (interaction.deferred) {
                    await interaction.followUp(payload).catch(() => null)
                } else {
                    await interaction.reply(payload).catch(() => null)
                }
            }
        }
    }
}