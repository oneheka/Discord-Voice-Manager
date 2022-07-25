const VoiceManager = require('../structures/utils/VoiceManager.js')

class VoiceStateUpdate extends Event {
    constructor() {
        super("voiceStateUpdate")
    }

    async run(bot, oldState, newState) {
        let manager = new VoiceManager()
        if((oldState == null || (oldState && oldState?.channel == null)) && typeof newState == 'object') {
            await manager.onRoomJoin(bot, newState) 
        } else if(newState?.channel === null) {
            await manager.onRoomLeave(bot, oldState)
        } else if(oldState?.channel !== newState?.channel) {
            await manager.onRoomJoin(bot, newState)
            await manager.onRoomLeave(bot, oldState)
        }
    }
}

module.exports = VoiceStateUpdate