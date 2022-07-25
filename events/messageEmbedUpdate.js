const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

class MessageEmbedUpdate extends Event {
    constructor() {
        super("messageEmbedUpdate")
    }

    async run(bot) {
        let channel = bot.channels.cache.get(bot.config.ids.channels.text.privatrooms)
        if(channel) {
            channel.messages.fetch(bot.config.ids.messages.privatrooms)
            .then(message => {
                let row1 = new MessageActionRow()
                .addComponents(new MessageButton().setEmoji('<:pvlimit:932178331074428938>').setCustomId('pvlimit').setStyle('SECONDARY'))
                .addComponents(new MessageButton().setEmoji('<:pvlock:932179170186911754>').setCustomId('pvlock').setStyle('SECONDARY'))
                .addComponents(new MessageButton().setEmoji('<:pvunlock:932179197026246656>').setCustomId('pvunlock').setStyle('SECONDARY'))
                .addComponents(new MessageButton().setEmoji('<:pvremoveuser:932179925144850492>').setCustomId('pvremoveuser').setStyle('SECONDARY'))
                .addComponents(new MessageButton().setEmoji('<:pvadduser:932179938830868501>').setCustomId('pvadduser').setStyle('SECONDARY'))

                let row2 = new MessageActionRow()
                .addComponents(new MessageButton().setEmoji('<:pvname:932185527556407357>').setCustomId('pvname').setStyle('SECONDARY'))
                .addComponents(new MessageButton().setEmoji('<:pvcrown:932185557369507881>').setCustomId('pvcrown').setStyle('SECONDARY'))
                .addComponents(new MessageButton().setEmoji('<:pvkick:932186096362721311>').setCustomId('pvkick').setStyle('SECONDARY'))
                .addComponents(new MessageButton().setEmoji('<:pvmute:932187386757132318>').setCustomId('pvmute').setStyle('SECONDARY'))
                .addComponents(new MessageButton().setEmoji('<:pvunmute:932187402070544404>').setCustomId('pvunmute').setStyle('SECONDARY'))
                
                let embed = new MessageEmbed()
                .setColor('#2f3136')
                .setTitle('Управление приватной комнатой')
                .setDescription('> Жми следующие кнопки, чтобы настроить свою комнату')
                .setFooter({text: 'Использовать их можно только когда у тебя есть приватный канал'})
                .setImage('https://cdn.discordapp.com/attachments/928217923456237581/932176487979839528/Comp-2_00000_00000.png')
                .addField('** **',
                '<:pvlimit:932178331074428938> — установить лимит' + '\n'
                + '<:pvlock:932179170186911754> — закрыть комнату' + '\n'
                + '<:pvunlock:932179197026246656> — открыть комнату' + '\n'
                + '<:pvremoveuser:932179925144850492> — забрать доступ' + '\n'
                + '<:pvadduser:932179938830868501> — выдать доступ',
                true)
                .addField('** **',
                '<:pvname:932185527556407357> — сменить название' + '\n'
                + '<:pvcrown:932185557369507881> — передать владельца' + '\n'
                + '<:pvkick:932186096362721311> — выгнать из комнаты' + '\n'
                + '<:pvmute:932187386757132318> — забрать право говорить' + '\n'
                + '<:pvunmute:932187402070544404> — вернуть право говорить',
                true)
                message.edit({embeds: [embed], components: [row1, row2]})
            }).catch((err) => {
                console.log(`Ошибка с изменерием сообщения.\n${err.name}: ${err.message}`)
            })
        }
    }
}

module.exports = MessageEmbedUpdate