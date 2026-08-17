import type { DMChannel, NonThreadGuildBasedChannel } from "discord.js";
import { AutoProvision } from "@/struct/utils/AutoProvision";
import type { Client } from "@/struct/Client";
import { Event } from "@/struct/base/Event";
import { db } from "@/db";

export default class ChannelDeleteEvent extends Event<'channelDelete'> {
    public readonly name = 'channelDelete'

    public async run(_client: Client, channel: DMChannel | NonThreadGuildBasedChannel): Promise<void> {
        if (!('guild' in channel)) return

        const activeRoom = await db.getActiveRoom(channel.id)
        if (activeRoom) {
            await db.deleteActiveRoom(channel.id)
            return
        }

        const creator = await db.getCreator(channel.guild.id)
        if (creator) {
            const creatorChannelIds = [creator.categoryId, creator.voiceTriggerId, creator.textPanelId]
            if (creatorChannelIds.includes(channel.id)) {
                await AutoProvision.ensureGuildSetup(channel.guild)
            }
        }
    }
}