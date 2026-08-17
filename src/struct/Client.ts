import { InteractionHandler } from "@/struct/helpers/InteractionHandler";
import { EventHandler } from "@/struct/helpers/EventHandler";
import type { ResolvedGuildConfig } from "@/types/config";
import { Client as DJSClient } from "discord.js";
import { Logger } from "@/struct/utils/Logger";
import { DatabaseManager, db } from "@/db";
import { config } from "@/config";

export class Client extends DJSClient {
    public db: DatabaseManager = db
    public config = config

    public constructor() {
        super({
            intents: config.client.intents
        })
    }

    public static getGuildConfig(guildId?: string): ResolvedGuildConfig {
        const guild = guildId ? config.guilds.get(guildId) : undefined
        return {
            language: guild?.language ?? config.language,
            defaultName: guild?.defaultName ?? config.defaultName,
            style: guild?.style ?? config.style,
            color: guild?.color ?? config.color,
            dot: guild?.dot ?? config.dot,
            line: guild?.line ?? config.line,
            buttons: {
                rename: { ...config.buttons.rename, ...guild?.buttons?.rename },
                limit: { ...config.buttons.limit, ...guild?.buttons?.limit },
                close: { ...config.buttons.close, ...guild?.buttons?.close },
                hide: { ...config.buttons.hide, ...guild?.buttons?.hide },
                user: { ...config.buttons.user, ...guild?.buttons?.user },
                speak: { ...config.buttons.speak, ...guild?.buttons?.speak },
                kick: { ...config.buttons.kick, ...guild?.buttons?.kick },
                reset: { ...config.buttons.reset, ...guild?.buttons?.reset },
                owner: { ...config.buttons.owner, ...guild?.buttons?.owner },
                info: { ...config.buttons.info, ...guild?.buttons?.info }
            },
            placeholder: guild?.placeholder,
            cooldowns: config.cooldowns
        }
    }

    public getGuildConfig(guildId?: string): ResolvedGuildConfig {
        return Client.getGuildConfig(guildId)
    }

    public async start(): Promise<void> {
        try {
            Logger.info('Initializing database and gateway events…')
            await EventHandler.loadEvents(this)
            await InteractionHandler.loadInteractions()
            await this.login(config.client.token)
        } catch (error) {
            Logger.error('Critical error during client startup', error)
            process.exit(1)
        }
    }
}