import type { UserSelectMenuInteraction, VoiceChannel } from "discord.js";
import { Embeds } from "@/struct/utils/EmbedBuilder";
import { Select } from "@/struct/base/Interaction";
import type { ActiveRoom } from "@/db/schema";
import { MessageFlags } from "discord.js";
import { i18n, format } from "@/i18n";

export default class UserKickSelect extends Select {
    public readonly customId = 'select_user_kick'

    public async run(interaction: UserSelectMenuInteraction, channel: VoiceChannel, _activeRoom: ActiveRoom): Promise<void> {
        const targetUserId = interaction.values[0]

        if (targetUserId === interaction.user.id) {
            await interaction.reply({
                embeds: [ Embeds.error(i18n.responses.cannotKickSelf, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
            return
        }

        const targetMember = channel.members.get(targetUserId)
        if (!targetMember) {
            await interaction.reply({
                embeds: [ Embeds.error(i18n.responses.targetNotInRoom, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
            return
        }

        try {
            await targetMember.voice.disconnect()
            await interaction.reply({
                embeds: [ Embeds.success(format(i18n.responses.userKicked, { user: targetUserId }), interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        } catch {
            await interaction.reply({
                embeds: [ Embeds.error(i18n.responses.kickFailed, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        }
    }
}