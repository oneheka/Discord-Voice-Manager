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
        owner: '', // Ваш id или id разработчика
        message: '', // id Сообщения (если сообщения нет, оставляете путсым, до заполнения)
        style: ButtonStyle.Secondary, // Стиль кнопок (выбирать из предложенных от класса)
        channels: {
            text: '', // id канала где расположится панель управления
            voice: '', // id голосового канала приваток
            category: '' // id категории где будут создаваться приватные комнаты
        },
        emojis: { // Эмодзиии :)))))))))))))))
            limit: '👥',
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
