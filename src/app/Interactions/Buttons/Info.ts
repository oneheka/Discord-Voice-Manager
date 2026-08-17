import type { ButtonInteraction, GuildMember, VoiceChannel } from "discord.js";
import { Embeds } from "@/struct/utils/EmbedBuilder";
import { Button } from "@/struct/base/Interaction";
import type { ActiveRoom } from "@/db/schema";
import { MessageFlags } from "discord.js";

export default class InfoButton extends Button {
    public readonly customId = 'info'
    public override readonly requiresOwner = false

    public async run(interaction: ButtonInteraction, channel: VoiceChannel, activeRoom: ActiveRoom): Promise<void> {
        const embed = Embeds.infoRoomEmbed(channel, activeRoom.ownerId, activeRoom, interaction.member as GuildMember)
        await interaction.reply({
            embeds: [ embed ],
            flags: MessageFlags.Ephemeral
        })
    }
}