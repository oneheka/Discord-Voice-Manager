import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import Interaction from '../../strcut/base/Interaction';
import IGuildConfig from '../../types/GuildConfig';
import Client from '../../strcut/Client';

export default new Interaction(
    'rename',
    async (client: Client, button: ButtonInteraction<'cached'>, config: IGuildConfig) => {
        return button.showModal(
            new ModalBuilder()
            .setTitle(config.buttons[button.customId]!.title)
            .setCustomId('rename')
            .addComponents(
                new ActionRowBuilder<TextInputBuilder>()
                .addComponents(
                    new TextInputBuilder()
                    .setStyle(TextInputStyle.Short)
                    .setCustomId('name')
                    .setLabel('Новое имя')
                    .setPlaceholder('Укажите новое имя приватной комнаты')
                    .setValue(button.member.voice.channel!.name)
                    .setMaxLength(64)
                    .setMinLength(1)
                    .setRequired(true)
                )
            )
        )
    }
)