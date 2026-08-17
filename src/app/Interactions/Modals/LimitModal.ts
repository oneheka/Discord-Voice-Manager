import type { ModalSubmitInteraction, VoiceChannel } from "discord.js";
import { Embeds } from "@/struct/utils/EmbedBuilder";
import { Modal } from "@/struct/base/Interaction";
import type { ActiveRoom } from "@/db/schema";
import { MessageFlags } from "discord.js";
import { i18n, format } from "@/i18n";
import { db } from "@/db";

export default class LimitModal extends Modal {
    public readonly customId = 'limit_modal'

    public async run(interaction: ModalSubmitInteraction, channel: VoiceChannel, _activeRoom: ActiveRoom): Promise<void> {
        const rawLimit = interaction.fields.getTextInputValue('room_limit').trim()
        const limit = parseInt(rawLimit, 10)

        if (isNaN(limit) || limit < 0 || limit > 99) {
            await interaction.reply({
                embeds: [ Embeds.error(i18n.responses.invalidLimit, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
            return
        }

        try {
            await channel.setUserLimit(limit)
            await db.setUserLimit(interaction.user.id, interaction.guildId!, limit)

            const responseMsg = limit === 0 ? i18n.responses.limitRemoved : format(i18n.responses.limitSet, { limit })
            await interaction.reply({
                embeds: [ Embeds.success(responseMsg, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        } catch {
            await interaction.reply({
                embeds: [ Embeds.error(i18n.responses.limitFailed, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        }
    }
}