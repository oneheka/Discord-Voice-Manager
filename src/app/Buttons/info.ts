import { ButtonInteraction, InteractionCollector, Client as DJSClient, ChannelSelectMenuInteraction } from 'discord.js';
import ActionRowBuilder from '../../strcut/utils/ActionRowBuilder';
import EmbedBuilder from '../../strcut/utils/EmbedBuilder';
import Interaction from '../../strcut/base/Interaction';
import IGuildConfig from '../../types/GuildConfig';
import Client from '../../strcut/Client';

export default new Interaction(
    'info',
    async (client: Client, button: ButtonInteraction<'cached'> , config: IGuildConfig): Promise<any> => {
        await button.deferReply({ephemeral: true, fetchReply: true })

        const fetch = await button.editReply({
            embeds: [
                new EmbedBuilder().default(
                    button.member,
                    config.buttons[button.customId]!.title,
                    `выберите **приватную комнату**`
                )
            ],
            components: [
                new ActionRowBuilder().menuChannel('info', config.placeholder.channel),
                new ActionRowBuilder().buttonRoom(!Boolean(button.member.voice?.channel))
            ]
        })

        const collector = new InteractionCollector(
            client as DJSClient<true>,
            { message: fetch }
        )

        collector.on('collect', async (interaction: ChannelSelectMenuInteraction<'cached'> | ButtonInteraction<'cached'>): Promise<any> => {
            collector.resetTimer({time: 30_000})

            if(interaction.isChannelSelectMenu()) {
                await (await import('./Collectors/info/infoMenu')).default(client, button, interaction, config)
            } else if(interaction.isButton()) {
                switch(interaction.customId) {
                    case 'voiceChannel':
                        await (await import('./Collectors/info/infoButton')).default(client, button, interaction, config)
                        break
                    default:
                        const split = interaction.customId.split('.')[0]
                        switch(split) {
                            case 'checkMembersPermission':
                                await (await import('./Collectors/info/permissions')).default(client, button, interaction, config)
                                break
                            case 'leave':
                                await (await import('./Collectors/info/infoButton')).default(client, button, interaction, config)
                                break
                            case 'back':
                                await (await import('./Collectors/info/permissionsBack')).default(client, button, interaction, config)
                                break
                            case 'forward':
                                await (await import('./Collectors/info/permissionsForward')).default(client, button, interaction, config)
                                break
                        }
                        break
                }
            }

            if(!interaction.replied && !interaction.deferred) {
                return interaction.deferUpdate()
            }
        })

        collector.on('end', (collected, reasone: string): any => {
            if(reasone === 'time') {
                return button.editReply({
                    embeds: [
                        new EmbedBuilder().default(
                            button.member,
                            config.buttons[button.customId]!.title,
                            `Время на **ответ** вышло`
                        )
                    ],
                    components: [ new ActionRowBuilder().menuChannel('info', config.placeholder.channel, true) ]
                })
            }
        })
    }
)
