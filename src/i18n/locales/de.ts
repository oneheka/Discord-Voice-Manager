export const de = {
    names: {
        category: '📁 Private Kanäle',
        voiceTrigger: '➕ Kanal erstellen',
        textPanel: '💬・steuerung',
        defaultRoom: '⭐ {username}'
    },
    panel: {
        title: 'Verwaltung des privaten Kanals',
        intro: 'Klicke auf die folgenden Schaltflächen, um deinen Kanal zu konfigurieren\nDu kannst sie nur nutzen, wenn du einen privaten Kanal besitzt'
    },
    buttons: {
        rename: 'Kanal umbenennen',
        limit: 'Benutzerlimit festlegen',
        close: 'Kanal sperren/entsperren',
        hide: 'Kanal für alle verstecken/anzeigen',
        user: 'Benutzerzugriff verwalten',
        speak: 'Sprechberechtigung verwalten',
        kick: 'Benutzer aus dem Kanal werfen',
        reset: 'Berechtigungen zurücksetzen',
        owner: 'Eigentümerrechte übertragen',
        info: 'Kanalinformationen'
    },
    info: {
        room: 'Privater Kanal',
        members: 'Mitglieder',
        owner: 'Eigentümer',
        created: 'Erstellungszeitpunkt',
        visibility: 'Sichtbar für alle',
        access: 'Zugänglich für alle'
    },
    modals: {
        renameTitle: 'Kanal umbenennen',
        renameLabel: 'Kanalname',
        renamePlaceholder: 'Neuen Kanalnamen eingeben…',
        limitTitle: 'Mitgliederlimit',
        limitLabel: 'Mitgliederlimit (0 — unbegrenzt)',
        limitPlaceholder: 'Zahl von 0 bis 99 eingeben'
    },
    selects: {
        accessPlaceholder: '🔷 Benutzer auswählen',
        accessPrompt: 'Wähle einen Benutzer aus, um den Kanalzugriff zu gewähren oder zu sperren:',
        speakPlaceholder: '🔷 Benutzer auswählen',
        speakPrompt: 'Wähle einen Benutzer aus, um die Sprechberechtigung zu erteilen oder zu entziehen:',
        kickPlaceholder: '🔷 Benutzer auswählen',
        kickPrompt: 'Wähle ein Mitglied aus, das du aus deinem Kanal werfen möchtest:',
        ownerPlaceholder: '🔷 Benutzer auswählen',
        ownerPrompt: 'Wähle einen Teilnehmer aus, dem du die Eigentümerrechte übertragen möchtest:'
    },
    responses: {
        notInVoice: 'Du musst dich in deinem erstellten Sprachkanal befinden!',
        notOwner: 'Du bist nicht der Eigentümer dieses Kanals!',
        notInAnyRoom: 'Du befindest dich in keinem privaten Kanal',
        roomNotFound: 'Sprachkanal nicht gefunden',
        roomOpened: 'Kanal ist jetzt für alle geöffnet',
        roomClosed: 'Kanal ist für alle gesperrt (@everyone kann nicht beitreten)',
        roomVisible: 'Kanal ist jetzt für alle in der Kanalliste sichtbar',
        roomHidden: 'Kanal ist jetzt für alle ausgeblendet',
        resetSuccess: 'Alle benutzerdefinierten Berechtigungen wurden auf die Standardwerte zurückgesetzt',
        cannotTargetSelf: 'Du kannst deine eigenen Berechtigungen nicht ändern',
        cannotMuteSelf: 'Du kannst dir nicht selbst das Wort entziehen',
        cannotKickSelf: 'Du kannst dich nicht selbst rauswerfen',
        cannotTransferSelf: 'Du bist bereits der Eigentümer dieses Kanals',
        targetNotInRoom: 'Dieser Benutzer befindet sich nicht in deinem Sprachkanal',
        newOwnerMustBeInRoom: 'Der neue Eigentümer muss sich in deinem Sprachkanal befinden',
        userAccessGranted: 'Dem Benutzer <@{user}> wurde der Zugriff auf den Kanal erfolgreich **gewährt**',
        userAccessDenied: 'Dem Benutzer <@{user}> wurde der Zugriff auf den Kanal erfolgreich **gesperrt**',
        userSpeakGranted: 'Dem Benutzer <@{user}> wurde die Sprechberechtigung erfolgreich **erteilt**',
        userSpeakDenied: 'Dem Benutzer <@{user}> wurde die Sprechberechtigung erfolgreich **entzogen**',
        userKicked: 'Der Benutzer <@{user}> wurde erfolgreich aus dem Kanal geworfen',
        ownerTransferred: 'Eigentümerrechte erfolgreich an <@{user}> übertragen',
        kickFailed: 'Benutzer konnte nicht aus dem Kanal geworfen werden',
        nameEmpty: 'Der Kanalname darf nicht leer sein',
        cooldown: 'Bitte warte noch {seconds} Sek., bevor du den Kanal erneut umbenennst',
        nameChanged: 'Kanalname erfolgreich geändert zu: **{name}**',
        nameChangeFailed: 'Kanalname konnte nicht geändert werden. Möglicherweise greift das Discord API Rate-Limit',
        invalidLimit: 'Bitte gib eine gültige Zahl von 0 bis 99 ein',
        limitRemoved: 'Mitgliederlimit erfolgreich aufgehoben (unbegrenzt)',
        limitSet: 'Mitgliederlimit erfolgreich auf **{limit}** Mitglieder festgelegt',
        limitFailed: 'Mitgliederlimit konnte nicht geändert werden',
        unknownError: 'Beim Ausführen der Aktion ist ein unerwarteter Fehler aufgetreten'
    }
}
