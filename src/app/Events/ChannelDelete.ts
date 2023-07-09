import { Channel } from "discord.js";
import Event from '../../strcut/base/Event';
import Client from '../../strcut/Client';

export default new Event(
    {
        name: 'channelDelete'
    },
    async (client: Client, channel: Channel): Promise<any> => {
        let creator = client.db.creators.find( c => c.categoryId === channel.id  || c.voiceChannelId === channel.id || c.textChannelId === channel.id);
        if(creator) {
            let voice = client.channels.cache.get(creator.voiceChannelId);
            let text = client.channels.cache.get(creator.textChannelId);
            let category = client.channels.cache.get(creator.categoryId);
            if(voice) voice.delete();
            if(text) text.delete();
            if(category) category.delete();
            client.db.creators.delete(`${creator.guildId}.${creator.categoryId}`);
        }
    }
)