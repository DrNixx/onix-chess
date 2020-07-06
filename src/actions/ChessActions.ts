import { Move } from '../chess/Move';

export type NAVIGATE_TO_PLY = 'NAVIGATE_TO_PLY';
export type NAVIGATE_TO_KEY = 'NAVIGATE_TO_KEY';
export type NAVIGATE_TO_MOVE = 'NAVIGATE_TO_MOVE';

export const NAVIGATE_TO_PLY : NAVIGATE_TO_PLY = 'NAVIGATE_TO_PLY';
export const NAVIGATE_TO_KEY : NAVIGATE_TO_KEY = 'NAVIGATE_TO_KEY';
export const NAVIGATE_TO_MOVE : NAVIGATE_TO_MOVE = 'NAVIGATE_TO_MOVE';

export type GameNavigateToPlyAction = {
    type: NAVIGATE_TO_PLY,
    ply: number,
}

export type GameNavigateToKeyAction = {
    type: NAVIGATE_TO_KEY,
    move: string,
}

export type GameNavigateToMoveAction = {
    type: NAVIGATE_TO_MOVE,
    move: Move,
}