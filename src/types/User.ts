export type AvatarSizeType = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Original';

export type AvatarSizeMap = {
    [name in AvatarSizeType]: AvatarSizeType;
}

export type ICON_NONE = 0;
export type ICON_CAPITAN = 1;
export type ICON_VICE = 2;
export type ICON_MODERATOR = 3;
export type ICON_COMODERATOR = 4;

export type UserIconType = ICON_NONE | ICON_CAPITAN | ICON_VICE | ICON_MODERATOR | ICON_COMODERATOR;

export enum Icons {
    NONE = 0,
    CAPITAN = 1,
    VICE = 2,
    MODERATOR = 3,
    COMODERATOR = 4
}