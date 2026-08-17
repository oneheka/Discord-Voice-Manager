export const en = {
    names: {
        category: '📁 Private Channels',
        voiceTrigger: '➕ Create Room',
        textPanel: '💬・controls',
        defaultRoom: '⭐ {username}'
    },
    panel: {
        title: 'Private Room Management',
        intro: 'Press the buttons below to configure your room\nYou can only use them when you have a private channel'
    },
    buttons: {
        rename: 'Rename room',
        limit: 'Set user limit',
        close: 'Lock / Unlock access for everyone',
        hide: 'Hide / Show room in the channel list',
        user: 'Configure access for a specific user',
        speak: 'Grant / revoke speaking rights',
        kick: 'Kick a participant from the room',
        reset: 'Reset custom permission overrides',
        owner: 'Transfer room ownership',
        info: 'View room information'
    },
    info: {
        room: 'Private room',
        members: 'Members',
        owner: 'Owner',
        created: 'Created time',
        visibility: 'Visible to everyone',
        access: 'Open to everyone'
    },
    modals: {
        renameTitle: 'Rename Room',
        renameLabel: 'Room Name',
        renamePlaceholder: 'Enter new room name…',
        limitTitle: 'Member Limit',
        limitLabel: 'Member limit (0 — unlimited)',
        limitPlaceholder: 'Enter number from 0 to 99'
    },
    selects: {
        accessPlaceholder: '🔷 Select a user',
        accessPrompt: 'Select a user to grant or deny room connection access:',
        speakPlaceholder: '🔷 Select a user',
        speakPrompt: 'Select a user to grant or revoke speaking rights:',
        kickPlaceholder: '🔷 Select a user',
        kickPrompt: 'Select a member to kick from your room:',
        ownerPlaceholder: '🔷 Select a user',
        ownerPrompt: 'Select a participant to transfer room ownership to:'
    },
    responses: {
        notInVoice: 'You must be in your created voice room!',
        notOwner: 'You are not the owner of this room!',
        notInAnyRoom: 'You are not in a private room',
        roomNotFound: 'Voice room not found',
        roomOpened: 'Room is now open to everyone',
        roomClosed: 'Room is closed to everyone (@everyone cannot connect)',
        roomVisible: 'Room is now visible to everyone in the channel list',
        roomHidden: 'Room is now hidden from everyone',
        resetSuccess: 'All custom permission overrides have been reset to default',
        cannotTargetSelf: 'You cannot modify permissions for yourself',
        cannotMuteSelf: 'You cannot mute yourself',
        cannotKickSelf: 'You cannot kick yourself',
        cannotTransferSelf: 'You are already the owner of this room',
        targetNotInRoom: 'This user is not inside your voice room',
        newOwnerMustBeInRoom: 'New owner must be inside your voice room',
        userAccessGranted: 'Successfully **granted** room access to <@{user}>',
        userAccessDenied: 'Successfully **denied** room access to <@{user}>',
        userSpeakGranted: 'Successfully **granted** speak permissions to <@{user}>',
        userSpeakDenied: 'Successfully **revoked** speak permissions from <@{user}>',
        userKicked: 'Successfully disconnected <@{user}> from your room',
        ownerTransferred: 'Room ownership successfully transferred to <@{user}>',
        kickFailed: 'Failed to disconnect user from the room',
        nameEmpty: 'Room name cannot be empty',
        cooldown: 'Please wait {seconds}s before renaming the room again',
        nameChanged: 'Room name successfully changed to: **{name}**',
        nameChangeFailed: 'Failed to change room name. Discord API rate limits may apply',
        invalidLimit: 'Please enter a valid number from 0 to 99',
        limitRemoved: 'Member limit successfully removed (unlimited)',
        limitSet: 'Member limit successfully set to **{limit}** members',
        limitFailed: 'Failed to change room member limit',
        unknownError: 'An unexpected error occurred while executing this action'
    }
}