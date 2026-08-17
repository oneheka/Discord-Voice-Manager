import { AutoProvision } from "@/struct/utils/AutoProvision";
import type { Client } from "@/struct/Client";
import { Event } from "@/struct/base/Event";
import type { Guild } from "discord.js";

export default class GuildDeleteEvent extends Event<'guildDelete'> {
    public readonly name = 'guildDelete'

    public async run(_client: Client, guild: Guild): Promise<void> {
        await AutoProvision.cleanupGuild(guild.id)
    }
}