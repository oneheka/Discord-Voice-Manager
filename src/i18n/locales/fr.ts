export const fr = {
    names: {
        category: '📁 Salons Privés',
        voiceTrigger: '➕ Créer un salon',
        textPanel: '💬・commandes',
        defaultRoom: '⭐ {username}'
    },
    panel: {
        title: 'Gestion du salon privé',
        intro: 'Cliquez sur les boutons suivants pour configurer votre salon\nVous ne pouvez les utiliser que lorsque vous possédez un salon privé'
    },
    buttons: {
        rename: 'Renommer le salon',
        limit: 'Définir la limite d\'utilisateurs',
        close: 'Verrouiller/déverrouiller l\'accès au salon',
        hide: 'Masquer/afficher le salon pour tous',
        user: 'Gérer l\'accès d\'un utilisateur',
        speak: 'Gérer la permission de parole',
        kick: 'Expulser un utilisateur du salon',
        reset: 'Réinitialiser les permissions',
        owner: 'Transférer la propriété du salon',
        info: 'Informations sur le salon'
    },
    info: {
        room: 'Salon privé',
        members: 'Membres',
        owner: 'Propriétaire',
        created: 'Date de création',
        visibility: 'Visible par tous',
        access: 'Accessible à tous'
    },
    modals: {
        renameTitle: 'Renommer le salon',
        renameLabel: 'Nom du salon',
        renamePlaceholder: 'Entrez le nouveau nom…',
        limitTitle: 'Limite de membres',
        limitLabel: 'Limite de membres (0 — illimité)',
        limitPlaceholder: 'Entrez un nombre de 0 à 99'
    },
    selects: {
        accessPlaceholder: '🔷 Sélectionnez un utilisateur',
        accessPrompt: 'Sélectionnez un utilisateur pour autoriser ou bloquer l\'accès au salon :',
        speakPlaceholder: '🔷 Sélectionnez un utilisateur',
        speakPrompt: 'Sélectionnez un utilisateur pour accorder ou retirer le droit de parole :',
        kickPlaceholder: '🔷 Sélectionnez un utilisateur',
        kickPrompt: 'Sélectionnez un membre à expulser de votre salon :',
        ownerPlaceholder: '🔷 Sélectionnez un utilisateur',
        ownerPrompt: 'Sélectionnez un participant à qui transférer la propriété du salon :'
    },
    responses: {
        notInVoice: 'Vous devez être dans votre salon vocal créé !',
        notOwner: 'Vous n\'êtes pas le propriétaire de ce salon !',
        notInAnyRoom: 'Vous n\'êtes dans aucun salon privé',
        roomNotFound: 'Salon vocal introuvable',
        roomOpened: 'Le salon est maintenant ouvert à tous',
        roomClosed: 'Le salon est fermé à tous (@everyone ne peut pas se connecter)',
        roomVisible: 'Le salon est maintenant visible par tous dans la liste des salons',
        roomHidden: 'Le salon est maintenant masqué pour tous',
        resetSuccess: 'Toutes les permissions personnalisées ont été réinitialisées aux valeurs par défaut',
        cannotTargetSelf: 'Vous ne pouvez pas modifier vos propres permissions',
        cannotMuteSelf: 'Vous ne pouvez pas vous couper la parole à vous-même',
        cannotKickSelf: 'Vous ne pouvez pas vous expulser vous-même',
        cannotTransferSelf: 'Vous êtes déjà le propriétaire de ce salon',
        targetNotInRoom: 'Cet utilisateur n\'est pas dans votre salon vocal',
        newOwnerMustBeInRoom: 'Le nouveau propriétaire doit être présent dans votre salon vocal',
        userAccessGranted: 'L\'accès au salon a été **autorisé** avec succès pour <@{user}>',
        userAccessDenied: 'L\'accès au salon a été **bloqué** avec succès pour <@{user}>',
        userSpeakGranted: 'Le droit de parole a été **accordé** avec succès à <@{user}>',
        userSpeakDenied: 'Le droit de parole a été **retiré** avec succès à <@{user}>',
        userKicked: 'L\'utilisateur <@{user}> a été expulsé avec succès du salon',
        ownerTransferred: 'La propriété du salon a été transférée avec succès à <@{user}>',
        kickFailed: 'Impossible d\'expulser l\'utilisateur du salon',
        nameEmpty: 'Le nom du salon ne peut pas être vide',
        cooldown: 'Veuillez attendre {seconds} sec. avant de renommer à nouveau le salon',
        nameChanged: 'Le nom du salon a été changé avec succès pour : **{name}**',
        nameChangeFailed: 'Impossible de changer le nom du salon. Une limite de fréquence Discord API s\'applique peut-être',
        invalidLimit: 'Veuillez entrer un nombre valide entre 0 et 99',
        limitRemoved: 'La limite de membres a été supprimée avec succès (illimité)',
        limitSet: 'La limite de membres a été fixée avec succès à **{limit}** membres',
        limitFailed: 'Impossible de modifier la limite de membres du salon',
        unknownError: 'Une erreur inattendue est survenue lors de l\'exécution de l\'action'
    }
}
