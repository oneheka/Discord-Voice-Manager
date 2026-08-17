import type { UserSelectMenuInteraction, VoiceChannel } from "discord.js";
import { Embeds } from "@/struct/utils/EmbedBuilder";
import { Select } from "@/struct/base/Interaction";
import type { ActiveRoom } from "@/db/schema";
import { MessageFlags } from "discord.js";
import { i18n, format } from "@/i18n";

export default class UserAccessSelect extends Select {
    public readonly customId = 'select_user_access'

    public async run(interaction: UserSelectMenuInteraction, channel: VoiceChannel, _activeRoom: ActiveRoom): Promise<void> {
        const targetUserId = interaction.values[0]

        if (targetUserId === interaction.user.id) {
            await interaction.reply({
                embeds: [ Embeds.error(i18n.responses.cannotTargetSelf, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
            return
        }

        const currentOverwrites = channel.permissionOverwrites.cache.get(targetUserId)
        const isDenied = currentOverwrites?.deny.has('Connect') ?? false

        if (isDenied) {
            await channel.permissionOverwrites.edit(targetUserId, { Connect: true, ViewChannel: true })
            await interaction.reply({
                embeds: [ Embeds.success(format(i18n.responses.userAccessGranted, { user: targetUserId }), interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        } else {
            await channel.permissionOverwrites.edit(targetUserId, { Connect: false })

            const targetMember = channel.guild.members.cache.get(targetUserId)
            if (targetMember && targetMember.voice.channelId === channel.id) {
                await targetMember.voice.disconnect().catch(() => null)
            }

            await interaction.reply({
                embeds: [ Embeds.warn(format(i18n.responses.userAccessDenied, { user: targetUserId }), interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        }
    }
}