import { GuildMember, ImageSize, User } from 'discord.js';
import IGuildConfig from '../../types/GuildConfig';
import Client from '../Client';

export default class Utils {
    constructor(
        private client: Client
    ) {}

    getButton(search: string) {
        return this.client.buttons.cache.get(search)
    }

    getModal(search: string) {
        return this.client.modals.cache.get(search)
    }

    resolveChannelName(config: IGuildConfig, member: GuildMember) {
        if(config.defaultName) {
            return `${config.defaultName.replace('{username}', member.displayName)}`
        } else return member.displayName
    }

    static getAvatar(member: GuildMember | User, size: ImageSize = 4096) {
        return member.displayAvatarURL({extension: 'png', forceStatic: false, size: size})
    }

    disconnectMember(member: GuildMember, id?: string) {
        if(member.voice?.channelId && ((id && member.voice.channelId === id) || !id)) {
            return member.voice.disconnect().catch(() => {})
        }
    }
}