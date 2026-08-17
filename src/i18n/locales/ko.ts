export const ko = {
    names: {
        category: '📁 비공개 채널',
        voiceTrigger: '➕ 방 만들기',
        textPanel: '💬・제어-패널',
        defaultRoom: '⭐ {username}'
    },
    panel: {
        title: '개인 음성방 관리',
        intro: '아래 버튼을 눌러 음성방을 설정하세요\n개인 음성방을 소유하고 있을 때만 사용할 수 있습니다'
    },
    buttons: {
        rename: '방 이름 변경',
        limit: '인원 제한 설정',
        close: '방 잠금 / 잠금 해제',
        hide: '방 숨기기 / 보이기',
        user: '특정 유저 접근 권한 설정',
        speak: '발언 권한 설정',
        kick: '유저 내보내기',
        reset: '권한 설정 초기화',
        owner: '방 소유권 이전',
        info: '방 정보 확인'
    },
    info: {
        room: '개인 음성방',
        members: '참여 인원',
        owner: '방장',
        created: '생성 시각',
        visibility: '전체 공개 여부',
        access: '전체 입장 여부'
    },
    modals: {
        renameTitle: '방 이름 변경',
        renameLabel: '새로운 방 이름',
        renamePlaceholder: '새로운 방 이름을 입력하세요…',
        limitTitle: '인원 제한',
        limitLabel: '인원 수 (0 — 무제한)',
        limitPlaceholder: '0부터 99까지의 숫자를 입력하세요'
    },
    selects: {
        accessPlaceholder: '🔷 유저 선택',
        accessPrompt: '방 접근을 허용하거나 차단할 유저를 선택하세요:',
        speakPlaceholder: '🔷 유저 선택',
        speakPrompt: '발언 권한을 부여하거나 회수할 유저를 선택하세요:',
        kickPlaceholder: '🔷 유저 선택',
        kickPrompt: '방에서 내보낼 멤버를 선택하세요:',
        ownerPlaceholder: '🔷 유저 선택',
        ownerPrompt: '방 소유권을 이전할 멤버를 선택하세요:'
    },
    responses: {
        notInVoice: '생성된 개인 음성방에 참여하고 있어야 합니다!',
        notOwner: '이 방의 방장이 아닙니다!',
        notInAnyRoom: '개인 음성방에 참여하고 있지 않습니다',
        roomNotFound: '음성방을 찾을 수 없습니다',
        roomOpened: '방이 모두에게 열렸습니다',
        roomClosed: '방이 잠겼습니다 (@everyone 은 접속할 수 없습니다)',
        roomVisible: '채널 목록에서 방이 모두에게 표시됩니다',
        roomHidden: '방이 모두에게 숨겨졌습니다',
        resetSuccess: '모든 사용자 지정 권한이 기본값으로 초기화되었습니다',
        cannotTargetSelf: '자신의 권한은 변경할 수 없습니다',
        cannotMuteSelf: '자신의 발언 권한을 회수할 수 없습니다',
        cannotKickSelf: '자기 자신을 내보낼 수 없습니다',
        cannotTransferSelf: '이미 이 방의 방장입니다',
        targetNotInRoom: '해당 유저는 음성방에 없습니다',
        newOwnerMustBeInRoom: '새로운 방장은 반드시 음성방에 참여 중이어야 합니다',
        userAccessGranted: '<@{user}> 님의 방 접근이 **허용**되었습니다',
        userAccessDenied: '<@{user}> 님의 방 접근이 **차단**되었습니다',
        userSpeakGranted: '<@{user}> 님에게 발언 권한이 **부여**되었습니다',
        userSpeakDenied: '<@{user}> 님의 발언 권한이 **회수**되었습니다',
        userKicked: '<@{user}> 님을 음성방에서 연결 해제했습니다',
        ownerTransferred: '방 소유권이 <@{user}> 님에게 성공적으로 이전되었습니다',
        kickFailed: '유저를 음성방에서 내보내지 못했습니다',
        nameEmpty: '방 이름은 비워둘 수 없습니다',
        cooldown: '방 이름을 다시 변경하려면 {seconds}초 동안 기다려주세요',
        nameChanged: '방 이름이 **{name}**(으)로 성공적으로 변경되었습니다',
        nameChangeFailed: '방 이름을 변경하지 못했습니다. Discord API 속도 제한 때문일 수 있습니다',
        invalidLimit: '0부터 99까지의 올바른 숫자를 입력하세요',
        limitRemoved: '인원 제한이 해제되었습니다 (무제한)',
        limitSet: '인원 제한이 **{limit}**명으로 설정되었습니다',
        limitFailed: '인원 제한을 변경하지 못했습니다',
        unknownError: '작업 처리 중 예기치 않은 오류가 발생했습니다'
    }
}
