const { Intents } = require('discord.js')

module.exports.internal = {
    token: '', // token бота
    mongoURL: '' // mongo url
}

module.exports.intents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING
]

module.exports.ids = {
    owner: '', // id овнера бота
    messages: {
        privatrooms: '' // сообщение приваток
    },
    guilds: {
        main: '' // сервер где есть бот
    },
    channels: {
        text: {
            privatrooms: '' // канал с сообщением приватных комнат
        },
        voice: {
            createPrivate: '' // голосовой канал при входе которого создается канал
        },
        categories: {
            privatrooms: '' // категория приваток
        }
    }
}

module.exports.permissions = {
    privateroom: {
        creator: {
            CREATE_INSTANT_INVITE: true,
            VIEW_CHANNEL: true,
            CONNECT: true,
            SPEAK: true,
            STREAM: true,
            USE_VAD: true,
            PRIORITY_SPEAKER: true,
            MANAGE_CHANNELS: false,
            MANAGE_ROLES: false,
            MANAGE_WEBHOOKS: false,
            MOVE_MEMBERS: false,
        }
    }
}