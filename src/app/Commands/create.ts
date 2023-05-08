import { ApplicationCommandType, CommandInteraction, GuildMember, Message, PermissionFlagsBits } from 'discord.js'
import Client from '../../strcut/Client'
import Interaction from '../../strcut/base/Interaction'
import EmbedBuilder from '../../strcut/utils/EmbedBuilder'

//@ts-ignore
export default new Interaction('create-voice', 
	async (client: Client, interaction: CommandInteraction) => {
        client.db.creators.create(interaction.guild!.id)
		interaction.reply({ embeds: [new EmbedBuilder().default(interaction.member as GuildMember, 'Успех', 'Система управления приватными каналами успешно создана')], ephemeral: true })
		return 
	},
	{
		name: 'create-voice',
		type: ApplicationCommandType.ChatInput,
		description: 'Создать систему управления приватными каналами',
		defaultMemberPermissions: PermissionFlagsBits.Administrator
	}
)
