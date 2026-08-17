export const pt = {
    names: {
        category: '📁 Canais Privados',
        voiceTrigger: '➕ Criar Sala',
        textPanel: '💬・painel',
        defaultRoom: '⭐ {username}'
    },
    panel: {
        title: 'Gerenciamento da Sala Privada',
        intro: 'Clique nos botões abaixo para configurar sua sala\nVocê só pode usá-los quando possuir uma sala privada'
    },
    buttons: {
        rename: 'Renomear sala',
        limit: 'Definir limite de usuários',
        close: 'Bloquear/desbloquear acesso à sala',
        hide: 'Ocultar/exibir sala para todos',
        user: 'Gerenciar acesso de um usuário',
        speak: 'Gerenciar permissão de voz',
        kick: 'Expulsar usuário da sala',
        reset: 'Redefinir permissões',
        owner: 'Transferir posse da sala',
        info: 'Informações da sala'
    },
    info: {
        room: 'Sala privada',
        members: 'Membros',
        owner: 'Dono',
        created: 'Criada em',
        visibility: 'Visível para todos',
        access: 'Acessível para todos'
    },
    modals: {
        renameTitle: 'Renomear Sala',
        renameLabel: 'Nome da sala',
        renamePlaceholder: 'Digite o novo nome…',
        limitTitle: 'Limite de membros',
        limitLabel: 'Limite de membros (0 — ilimitado)',
        limitPlaceholder: 'Digite um número de 0 a 99'
    },
    selects: {
        accessPlaceholder: '🔷 Selecione um usuário',
        accessPrompt: 'Selecione um usuário para liberar ou bloquear o acesso à sala:',
        speakPlaceholder: '🔷 Selecione um usuário',
        speakPrompt: 'Selecione um usuário para conceder ou revogar a permissão de falar:',
        kickPlaceholder: '🔷 Selecione um usuário',
        kickPrompt: 'Selecione um membro que deseja expulsar da sua sala:',
        ownerPlaceholder: '🔷 Selecione um usuário',
        ownerPrompt: 'Selecione um participante para transferir a posse da sala:'
    },
    responses: {
        notInVoice: 'Você deve estar dentro da sua sala de voz criada!',
        notOwner: 'Você não é o dono desta sala!',
        notInAnyRoom: 'Você não está em nenhuma sala privada',
        roomNotFound: 'Sala de voz não encontrada',
        roomOpened: 'A sala está aberta para todos',
        roomClosed: 'A sala está fechada para todos (@everyone não pode conectar)',
        roomVisible: 'A sala agora está visível para todos na lista de canais',
        roomHidden: 'A sala agora está oculta para todos',
        resetSuccess: 'Todas as permissões personalizadas foram redefinidas para o padrão',
        cannotTargetSelf: 'Você não pode alterar suas próprias permissões',
        cannotMuteSelf: 'Você não pode tirar sua própria permissão de voz',
        cannotKickSelf: 'Você não pode expulsar a si mesmo',
        cannotTransferSelf: 'Você já é o dono desta sala',
        targetNotInRoom: 'Este usuário não está na sua sala de voz',
        newOwnerMustBeInRoom: 'O novo dono deve estar dentro da sua sala de voz',
        userAccessGranted: 'Acesso à sala **concedido** com sucesso ao usuário <@{user}>',
        userAccessDenied: 'Acesso à sala **bloqueado** com sucesso ao usuário <@{user}>',
        userSpeakGranted: 'Permissão de voz **concedida** com sucesso ao usuário <@{user}>',
        userSpeakDenied: 'Permissão de voz **revogada** com sucesso ao usuário <@{user}>',
        userKicked: 'O usuário <@{user}> foi desconectado com sucesso da sala',
        ownerTransferred: 'Posse da sala transferida com sucesso para <@{user}>',
        kickFailed: 'Não foi possível desconectar o usuário da sala',
        nameEmpty: 'O nome da sala não pode estar vazio',
        cooldown: 'Aguarde mais {seconds} seg. antes de renomear a sala novamente',
        nameChanged: 'Nome da sala alterado com sucesso para: **{name}**',
        nameChangeFailed: 'Não foi possível alterar o nome da sala. Limites de taxa do Discord API podem estar ativos',
        invalidLimit: 'Por favor, insira um número válido de 0 a 99',
        limitRemoved: 'Limite de membros removido com sucesso (ilimitado)',
        limitSet: 'Limite de membros definido com sucesso para **{limit}** membros',
        limitFailed: 'Não foi possível alterar o limite de membros da sala',
        unknownError: 'Ocorreu um erro inesperado ao executar a ação'
    }
}
