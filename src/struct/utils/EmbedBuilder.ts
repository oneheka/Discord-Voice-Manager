import type { GuildMember, VoiceChannel } from "discord.js";
import { EmbedBuilder as DJSEmbedBuilder } from "discord.js";
import type { ActiveRoom } from "@/db/schema";
import { Client } from "@/struct/Client";
import { i18n } from "@/i18n";

export class Embeds {
    public static settingRoomEmbed(guildId?: string): DJSEmbedBuilder {
        const guildConfig = Client.getGuildConfig(guildId)
        const b = guildConfig.buttons
        const dot = guildConfig.dot || ''

        const lines = [
            `${dot}${b.rename.emoji} — \`${(b.rename.title || i18n.buttons.rename).toLowerCase()}\``,
            `${dot}${b.limit.emoji} — \`${(b.limit.title || i18n.buttons.limit).toLowerCase()}\``,
            `${dot}${b.close.emoji} — \`${(b.close.title || i18n.buttons.close).toLowerCase()}\``,
            `${dot}${b.hide.emoji} — \`${(b.hide.title || i18n.buttons.hide).toLowerCase()}\``,
            `${dot}${b.user.emoji} — \`${(b.user.title || i18n.buttons.user).toLowerCase()}\``,
            `${dot}${b.speak.emoji} — \`${(b.speak.title || i18n.buttons.speak).toLowerCase()}\``,
            `${dot}${b.kick.emoji} — \`${(b.kick.title || i18n.buttons.kick).toLowerCase()}\``,
            `${dot}${b.reset.emoji} — \`${(b.reset.title || i18n.buttons.reset).toLowerCase()}\``,
            `${dot}${b.owner.emoji} — \`${(b.owner.title || i18n.buttons.owner).toLowerCase()}\``,
            `${dot}${b.info.emoji} — \`${(b.info.title || i18n.buttons.info).toLowerCase()}\``
        ]

        const description = `${i18n.panel.intro}\n\n${lines.join('\n')}`

        const embed = new DJSEmbedBuilder()
            .setColor(guildConfig.color)
            .setTitle(i18n.panel.title)
            .setDescription(description)

        if (guildConfig.line) {
            embed.setImage(guildConfig.line)
        }

        return embed
    }

    public static infoRoomEmbed(channel: VoiceChannel, ownerId: string, activeRoom: ActiveRoom, member?: GuildMember): DJSEmbedBuilder {
        const guildConfig = Client.getGuildConfig(channel.guild.id)
        const guildPerms = channel.permissionOverwrites.cache.get(channel.guild.id)
        const isHidden = guildPerms?.deny.has('ViewChannel') ?? false
        const isLocked = guildPerms?.deny.has('Connect') ?? false
        const limitDisplay = channel.userLimit === 0 ? 'ꝏ' : channel.userLimit.toString()

        const description = [
            `**${i18n.info.room}:** ${channel.toString()}`,
            `**${i18n.info.members}:** ${channel.members.size}/${limitDisplay}`,
            `**${i18n.info.owner}:** <@!${ownerId}>`,
            `**${i18n.info.created}:** <t:${Math.round(activeRoom.createdAt / 1000)}>`,
            `**${i18n.info.visibility}:** ${isHidden ? '❌' : '✅'}`,
            `**${i18n.info.access}:** ${isLocked ? '❌' : '✅'}`
        ].join('\n')

        const embed = new DJSEmbedBuilder()
            .setColor(guildConfig.color)
            .setTitle(guildConfig.buttons.info.title || i18n.buttons.info)
            .setDescription(description)

        if (member) {
            embed.setThumbnail(member.displayAvatarURL({ forceStatic: false }))
        }

        return embed
    }

    public static success(message: string, guildId?: string): DJSEmbedBuilder {
        const guildConfig = Client.getGuildConfig(guildId)
        return new DJSEmbedBuilder()
            .setColor(guildConfig.color)
            .setDescription(`✅ ${message}`)
    }

    public static error(message: string, guildId?: string): DJSEmbedBuilder {
        const guildConfig = Client.getGuildConfig(guildId)
        return new DJSEmbedBuilder()
            .setColor(guildConfig.color)
            .setDescription(`❌ ${message}`)
    }

    public static warn(message: string, guildId?: string): DJSEmbedBuilder {
        const guildConfig = Client.getGuildConfig(guildId)
        return new DJSEmbedBuilder()
            .setColor(guildConfig.color)
            .setDescription(`⚠️ ${message}`)
    }
}