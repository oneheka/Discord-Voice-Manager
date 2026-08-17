import type { ButtonInteraction, VoiceChannel } from "discord.js";
import { Embeds } from "@/struct/utils/EmbedBuilder";
import { Button } from "@/struct/base/Interaction";
import type { ActiveRoom } from "@/db/schema";
import { MessageFlags } from "discord.js";
import { i18n } from "@/i18n";

export default class ResetButton extends Button {
    public readonly customId = 'reset_perms'

    public async run(interaction: ButtonInteraction, channel: VoiceChannel, activeRoom: ActiveRoom): Promise<void> {
        const overwrites = channel.permissionOverwrites.cache

        for (const [id] of overwrites) {
            if (id !== activeRoom.ownerId && id !== channel.guild.id && id !== interaction.client.user.id) {
                await channel.permissionOverwrites.delete(id).catch(() => null)
            }
        }

        await channel.permissionOverwrites.edit(channel.guild.id, {
            Connect: null,
            ViewChannel: null
        })

        await channel.permissionOverwrites.edit(activeRoom.ownerId, {
            Connect: true,
            Speak: true,
            Stream: true,
            UseVAD: true,
            ViewChannel: true,
            PrioritySpeaker: true,
            CreateInstantInvite: true
        })

        await interaction.reply({
            embeds: [ Embeds.success(i18n.responses.resetSuccess, interaction.guildId || undefined) ],
            flags: MessageFlags.Ephemeral
        })
    }
}