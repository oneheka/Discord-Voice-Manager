import type { ButtonInteraction, VoiceChannel } from "discord.js";
import { Embeds } from "@/struct/utils/EmbedBuilder";
import { Button } from "@/struct/base/Interaction";
import type { ActiveRoom } from "@/db/schema";
import { MessageFlags } from "discord.js";
import { i18n } from "@/i18n";

export default class HideButton extends Button {
    public readonly customId = 'hide'

    public async run(interaction: ButtonInteraction, channel: VoiceChannel, _activeRoom: ActiveRoom): Promise<void> {
        const everyonePerms = channel.permissionOverwrites.cache.get(channel.guild.id)
        const isHidden = everyonePerms?.deny.has('ViewChannel') ?? false

        if (isHidden) {
            await channel.permissionOverwrites.edit(channel.guild.id, { ViewChannel: null })
            await interaction.reply({
                embeds: [ Embeds.success(i18n.responses.roomVisible, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        } else {
            await channel.permissionOverwrites.edit(channel.guild.id, { ViewChannel: false })
            await interaction.reply({
                embeds: [ Embeds.warn(i18n.responses.roomHidden, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        }
    }
}