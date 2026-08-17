import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from "discord.js";
import type { ButtonInteraction, VoiceChannel } from "discord.js";
import { Button } from "@/struct/base/Interaction";
import type { ActiveRoom } from "@/db/schema";
import { i18n } from "@/i18n";

export default class LimitButton extends Button {
    public readonly customId = 'limit'

    public async run(interaction: ButtonInteraction, channel: VoiceChannel, _activeRoom: ActiveRoom): Promise<void> {
        const modal = new ModalBuilder({
            customId: 'limit_modal',
            title: i18n.modals.limitTitle,
            components: [
                new ActionRowBuilder<TextInputBuilder>({
                    components: [
                        new TextInputBuilder({
                            customId: 'room_limit',
                            label: i18n.modals.limitLabel,
                            style: TextInputStyle.Short,
                            value: channel.userLimit.toString(),
                            placeholder: i18n.modals.limitPlaceholder,
                            minLength: 1,
                            maxLength: 2,
                            required: true
                        })
                    ]
                })
            ]
        })

        await interaction.showModal(modal)
    }
}