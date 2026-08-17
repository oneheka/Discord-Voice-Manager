import type { UserSelectMenuInteraction, VoiceChannel } from "discord.js";
import { Embeds } from "@/struct/utils/EmbedBuilder";
import { Select } from "@/struct/base/Interaction";
import type { ActiveRoom } from "@/db/schema";
import { MessageFlags } from "discord.js";
import { i18n, format } from "@/i18n";
import { db } from "@/db";

export default class UserOwnerSelect extends Select {
    public readonly customId = 'select_user_owner'

    public async run(interaction: UserSelectMenuInteraction, channel: VoiceChannel, activeRoom: ActiveRoom): Promise<void> {
        const targetUserId = interaction.values[0]

        if (targetUserId === interaction.user.id) {
            await interaction.reply({
                embeds: [ Embeds.error(i18n.responses.cannotTransferSelf, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
            return
        }

        const targetMember = channel.members.get(targetUserId)
        if (!targetMember) {
            await interaction.reply({
                embeds: [ Embeds.error(i18n.responses.newOwnerMustBeInRoom, interaction.guildId || undefined) ],
                flags: MessageFlags.Ephemeral
            })
            return
        }

        await db.updateRoomOwner(channel.id, targetUserId)

        await channel.permissionOverwrites.edit(activeRoom.ownerId, {
            Connect: true,
            Speak: true,
            Stream: true,
            UseVAD: true,
            ViewChannel: true,
            PrioritySpeaker: null,
            CreateInstantInvite: null
        })

        await channel.permissionOverwrites.edit(targetUserId, {
            Connect: true,
            Speak: true,
            Stream: true,
            UseVAD: true,
            ViewChannel: true,
            PrioritySpeaker: true,
            CreateInstantInvite: true
        })

        await interaction.reply({
            embeds: [ Embeds.success(format(i18n.responses.ownerTransferred, { user: targetUserId }), interaction.guildId || undefined) ],
            flags: MessageFlags.Ephemeral
        })
    }
}