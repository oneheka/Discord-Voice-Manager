import { GatewayIntentBits, Collection, ButtonStyle, PermissionFlagsBits } from 'discord.js'

export const internal = {
    token: '', // Токен бота (https://discord.com/developers/applications)
    mongoURL: '' // Ссылка на базы данных MongoDB (https://www.mongodb.com/)
}

export const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildEmojisAndStickers
]

interface IGuildConfig {
    owner: string,
    message: string,
    style: ButtonStyle,
    channels: {
        text: string,
        voice: string,
        category: string
    },
    emojis: {
        limit: string,
        name: string,
        lock: string,
        owner: string,
        unlock: string,
        kick: string,
        deluser: string,
        mute: string,
        adduser: string,
        unmute: string
    }
}

export const guilds = new Collection<string, IGuildConfig>()
.set(
    '', // id Сервера
    {
        owner: '758717520525000794', // Ваш id или id разработчика
        message: '1000976498431369317', // id Сообщения (если сообщения нет, оставляете путсым, до заполнения)
        style: ButtonStyle.Secondary,
        channels: {
            text: '1000973399977373796', // id канала где расположится панель управления
            voice: '1000972997026381948', // id голосового канала приваток
            category: '1000972997026381946' // id категории где будут создаваться приватные комнаты
        },
        emojis: {
            limit: '👥', // Эмодзиии :)))))))))))))))
            name: '🖊',
            lock: '🔒',
            owner: '👑',
            unlock: '🔓',
            kick: '🚪',
            deluser: '❌',
            mute: '🔇',
            adduser: '✅',
            unmute: '🔉'
        }
    } as IGuildConfig
)

export const ownerRoomPerms = {
    allow: [
        PermissionFlagsBits.Speak,
        PermissionFlagsBits.Stream,
        PermissionFlagsBits.UseVAD,
        PermissionFlagsBits.Connect,
        PermissionFlagsBits.ViewChannel,
        PermissionFlagsBits.PrioritySpeaker,
        PermissionFlagsBits.CreateInstantInvite
    ],
    deny: [
        PermissionFlagsBits.MoveMembers,
        PermissionFlagsBits.ManageRoles,
        PermissionFlagsBits.ManageWebhooks,
        PermissionFlagsBits.ManageChannels
    ]
}