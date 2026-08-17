import { UserSelectMenuBuilder, ActionRowBuilder, MessageFlags } from "discord.js";
import type { ButtonInteraction, VoiceChannel } from "discord.js";
import { Embeds } from "@/struct/utils/EmbedBuilder";
import { Button } from "@/struct/base/Interaction";
import type { ActiveRoom } from "@/db/schema";
import { Client } from "@/struct/Client";
import { i18n } from "@/i18n";

export default class OwnerButton extends Button {
    public readonly customId = 'user_owner'

    public async run(interaction: ButtonInteraction, _channel: VoiceChannel, _activeRoom: ActiveRoom): Promise<void> {
        const guildConfig = Client.getGuildConfig(interaction.guildId || undefined)
        const placeholder = guildConfig.placeholder?.owner || guildConfig.placeholder?.user || i18n.selects.ownerPlaceholder
        const selectMenu = new UserSelectMenuBuilder()
            .setCustomId('select_user_owner')
            .setPlaceholder(placeholder)
            .setMinValues(1)
            .setMaxValues(1)

        const row = new ActionRowBuilder<UserSelectMenuBuilder>().addComponents(selectMenu)

        await interaction.reply({
            embeds: [ Embeds.warn(i18n.selects.ownerPrompt, interaction.guildId || undefined) ],
            components: [ row ],
            flags: MessageFlags.Ephemeral
        })
    }
}