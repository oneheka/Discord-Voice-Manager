import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from "discord.js";
import type { ButtonInteraction, VoiceChannel } from "discord.js";
import { Button } from "@/struct/base/Interaction";
import type { ActiveRoom } from "@/db/schema";
import { i18n } from "@/i18n";

export default class RenameButton extends Button {
    public readonly customId = 'rename'

    public async run(interaction: ButtonInteraction, channel: VoiceChannel, _activeRoom: ActiveRoom): Promise<void> {
        const modal = new ModalBuilder({
            customId: 'rename_modal',
            title: i18n.modals.renameTitle,
            components: [
                new ActionRowBuilder<TextInputBuilder>({
                    components: [
                        new TextInputBuilder({
                            customId: 'room_name',
                            label: i18n.modals.renameLabel,
                            style: TextInputStyle.Short,
                            value: channel.name,
                            placeholder: i18n.modals.renamePlaceholder,
                            minLength: 1,
                            maxLength: 100,
                            required: true
                        })
                    ]
                })
            ]
        })

        await interaction.showModal(modal)
    }
}