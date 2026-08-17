export const es = {
    names: {
        category: '📁 Canales Privados',
        voiceTrigger: '➕ Crear Sala',
        textPanel: '💬・controles',
        defaultRoom: '⭐ {username}'
    },
    panel: {
        title: 'Gestión de Sala Privada',
        intro: 'Haz clic en los botones para configurar tu sala\nSolo puedes usarlos cuando tienes una sala privada'
    },
    buttons: {
        rename: 'Cambiar nombre de la sala',
        limit: 'Establecer límite de usuarios',
        close: 'Bloquear/desbloquear acceso a la sala',
        hide: 'Ocultar/mostrar sala para todos',
        user: 'Gestionar acceso de un usuario',
        speak: 'Gestionar permisos de voz',
        kick: 'Expulsar usuario de la sala',
        reset: 'Restablecer permisos',
        owner: 'Transferir propiedad de la sala',
        info: 'Información de la sala'
    },
    info: {
        room: 'Sala privada',
        members: 'Miembros',
        owner: 'Propietario',
        created: 'Fecha de creación',
        visibility: 'Visible para todos',
        access: 'Accesible para todos'
    },
    modals: {
        renameTitle: 'Renombrar Sala',
        renameLabel: 'Nombre de la sala',
        renamePlaceholder: 'Introduce el nuevo nombre…',
        limitTitle: 'Límite de miembros',
        limitLabel: 'Límite de miembros (0 — ilimitado)',
        limitPlaceholder: 'Introduce un número de 0 a 99'
    },
    selects: {
        accessPlaceholder: '🔷 Selecciona un usuario',
        accessPrompt: 'Selecciona un usuario para conceder o bloquear el acceso a la sala:',
        speakPlaceholder: '🔷 Selecciona un usuario',
        speakPrompt: 'Selecciona un usuario para otorgar o revocar el permiso de hablar:',
        kickPlaceholder: '🔷 Selecciona un usuario',
        kickPrompt: 'Selecciona un miembro al que quieras expulsar de tu sala:',
        ownerPlaceholder: '🔷 Selecciona un usuario',
        ownerPrompt: 'Selecciona un participante al que quieras transferir la propiedad de la sala:'
    },
    responses: {
        notInVoice: '¡Debes estar dentro de tu sala de voz creada!',
        notOwner: '¡No eres el propietario de esta sala!',
        notInAnyRoom: 'No te encuentras en ninguna sala privada',
        roomNotFound: 'Sala de voz no encontrada',
        roomOpened: 'La sala está ahora abierta para todos',
        roomClosed: 'La sala está cerrada para todos (@everyone no puede unirse)',
        roomVisible: 'La sala es ahora visible para todos en la lista de canales',
        roomHidden: 'La sala está ahora oculta para todos',
        resetSuccess: 'Todos los permisos personalizados se han restablecido a los valores por defecto',
        cannotTargetSelf: 'No puedes modificar tus propios permisos',
        cannotMuteSelf: 'No puedes quitarte el permiso de hablar a ti mismo',
        cannotKickSelf: 'No puedes expulsarte a ti mismo',
        cannotTransferSelf: 'Ya eres el propietario de esta sala',
        targetNotInRoom: 'Este usuario no se encuentra en tu sala de voz',
        newOwnerMustBeInRoom: 'El nuevo propietario debe estar dentro de tu sala de voz',
        userAccessGranted: 'Acceso a la sala **permitido** con éxito al usuario <@{user}>',
        userAccessDenied: 'Acceso a la sala **bloqueado** con éxito al usuario <@{user}>',
        userSpeakGranted: 'Permiso de hablar **concedido** con éxito al usuario <@{user}>',
        userSpeakDenied: 'Permiso de hablar **revocado** con éxito al usuario <@{user}>',
        userKicked: 'El usuario <@{user}> ha sido expulsado con éxito de la sala',
        ownerTransferred: 'Propiedad de la sala transferida con éxito al usuario <@{user}>',
        kickFailed: 'No se pudo expulsar al usuario de la sala',
        nameEmpty: 'El nombre de la sala no puede estar vacío',
        cooldown: 'Espera {seconds} seg. antes de renombrar la sala nuevamente',
        nameChanged: 'Nombre de la sala cambiado con éxito a: **{name}**',
        nameChangeFailed: 'No se pudo cambiar el nombre de la sala. Es posible que Discord API aplique un límite de frecuencia',
        invalidLimit: 'Por favor, introduce un número válido del 0 al 99',
        limitRemoved: 'Límite de miembros eliminado con éxito (ilimitado)',
        limitSet: 'Límite de miembros establecido con éxito en **{limit}** miembros',
        limitFailed: 'No se pudo cambiar el límite de miembros de la sala',
        unknownError: 'Ha ocurrido un error inesperado al procesar la acción'
    }
}
