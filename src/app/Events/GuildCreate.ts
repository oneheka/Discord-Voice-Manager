import { AutoProvision } from "@/struct/utils/AutoProvision";
import type { Client } from "@/struct/Client";
import { Event } from "@/struct/base/Event";
import type { Guild } from "discord.js";

export default class GuildCreateEvent extends Event<'guildCreate'> {
    public readonly name = 'guildCreate'

    public async run(_client: Client, guild: Guild): Promise<void> {
        await AutoProvision.ensureGuildSetup(guild)
    }
}