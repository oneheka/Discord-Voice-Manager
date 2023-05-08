import { Room, Setting } from './../../types/base/DB.d';
import { ButtonInteraction, CommandInteraction, GuildMember, Interaction, ModalSubmitInteraction } from 'discord.js';
import { ButtonRun, CommandRun, ModalRun } from '../../types/base/Interaction';
import EmbedBuilder from '../../strcut/utils/EmbedBuilder';
import Event from '../../strcut/base/Event';
import Client from '../../strcut/Client';

export default new Event(
    {
        name: 'interactionCreate'
    },
    async (client: Client, interaction: Interaction): Promise<any> => {
        const member = interaction.member as GuildMember
        const config = client.config.settings
        const room = client.db.rooms.get(`${member.voice?.channelId}`) as Room;
        const settings = await client.db.settings.dbGet(member.id) as Setting;

        if(interaction.isButton()) {
            const get = client.util.getButton(interaction.customId)
            if(get) {
                if(interaction.customId !== 'info' && room.ownerId !== member.id) {
                    return interaction.reply({
                        embeds: [ new EmbedBuilder().default(
                            member,
                            //@ts-ignore
                            config!.buttons[interaction.customId]?.title || 'Неизвестная интеракция',
                            'Вы **не** находитесь в **своей** приватной комнате'
                        ) ], ephemeral: true
                    })
                }

                return (get.run as ButtonRun)(client, interaction as ButtonInteraction<'cached'>, config)
            }
        }

        if(interaction.isCommand()) {
            const get = client.util.getCommand(interaction.commandName)
            if(get) {
                return (get.run as CommandRun)(client, interaction as CommandInteraction<'cached'>)
            }
        }

        if(interaction.isModalSubmit()) {
            const get = client.util.getModal(interaction.customId)
            if(get) {
                if(room.ownerId !== member.id) {
                    return interaction.reply({
                        embeds: [ new EmbedBuilder().default(
                            member,
                            //@ts-ignore
                            config!.buttons[interaction.customId]?.title || 'Неизвестная интеракция',
                            'Вы **не** находитесь в **своей** приватной комнате'
                        ) ], ephemeral: true
                    })
                }

                return (get.run as ModalRun)(client, interaction as ModalSubmitInteraction<'cached'>, config, settings, room)
            }
            return interaction.reply({ content: 'Неизвестная интеракция', ephemeral: true })
        }
    }
)