import type { ButtonStyle } from "discord.js";

export type SupportedLanguage =
    | 'en'
    | 'ru'
    | 'de'
    | 'es'
    | 'fr'
    | 'ja'
    | 'ko'
    | 'pt'
    | 'pt-BR'
    | 'uk'
    | 'zh'
    | 'zh-CN'

export interface ButtonConfig {
    emoji: string
    title?: string
}

export interface ResolvedButtonConfig {
    emoji: string
    title?: string
}

export interface ResolvedButtons {
    rename: ResolvedButtonConfig
    limit: ResolvedButtonConfig
    close: ResolvedButtonConfig
    hide: ResolvedButtonConfig
    user: ResolvedButtonConfig
    speak: ResolvedButtonConfig
    kick: ResolvedButtonConfig
    reset: ResolvedButtonConfig
    owner: ResolvedButtonConfig
    info: ResolvedButtonConfig
}

export interface PlaceholderConfig {
    user?: string
    channel?: string
    access?: string
    speak?: string
    kick?: string
    owner?: string
}

export interface GuildConfig {
    language?: SupportedLanguage
    defaultName?: string
    style?: ButtonStyle
    color?: number
    line?: string
    dot?: string
    buttons?: Partial<Record<keyof ResolvedButtons, Partial<ButtonConfig>>>
    placeholder?: PlaceholderConfig
}

export interface ResolvedGuildConfig {
    language: SupportedLanguage
    defaultName: string
    style: ButtonStyle
    color: number
    line?: string
    dot?: string
    buttons: ResolvedButtons
    placeholder?: PlaceholderConfig
    cooldowns: {
        rename: number
    }
}
