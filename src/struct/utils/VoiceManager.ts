import { ChannelType, PermissionFlagsBits } from "discord.js";
import type { GuildMember, VoiceChannel } from "discord.js";
import { Logger } from "@/struct/utils/Logger";
import { Client } from "@/struct/Client";
import { db } from "@/db";

export class VoiceManager {
    private static creationLocks = new Set<string>()

    public static async onRoomJoin(member: GuildMember, triggerChannel: VoiceChannel): Promise<void> {
        const creator = await db.getCreator(triggerChannel.guild.id)
        if (!creator || triggerChannel.id !== creator.voiceTriggerId) {
            return
        }

        if (this.creationLocks.has(member.id)) {
            return
        }

        this.creationLocks.add(member.id)

        try {
            const existingRoom = await db.getRoomByOwner(member.guild.id, member.id)
            if (existingRoom) {
                const existingChannel = member.guild.channels.cache.get(existingRoom.channelId) as VoiceChannel | undefined
                if (existingChannel) {
                    try {
                        if (member.voice.channelId) {
                            await member.voice.setChannel(existingChannel.id)
                        }
                        return
                    } catch {
                        await db.deleteActiveRoom(existingRoom.channelId)
                    }
                } else {
                    await db.deleteActiveRoom(existingRoom.channelId)
                }
            }

            const guildConfig = Client.getGuildConfig(member.guild.id)
            const userSetting = await db.getUserSetting(member.id, member.guild.id)
            let channelName = guildConfig.defaultName.replace('{username}', member.displayName)
            let userLimit = 0

            if (userSetting) {
                if (userSetting.customName && userSetting.customName !== '0') {
                    channelName = userSetting.customName
                }
                if (userSetting.userLimit) {
                    userLimit = userSetting.userLimit
                }
            }

            const createdChannel = await member.guild.channels.create({
                name: channelName,
                type: ChannelType.GuildVoice,
                parent: creator.categoryId,
                userLimit,
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: [
                            PermissionFlagsBits.Connect,
                            PermissionFlagsBits.Speak,
                            PermissionFlagsBits.Stream,
                            PermissionFlagsBits.UseVAD,
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.PrioritySpeaker,
                            PermissionFlagsBits.CreateInstantInvite
                        ]
                    }
                ]
            })

            try {
                if (!member.voice.channelId) {
                    await createdChannel.delete()
                    return
                }
                await member.voice.setChannel(createdChannel.id)
            } catch {
                await createdChannel.delete().catch(() => null)
                return
            }

            await db.createActiveRoom({
                channelId: createdChannel.id,
                guildId: member.guild.id,
                ownerId: member.id,
                createdAt: Date.now()
            })

            Logger.info(`Created room "${channelName}" for ${member.user.tag} (${member.id})`)
        } catch (error) {
            Logger.error(`Failed to create room for ${member.user.tag}`, error)
        } finally {
            this.creationLocks.delete(member.id)
        }
    }

    public static async onRoomLeave(channel: VoiceChannel): Promise<void> {
        try {
            const activeRoom = await db.getActiveRoom(channel.id)
            if (!activeRoom) {
                return
            }

            if (channel.members.size === 0) {
                await channel.delete().catch(() => null)
                await db.deleteActiveRoom(channel.id)
                Logger.info(`Deleted empty room "${channel.name}" (${channel.id})`)
            }
        } catch (error) {
            Logger.error(`Error checking room deletion (${channel.id})`, error)
        }
    }
}