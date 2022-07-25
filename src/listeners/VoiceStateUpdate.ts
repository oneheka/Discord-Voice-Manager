import { VoiceState } from 'discord.js'
import VoiceManager from '../struct/managers/VoiceManager'
import Event from '../struct/base/Event'
import Core from '../struct/Core'

export default new Event(
    'voiceStateUpdate',
    async (bot: Core, oldState: VoiceState, newState: VoiceState) => {
        if((oldState == null || (oldState && oldState?.channel == null)) && typeof newState == 'object') {
            await VoiceManager.onRoomJoin(bot, newState) 
        } else if(newState?.channel === null) {
            await VoiceManager.onRoomLeave(bot, oldState)
        } else if(oldState?.channel !== newState?.channel) {
            await VoiceManager.onRoomJoin(bot, newState)
            await VoiceManager.onRoomLeave(bot, oldState)
        }
    }
)