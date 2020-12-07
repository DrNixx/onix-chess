import { Move } from '../chess/Move';
import { IGameData, IMovePart, ITreePart } from '../types/Interfaces';

export namespace GameActions {
    export type NAVIGATE_TO_PLY = 'NAVIGATE_TO_PLY';
    export type NAVIGATE_TO_KEY = 'NAVIGATE_TO_KEY';
    export type NAVIGATE_TO_MOVE = 'NAVIGATE_TO_MOVE';
    export type GAME_LOAD_FULL = 'GAME_LOAD_FULL';
    export type GAME_ADD_MOVE = 'GAME_ADD_MOVE';

    export const NAVIGATE_TO_PLY : NAVIGATE_TO_PLY = 'NAVIGATE_TO_PLY';
    export const NAVIGATE_TO_KEY : NAVIGATE_TO_KEY = 'NAVIGATE_TO_KEY';
    export const NAVIGATE_TO_MOVE : NAVIGATE_TO_MOVE = 'NAVIGATE_TO_MOVE';
    export const GAME_LOAD_FULL : GAME_LOAD_FULL = 'GAME_LOAD_FULL';
    export const GAME_ADD_MOVE : GAME_ADD_MOVE = 'GAME_ADD_MOVE';

    export type NavigateToPly = {
        type: NAVIGATE_TO_PLY,
        ply: number,
    }

    export type NavigateToKey = {
        type: NAVIGATE_TO_KEY,
        move: string,
    }

    export type NavigateToMove = {
        type: NAVIGATE_TO_MOVE,
        move: Move,
    }

    export type AddMove = {
        type: GAME_ADD_MOVE,
        move: IMovePart|ITreePart,
    }


    export type LoadFull = {
        type: GAME_LOAD_FULL,
        game: IGameData,
    }

    export type GameAction = 
        NavigateToPly | 
        NavigateToKey |
        NavigateToMove |
        AddMove |
        LoadFull;
}