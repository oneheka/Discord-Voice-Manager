export interface Creator {
    guildId: string,
    textChannelId: string,
    voiceChannelId: string,
    categoryId: string
}

export interface Room {
    voiceChannelId: string,
    ownerId: string,
    cooldown: number
}

export interface Setting {
    userId: string,
    name: string,
    userLimit: number,
    locked: number,
    visible: number,
    leave: number
}