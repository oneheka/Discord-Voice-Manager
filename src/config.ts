import type { GuildConfig, SupportedLanguage } from "@/types/config";
import { GatewayIntentBits, ButtonStyle, Collection } from "discord.js";

export const config = {
    // Default bot language (e.g. 'en', 'ru', 'de', 'es', 'fr', 'ja', 'ko', 'pt', 'uk', 'zh')
    language: 'en' as SupportedLanguage,

    client: {
        // Discord bot token (loaded from DISCORD_TOKEN environment variable in .env)
        token: process.env.DISCORD_TOKEN || '',
        // Gateway intents (basic intents only, zero privileged intents required)
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildVoiceStates
        ]
    },

    cooldowns: {
        // Cooldown between room renaming attempts (in seconds)
        rename: 120
    },

    // Default template for created voice rooms ({username} is replaced with member display name)
    defaultName: '⭐ {username}',

    // Control panel button style (Secondary, Primary, Success, Danger)
    style: ButtonStyle.Secondary,

    // Primary embed color (HEX integer)
    color: 0x2f3136,

    // Optional bullet marker before each button in the panel description (e.g. '🔹' or undefined)
    dot: undefined as string | undefined,

    // Control panel banner image URL (e.g. 'https://…' or undefined for none)
    line: undefined as string | undefined,

    // Button emojis and optional custom titles (title defaults to localized i18n string)
    buttons: {
        rename: {
            emoji: '✏️'
        },
        limit: {
            emoji: '👥'
        },
        close: {
            emoji: '🔒'
        },
        hide: {
            emoji: '👁️'
        },
        user: {
            emoji: '💋'
        },
        speak: {
            emoji: '🔈'
        },
        kick: {
            emoji: '🤢'
        },
        reset: {
            emoji: '✂️'
        },
        owner: {
            emoji: '👑'
        },
        info: {
            emoji: '📔'
        }
    },

    // Guild-specific configuration overrides (keyed by Discord Guild ID)
    // Example:
    // guilds: new Collection<string, GuildConfig>()
    //     .set('GUILD_ID', {
    //         language: 'ru',
    //         color: 0x5865f2,
    //         defaultName: '🔥 {username}',
    //         buttons: {
    //             rename: { emoji: '📝', title: 'Rename Room' }
    //         },
    //         placeholder: {
    //             user: '🔷 Select a user'
    //         }
    //     })
    guilds: new Collection<string, GuildConfig>()
}

export type Config = typeof config