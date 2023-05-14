import { ActionRow, ActionRowBuilder, ButtonBuilder, Channel, Collection, TextChannel } from "discord.js";
import Event from '../../strcut/base/Event';
import Client from '../../strcut/Client';
import EmbedBuilder from "../../strcut/utils/EmbedBuilder";

export default new Event(
    {
        name: 'emojiStorageUpdate'
    },
    async (client: Client, channel: Channel): Promise<any> => {
        main(client, channel)
    }
)

function main(client: Client, channel: Channel) {
    try {
        let embeds = [new EmbedBuilder().settingRoomEmbed(client)]
        let components = [new ActionRowBuilder<ButtonBuilder>(), new ActionRowBuilder<ButtonBuilder>()]
        let config = client.config.settings
        let buttons = config.buttons
    
        Object.keys(buttons).forEach((btn, i) => {
            components[i % 2].addComponents(
                new ButtonBuilder().setCustomId(Object.keys(config.buttons)[i]).setEmoji(client.emojisStorage.cache.get(Object.keys(config.buttons)[i])!.toString()).setStyle(config.style)
            )
        })
    
        client.db.creators.forEach(async (creator) => {
            
            let textChannel = client.channels.cache.get(creator.textChannelId) as TextChannel
            if(textChannel) {
                try {
                    await textChannel.bulkDelete(100)
                    textChannel.fetchWebhooks().then(async webhooks => {
                        
                        let webhook;
                        if(!webhooks.size) {
                            webhook = await textChannel.createWebhook({
                                name: client.config.settings.webhook.name, 
                                avatar: `${__dirname}/../../../assets/avatar.png`
                            })
                        } else {
                            webhook = webhooks.find(webhook => webhook.owner!.id === client.user!.id)
                            if(webhook)
                                await webhook.edit({ name: client.config.settings.webhook.name, avatar: `${__dirname}/../../../assets/avatar.png` })
                        }
                        if(webhook) {
                            webhook?.send({embeds, components})
                        }
                    
                    })
                } catch(e) {}
            }
        })
    }

    catch(e) {
        setTimeout( () => {
            main(client, channel)
        }, 1000 )
    }
}