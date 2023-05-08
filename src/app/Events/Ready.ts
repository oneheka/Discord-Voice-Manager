import { VoiceChannel, TextChannel, ActionRowBuilder, ButtonBuilder, ChannelType } from 'discord.js';
import EmbedBuilder from '../../strcut/utils/EmbedBuilder';
import Event from '../../strcut/base/Event';
import Client from '../../strcut/Client';
import { ActivityType } from 'discord.js';
import colors from 'colors'

export default new Event(
    {
        name: 'ready',
        once: true
    },
    async (client: Client) => {
        client.logger.login(`Бот "${client.user!.tag}" зашел в сеть`)
        client.emojisStorage.init();
        let commandsList = client.commands.cache;
        let clientCommands = await client.application?.commands.fetch() || []
        clientCommands.forEach((command) => {
            if(!commandsList.has(command.name)) {
                command.delete();
            }
        })
        commandsList.forEach(async (command) => {
            //@ts-ignore
            if(!clientCommands.find(cmd => cmd.name === command.name)) {
                await client.application?.commands.create(command.options!);
            }
        });

        client.db.rooms.forEach(async (room) => {
            let channel = client.channels.cache.get(room.voiceChannelId) as VoiceChannel
            if(!channel) 
                return client.db.rooms.dbDelete(room.voiceChannelId)
            if(channel.members.size === 0) {
                channel.delete();
            }
        })
        if(!client.config.settings.debug)
            beautifulConsolePanel(client);
    }
)


function beautifulConsolePanel(client: Client) {
    setInterval( async () => {
        let titleWithoutColor = `${client.user!.tag} is online`;
        let title = `${client.user!.tag}`.blue + ` is ` + `online`.green;

        let commandsCount = `Commands count: ${client.commands.cache.size}`;
        let pingColor = client.ws.ping > 500 ? 'red' : client.ws.ping > 200 ? 'yellow' : 'green';
        //@ts-ignore
        let ping = `Ping: ` +`${client.ws.ping}ms`[pingColor];
        let pingWithoutColor = `Ping: ${client.ws.ping}ms`;
        let links = await client.emojisStorage.guilds.first()?.invites.cache;
        let emojiStroageLink = `Emojis storage: ` + `${links?.first()?.url}`.blue;
        let emojiStroageLinkWithoutColor = `Emojis storage: ${links?.first()?.url}`;

        let linesWithoutColor = [
            titleWithoutColor,
            commandsCount,
            pingWithoutColor,
            emojiStroageLinkWithoutColor
        ];

        let lines = [
            title,
            commandsCount,
            ping,
            emojiStroageLink
        ];

        let longestLine = Math.max(...linesWithoutColor.map(line => line.length));
        lines = lines.map( (line, i) => {
            let spaces = longestLine - linesWithoutColor[i].length;
            let space = '';
            for(let i = 0; i < spaces; i++) {
                space += ' ';
            }
            return `${line}${space}`
        })
        let text = ('\n   ╭' + '─'.repeat(longestLine + 6) + '╮\n').green
        + `   `+'│'.green +`   ${' '.repeat(longestLine)}   ` + '│'.green + `\n`
        + lines.map(line => `   `+'│'.green+`   ${line}   `+'│'.green+``).join('\n')
        + `\n   `+'│'.green+`   ${' '.repeat(longestLine)}   `+'│'.green
        + ('\n   ╰' + '─'.repeat(longestLine + 6) + '╯').green
        console.clear();
        console.log(text.bold);
    }, 1000 );
}