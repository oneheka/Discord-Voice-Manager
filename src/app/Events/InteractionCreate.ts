import { InteractionHandler } from "@/struct/helpers/InteractionHandler";
import type { Interaction } from "discord.js";
import type { Client } from "@/struct/Client";
import { Event } from "@/struct/base/Event";

export default class InteractionCreateEvent extends Event<'interactionCreate'> {
    public readonly name = 'interactionCreate'

    public async run(_client: Client, interaction: Interaction): Promise<void> {
        await InteractionHandler.handle(interaction)
    }
}