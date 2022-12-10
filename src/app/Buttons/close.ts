import { ButtonInteraction } from 'discord.js';
import EmbedBuilder from '../../strcut/utils/EmbedBuilder';
import Interaction from '../../strcut/base/Interaction';
import IGuildConfig from '../../types/GuildConfig';
import Client from '../../strcut/Client';

export default new Interaction(
    'close',
    async (client: Client, button: ButtonInteraction<'cached'>, config: IGuildConfig): Promise<any> => {
        await button.deferReply({ephemeral: true})

        const voice = button.member.voice.channel!
        const closed = voice.permissionOverwrites.cache.get(button.guildId)
        let state: boolean

        if(closed && closed.deny.has('Connect')) {
            await voice.permissionOverwrites.edit(button.guildId, {Connect: true})
            state = true
        } else {
            await voice.permissionOverwrites.edit(button.guildId, {Connect: false})
            state = false
        }

        return button.editReply({
            embeds: [ new EmbedBuilder().default(
                button.member,
                config.buttons[button.customId]!.title,
                `Вы успешно **${state?'открыли':'закрыли'}** комнату ${voice.toString()} от @everyone`
            ) ]
        })
    }
)