import { zh } from "@/i18n/locales/zh";
import { uk } from "@/i18n/locales/uk";
import { ru } from "@/i18n/locales/ru";
import { pt } from "@/i18n/locales/pt";
import { ko } from "@/i18n/locales/ko";
import { ja } from "@/i18n/locales/ja";
import { fr } from "@/i18n/locales/fr";
import { es } from "@/i18n/locales/es";
import { en } from "@/i18n/locales/en";
import { de } from "@/i18n/locales/de";
import { config } from "@/config";

export const locales = {
    en,
    ru,
    de,
    es,
    fr,
    ja,
    ko,
    pt,
    'pt-BR': pt,
    uk,
    zh,
    'zh-CN': zh
}

export type SupportedLanguage = keyof typeof locales
export type Locale = typeof en

export class I18nManager {
    public static getLocale(): Locale {
        const lang = config.language as SupportedLanguage
        return locales[lang] || locales.en
    }

    public static format(template: string, replacements?: Record<string, string | number>): string {
        if (!replacements) {
            return template
        }
        let result = template
        for (const [key, value] of Object.entries(replacements)) {
            result = result.replaceAll(`{${key}}`, String(value))
        }
        return result
    }
}

export const i18n = I18nManager.getLocale()
export const format = I18nManager.format