export const ja = {
    names: {
        category: '📁 プライベートチャンネル',
        voiceTrigger: '➕ 部屋を作成',
        textPanel: '💬・操作パネル',
        defaultRoom: '⭐ {username}'
    },
    panel: {
        title: 'プライベート部屋の管理',
        intro: 'ボタンを押して部屋の設定を行ってください\nプライベートチャンネルを所持している場合のみ使用できます'
    },
    buttons: {
        rename: '部屋名を変更',
        limit: '人数制限を設定',
        close: '部屋へのアクセスをロック/解除',
        hide: '部屋を全体に非表示/表示',
        user: '特定ユーザーのアクセス設定',
        speak: '発言権限の設定',
        kick: 'ユーザーを部屋からキック',
        reset: '権限設定をリセット',
        owner: '部屋の所有権を譲渡',
        info: '部屋の情報を確認'
    },
    info: {
        room: 'プライベート部屋',
        members: '参加人数',
        owner: '部屋主',
        created: '作成日時',
        visibility: '全体に表示中',
        access: '全体に開放中'
    },
    modals: {
        renameTitle: '部屋名の変更',
        renameLabel: '新しい部屋名',
        renamePlaceholder: '新しい部屋名を入力…',
        limitTitle: '参加人数の上限',
        limitLabel: '人数上限 (0 で無制限)',
        limitPlaceholder: '0から99の数字を入力'
    },
    selects: {
        accessPlaceholder: '🔷 ユーザーを選択',
        accessPrompt: '部屋へのアクセスを許可またはブロックするユーザーを選択してください:',
        speakPlaceholder: '🔷 ユーザーを選択',
        speakPrompt: '発言権限を付与または剥奪するユーザーを選択してください:',
        kickPlaceholder: '🔷 ユーザーを選択',
        kickPrompt: '部屋から退出させるメンバーを選択してください:',
        ownerPlaceholder: '🔷 ユーザーを選択',
        ownerPrompt: '部屋の所有権を譲渡するメンバーを選択してください:'
    },
    responses: {
        notInVoice: '作成したボイスチャンネルに参加している必要があります！',
        notOwner: 'あなたはこの部屋の部屋主ではありません！',
        notInAnyRoom: 'プライベート部屋に参加していません',
        roomNotFound: 'ボイスチャンネルが見つかりません',
        roomOpened: '部屋を全体に開放しました',
        roomClosed: '部屋をロックしました（@everyone は接続できません）',
        roomVisible: 'チャンネル一覧で部屋を全体に表示しました',
        roomHidden: '部屋を全体から非表示にしました',
        resetSuccess: 'すべてのカスタム権限を初期値にリセットしました',
        cannotTargetSelf: '自分自身の権限は変更できません',
        cannotMuteSelf: '自分自身の発言権限は剥奪できません',
        cannotKickSelf: '自分自身をキックすることはできません',
        cannotTransferSelf: 'あなたは既にこの部屋の部屋主です',
        targetNotInRoom: 'このユーザーはあなたのボイスチャンネルにいません',
        newOwnerMustBeInRoom: '新しい部屋主はあなたのボイスチャンネルに参加している必要があります',
        userAccessGranted: '<@{user}> の部屋へのアクセスを**許可**しました',
        userAccessDenied: '<@{user}> の部屋へのアクセスを**ブロック**しました',
        userSpeakGranted: '<@{user}> に発言権限を**付与**しました',
        userSpeakDenied: '<@{user}> の発言権限を**剥奪**しました',
        userKicked: '<@{user}> を部屋から切断しました',
        ownerTransferred: '部屋の所有権を <@{user}> に譲渡しました',
        kickFailed: 'ユーザーを部屋から切断できませんでした',
        nameEmpty: '部屋名を空にすることはできません',
        cooldown: '部屋名を再度変更するまで、あと {seconds} 秒お待ちください',
        nameChanged: '部屋名を **{name}** に変更しました',
        nameChangeFailed: '部屋名の変更に失敗しました。Discord APIのレート制限の可能性があります',
        invalidLimit: '0から99までの有効な数字を入力してください',
        limitRemoved: '人数制限を解除しました（無制限）',
        limitSet: '人数制限を **{limit}** 人に設定しました',
        limitFailed: '部屋の人数制限を変更できませんでした',
        unknownError: '処理の実行中に予期しないエラーが発生しました'
    }
}
