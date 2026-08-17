import type { ModalSubmitInteraction, VoiceChannel } from "discord.js";
import { Embeds } from "@/struct/utils/EmbedBuilder";
import { Modal } from "@/struct/base/Interaction";
import type { ActiveRoom } from "@/db/schema";
import { MessageFlags } from "discord.js";
import { i18n, format } from "@/i18n";
import { config } from "@/config";
import { db } from "@/db";

export default class RenameModal extends Modal {
    public readonly customId = 'rename_modal'

    public async run(interaction: ModalSubmitInteraction, channel: VoiceChannel, activeRoom: ActiveRoom): Promise<void> {
        const newName = interaction.fields.getTextInputValue('room_name').trim()

        if (!newName) {
            await interaction.reply({
                embeds: [ Embeds.error(i18n.responses.nameEmpty, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
            return
        }

        const now = Date.now()
        if (activeRoom.cooldown && activeRoom.cooldown > now) {
            const remainingSec = Math.ceil((activeRoom.cooldown - now) / 1000)
            await interaction.reply({
                embeds: [ Embeds.error(format(i18n.responses.cooldown, { seconds: remainingSec }), interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
            return
        }

        try {
            await channel.setName(newName)
            const nextCooldown = now + (config.cooldowns.rename * 1000)
            await db.updateRoomCooldown(channel.id, nextCooldown)
            await db.setUserCustomName(interaction.user.id, interaction.guildId!, newName)

            await interaction.reply({
                embeds: [ Embeds.success(format(i18n.responses.nameChanged, { name: newName }), interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        } catch {
            await interaction.reply({
                embeds: [ Embeds.error(i18n.responses.nameChangeFailed, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
        }
    }
}