export const zh = {
    names: {
        category: '📁 专属语音频道',
        voiceTrigger: '➕ 创建房间',
        textPanel: '💬・控制面板',
        defaultRoom: '⭐ {username}'
    },
    panel: {
        title: '专属语音房间管理',
        intro: '点击下方按钮配置您的房间\n仅在拥有专属房间时可以使用以下功能'
    },
    buttons: {
        rename: '修改房间名称',
        limit: '设置人数上限',
        close: '锁定/解锁房间',
        hide: '隐藏/显示房间',
        user: '管理特定用户权限',
        speak: '管理发言权限',
        kick: '踢出房间内成员',
        reset: '重置所有权限',
        owner: '移交房主权限',
        info: '查看房间信息'
    },
    info: {
        room: '专属房间',
        members: '当前人数',
        owner: '房主',
        created: '创建时间',
        visibility: '是否公开可见',
        access: '是否开放进入'
    },
    modals: {
        renameTitle: '修改房间名称',
        renameLabel: '新房间名称',
        renamePlaceholder: '请输入新的房间名称…',
        limitTitle: '人数上限',
        limitLabel: '人数上限 (0 为无限制)',
        limitPlaceholder: '请输入 0 到 99 之间的数字'
    },
    selects: {
        accessPlaceholder: '🔷 请选择用户',
        accessPrompt: '请选择要允许或禁止进入房间的用户：',
        speakPlaceholder: '🔷 请选择用户',
        speakPrompt: '请选择要授予或收回发言权限的用户：',
        kickPlaceholder: '🔷 请选择用户',
        kickPrompt: '请选择要从您的房间中踢出的成员：',
        ownerPlaceholder: '🔷 请选择用户',
        ownerPrompt: '请选择要将房主权限移交的成员：'
    },
    responses: {
        notInVoice: '您必须处于自己创建的语音房间中！',
        notOwner: '您不是当前房间的房主！',
        notInAnyRoom: '您当前未加入任何专属房间',
        roomNotFound: '未找到语音房间',
        roomOpened: '房间已对所有人开放进入',
        roomClosed: '房间已锁定（@everyone 无法加入）',
        roomVisible: '房间已在频道列表中对所有人可见',
        roomHidden: '房间已对所有人隐藏',
        resetSuccess: '所有自定义权限已重置为默认值',
        cannotTargetSelf: '您不能修改自己的权限',
        cannotMuteSelf: '您不能收回自己的发言权限',
        cannotKickSelf: '您不能踢出自己',
        cannotTransferSelf: '您已经是当前房间的房主',
        targetNotInRoom: '该用户不在您的语音房间内',
        newOwnerMustBeInRoom: '新房主必须在您的语音房间内',
        userAccessGranted: '已成功为用户 <@{user}> **开放**进入权限',
        userAccessDenied: '已成功为用户 <@{user}> **禁止**进入权限',
        userSpeakGranted: '已成功为用户 <@{user}> **授予**发言权限',
        userSpeakDenied: '已成功为用户 <@{user}> **收回**发言权限',
        userKicked: '已成功将用户 <@{user}> 踢出房间',
        ownerTransferred: '房主权限已成功移交给 <@{user}>',
        kickFailed: '踢出用户失败',
        nameEmpty: '房间名称不能为空',
        cooldown: '请等待 {seconds} 秒后再尝试修改房间名称',
        nameChanged: '房间名称已成功修改为：**{name}**',
        nameChangeFailed: '修改房间名称失败，可能受到 Discord API 速率限制',
        invalidLimit: '请输入 0 到 99 之间的有效数字',
        limitRemoved: '已成功解除人数上限（无限制）',
        limitSet: '已成功将人数上限设置为 **{limit}** 人',
        limitFailed: '修改房间人数上限失败',
        unknownError: '执行操作时发生了意外错误'
    }
}
