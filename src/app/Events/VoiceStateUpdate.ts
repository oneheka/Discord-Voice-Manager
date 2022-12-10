import { VoiceState } from 'discord.js';
import VoiceManager from '../../strcut/utils/VoiceManager';
import Event from '../../strcut/base/Event';
import Client from '../../strcut/Client';

export default new Event(
    {
        name: 'voiceStateUpdate'
    },
    async (client: Client, oldState: VoiceState, newState: VoiceState): Promise<any> => {
        if(!oldState?.channel && newState?.channel) {
            return VoiceManager.onRoomJoin(client, newState)
        } else if(oldState?.channel && !newState?.channel) {
            return VoiceManager.onRoomLeave(client, oldState)
        } else if(oldState?.channel !== newState.channel) {
            Promise.all([
                await VoiceManager.onRoomJoin(client, newState),
                await VoiceManager.onRoomLeave(client, oldState)
            ])
        }
    }
)