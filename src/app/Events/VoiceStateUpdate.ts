import type { VoiceState, VoiceChannel } from "discord.js";
import { VoiceManager } from "@/struct/utils/VoiceManager";
import type { Client } from "@/struct/Client";
import { Event } from "@/struct/base/Event";

export default class VoiceStateUpdateEvent extends Event<'voiceStateUpdate'> {
    public readonly name = 'voiceStateUpdate'

    public async run(_client: Client, oldState: VoiceState, newState: VoiceState): Promise<void> {
        if (oldState.channelId !== newState.channelId) {
            if (oldState.channel) {
                await VoiceManager.onRoomLeave(oldState.channel as VoiceChannel)
            }

            if (newState.channel && newState.member) {
                await VoiceManager.onRoomJoin(newState.member, newState.channel as VoiceChannel)
            }
        }
    }
}