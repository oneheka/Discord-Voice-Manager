import { AutoProvision } from "@/struct/utils/AutoProvision";
import { VoiceManager } from "@/struct/utils/VoiceManager";
import { ChannelType, Events } from "discord.js";
import { Logger } from "@/struct/utils/Logger";
import type { VoiceChannel } from "discord.js";
import { Event } from "@/struct/base/Event";
import type { Client } from "@/struct/Client";
import { db } from "@/db";

export default class ReadyEvent extends Event<Events.ClientReady> {
    public readonly name = Events.ClientReady
    public override readonly once = true

    public async run(client: Client): Promise<void> {
        Logger.success(`Logged in as ${client.user?.tag} (${client.user?.id})`)
        Logger.info(`Serving ${client.guilds.cache.size} guilds`)

        await AutoProvision.ensureAllGuilds(client)

        const activeRooms = await db.getAllActiveRooms()
        for (const room of activeRooms) {
            const channel = client.channels.cache.get(room.channelId) as VoiceChannel | undefined
            if (!channel || channel.members.size === 0) {
                if (channel) await channel.delete().catch(() => null)
                await db.deleteActiveRoom(room.channelId)
            }
        }

        for (const [, guild] of client.guilds.cache) {
            const creator = await db.getCreator(guild.id)
            if (!creator) continue

            const category = guild.channels.cache.get(creator.categoryId)
            if (category) {
                const orphanedChannels = guild.channels.cache.filter((ch) =>
                    ch.parentId === category.id &&
                    ch.type === ChannelType.GuildVoice &&
                    ch.id !== creator.voiceTriggerId
                )

                for (const [, ch] of orphanedChannels) {
                    const voiceCh = ch as VoiceChannel
                    const room = await db.getActiveRoom(voiceCh.id)
                    if (!room || voiceCh.members.size === 0) {
                        await voiceCh.delete().catch(() => null)
                        if (room) await db.deleteActiveRoom(voiceCh.id)
                    }
                }
            }

            const triggerChannel = guild.channels.cache.get(creator.voiceTriggerId) as VoiceChannel | undefined
            if (triggerChannel) {
                for (const [, member] of triggerChannel.members) {
                    await VoiceManager.onRoomJoin(member, triggerChannel)
                }
            }
        }
    }
}