import type { ButtonInteraction, VoiceChannel } from "discord.js";
import { Embeds } from "@/struct/utils/EmbedBuilder";
import { Button } from "@/struct/base/Interaction";
import type { ActiveRoom } from "@/db/schema";
import { MessageFlags } from "discord.js";
import { i18n } from "@/i18n";

export default class CloseButton extends Button {
    public readonly customId = 'close'

    public async run(interaction: ButtonInteraction, channel: VoiceChannel, _activeRoom: ActiveRoom): Promise<void> {
        const everyonePerms = channel.permissionOverwrites.cache.get(channel.guild.id)
        const isLocked = everyonePerms?.deny.has('Connect') ?? false

        if (isLocked) {
            await channel.permissionOverwrites.edit(channel.guild.id, { Connect: null })
            await interaction.reply({
                embeds: [ Embeds.success(i18n.responses.roomOpened, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        } else {
            await channel.permissionOverwrites.edit(channel.guild.id, { Connect: false })
            await interaction.reply({
                embeds: [ Embeds.warn(i18n.responses.roomClosed, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        }
    }
}