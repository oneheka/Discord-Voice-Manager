import { GatewayIntentBits, Collection, ButtonStyle, PermissionFlagsBits } from 'discord.js'

export const internal = {
    token: 'MTAwMDk3Mjg3NDc3OTIwNTcwMg.G_27Gg.aUntejegRoVBTX1pUkEeeDfGAp6E9_lEcCgcGk',
    mongoURL: 'mongodb+srv://lina:FnZqkweizTedoW7D@cluster0.hqqo6.mongodb.net/voice?retryWrites=true&w=majority'
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
    '1000972997026381944',
    {
        owner: '758717520525000794',
        message: '1000976498431369317',
        style: ButtonStyle.Secondary,
        channels: {
            text: '1000973399977373796',
            voice: '1000972997026381948',
            category: '1000972997026381946'
        },
        emojis: {
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