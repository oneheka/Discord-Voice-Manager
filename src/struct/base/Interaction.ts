import type { ButtonInteraction, ModalSubmitInteraction, UserSelectMenuInteraction, VoiceChannel } from "discord.js";
import type { ActiveRoom } from "@/db/schema";

export abstract class Button {
    public abstract readonly customId: string
    public readonly requiresOwner: boolean = true

    public abstract run(interaction: ButtonInteraction, channel: VoiceChannel, activeRoom: ActiveRoom): Promise<void>
}

export abstract class Modal {
    public abstract readonly customId: string
    public readonly requiresOwner: boolean = true

    public abstract run(interaction: ModalSubmitInteraction, channel: VoiceChannel, activeRoom: ActiveRoom): Promise<void>
}

export abstract class Select {
    public abstract readonly customId: string
    public readonly requiresOwner: boolean = true

    public abstract run(interaction: UserSelectMenuInteraction, channel: VoiceChannel, activeRoom: ActiveRoom): Promise<void>
}