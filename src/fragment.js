// UserParts는 신경쓰지말고 User부분을 datamodel 부분과 일치시킴
export const USER_FRAGMENT = `
    id
    name
    avatar
`;

export const COMMENT_FRAGMENT = `
    id
    text
    user{
        ${USER_FRAGMENT}
    }
`;

export const FILE_FRAGMENT = `
    id
    url
`;

export const MESSAGE_FRAGMENT = `
    id
    text
    to{
        ${USER_FRAGMENT}
    }
    from{
        ${USER_FRAGMENT}
    }
`
export const ROOM_FRAGMENT = `
    fragment RoomParts on Room {
        id
        participants{
            ${USER_FRAGMENT}
        }
        message {
            ${MESSAGE_FRAGMENT}
        }
    }
`