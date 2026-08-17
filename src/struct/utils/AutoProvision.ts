import { ActionRowBuilder, ButtonBuilder, ChannelType, PermissionFlagsBits } from "discord.js";
import type { Guild, CategoryChannel, VoiceChannel, TextChannel, Message } from "discord.js";
import { Embeds } from "@/struct/utils/EmbedBuilder";
import { Logger } from "@/struct/utils/Logger";
import { Client } from "@/struct/Client";
import { i18n } from "@/i18n";
import { db } from "@/db";

export class AutoProvision {
    public static getPanelComponents(guildId?: string): ActionRowBuilder<ButtonBuilder>[] {
        const guildConfig = Client.getGuildConfig(guildId)

        const row1 = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId('rename')
                .setEmoji(guildConfig.buttons.rename.emoji)
                .setStyle(guildConfig.style),
            new ButtonBuilder()
                .setCustomId('limit')
                .setEmoji(guildConfig.buttons.limit.emoji)
                .setStyle(guildConfig.style),
            new ButtonBuilder()
                .setCustomId('close')
                .setEmoji(guildConfig.buttons.close.emoji)
                .setStyle(guildConfig.style),
            new ButtonBuilder()
                .setCustomId('hide')
                .setEmoji(guildConfig.buttons.hide.emoji)
                .setStyle(guildConfig.style),
            new ButtonBuilder()
                .setCustomId('user_access')
                .setEmoji(guildConfig.buttons.user.emoji)
                .setStyle(guildConfig.style)
        )

        const row2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
            new ButtonBuilder()
                .setCustomId('user_speak')
                .setEmoji(guildConfig.buttons.speak.emoji)
                .setStyle(guildConfig.style),
            new ButtonBuilder()
                .setCustomId('user_kick')
                .setEmoji(guildConfig.buttons.kick.emoji)
                .setStyle(guildConfig.style),
            new ButtonBuilder()
                .setCustomId('user_owner')
                .setEmoji(guildConfig.buttons.owner.emoji)
                .setStyle(guildConfig.style),
            new ButtonBuilder()
                .setCustomId('reset_perms')
                .setEmoji(guildConfig.buttons.reset.emoji)
                .setStyle(guildConfig.style),
            new ButtonBuilder()
                .setCustomId('info')
                .setEmoji(guildConfig.buttons.info.emoji)
                .setStyle(guildConfig.style)
        )

        return [row1, row2]
    }

    public static async ensureGuildSetup(guild: Guild): Promise<void> {
        try {
            const me = guild.members.me
            if (!me || !me.permissions.has(PermissionFlagsBits.ManageChannels)) {
                Logger.warn(`Missing ManageChannels permission in guild "${guild.name}" (${guild.id})`)
                return
            }

            const existingCreator = await db.getCreator(guild.id)
            let category: CategoryChannel | null = null
            let voiceTrigger: VoiceChannel | null = null
            let textPanel: TextChannel | null = null
            let panelMessage: Message | null = null

            if (existingCreator) {
                category = (guild.channels.cache.get(existingCreator.categoryId) as CategoryChannel | undefined) ?? null
                voiceTrigger = (guild.channels.cache.get(existingCreator.voiceTriggerId) as VoiceChannel | undefined) ?? null
                textPanel = (guild.channels.cache.get(existingCreator.textPanelId) as TextChannel | undefined) ?? null

                if (textPanel) {
                    try {
                        panelMessage = await textPanel.messages.fetch(existingCreator.panelMessageId).catch(() => null)
                    } catch {
                        panelMessage = null
                    }
                }
            }

            if (!category) {
                category = await guild.channels.create({
                    name: i18n.names.category,
                    type: ChannelType.GuildCategory
                })
            }

            if (!voiceTrigger || voiceTrigger.parentId !== category.id) {
                voiceTrigger = await guild.channels.create({
                    name: i18n.names.voiceTrigger,
                    type: ChannelType.GuildVoice,
                    parent: category.id
                })
            }

            if (!textPanel || textPanel.parentId !== category.id) {
                textPanel = await guild.channels.create({
                    name: i18n.names.textPanel,
                    type: ChannelType.GuildText,
                    parent: category.id,
                    permissionOverwrites: [
                        {
                            id: guild.id,
                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory],
                            deny: [
                                PermissionFlagsBits.SendMessages,
                                PermissionFlagsBits.AddReactions,
                                PermissionFlagsBits.CreatePublicThreads,
                                PermissionFlagsBits.CreatePrivateThreads
                            ]
                        },
                        {
                            id: me.id,
                            allow: [
                                PermissionFlagsBits.ViewChannel,
                                PermissionFlagsBits.SendMessages,
                                PermissionFlagsBits.EmbedLinks,
                                PermissionFlagsBits.AttachFiles,
                                PermissionFlagsBits.ReadMessageHistory
                            ]
                        }
                    ]
                })
                panelMessage = null
            }

            if (textPanel) {
                const embed = Embeds.settingRoomEmbed(guild.id)
                const components = this.getPanelComponents(guild.id)

                if (panelMessage) {
                    await panelMessage.edit({
                        embeds: [embed],
                        components
                    }).catch(() => null)
                } else {
                    panelMessage = await textPanel.send({
                        embeds: [embed],
                        components
                    })
                }
            }

            if (category && voiceTrigger && textPanel && panelMessage) {
                await db.setCreator({
                    guildId: guild.id,
                    categoryId: category.id,
                    voiceTriggerId: voiceTrigger.id,
                    textPanelId: textPanel.id,
                    panelMessageId: panelMessage.id
                })
                Logger.info(`Guild "${guild.name}" (${guild.id}) successfully provisioned`)
            }
        } catch (error) {
            Logger.error(`Error during auto-provisioning in guild "${guild.name}" (${guild.id})`, error)
        }
    }

    public static async ensureAllGuilds(client: Client): Promise<void> {
        for (const [, guild] of client.guilds.cache) {
            await this.ensureGuildSetup(guild)
        }
    }

    public static async cleanupGuild(guildId: string): Promise<void> {
        const rooms = await db.getActiveRoomsByGuild(guildId)
        for (const room of rooms) {
            await db.deleteActiveRoom(room.channelId)
        }
        await db.deleteCreator(guildId)
        Logger.info(`Cleaned up data for guild ${guildId}`)
    }
}