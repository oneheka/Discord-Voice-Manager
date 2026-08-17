import type { UserSelectMenuInteraction, VoiceChannel } from "discord.js";
import { Embeds } from "@/struct/utils/EmbedBuilder";
import { Select } from "@/struct/base/Interaction";
import type { ActiveRoom } from "@/db/schema";
import { MessageFlags } from "discord.js";
import { i18n, format } from "@/i18n";

export default class UserSpeakSelect extends Select {
    public readonly customId = 'select_user_speak'

    public async run(interaction: UserSelectMenuInteraction, channel: VoiceChannel, _activeRoom: ActiveRoom): Promise<void> {
        const targetUserId = interaction.values[0]

        if (targetUserId === interaction.user.id) {
            await interaction.reply({
                embeds: [ Embeds.error(i18n.responses.cannotMuteSelf, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
            return
        }

        const currentOverwrites = channel.permissionOverwrites.cache.get(targetUserId)
        const isMuted = currentOverwrites?.deny.has('Speak') ?? false

        if (isMuted) {
            await channel.permissionOverwrites.edit(targetUserId, { Speak: true })
            await interaction.reply({
                embeds: [ Embeds.success(format(i18n.responses.userSpeakGranted, { user: targetUserId }), interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        } else {
            await channel.permissionOverwrites.edit(targetUserId, { Speak: false })
            await interaction.reply({
                embeds: [ Embeds.warn(format(i18n.responses.userSpeakDenied, { user: targetUserId }), interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        }
    }
}