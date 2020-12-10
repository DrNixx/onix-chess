import toSafeInteger from "lodash-es/toSafeInteger";
import { Colors } from "../types/Types";
import { Color } from './Color';

export const plyToTurn = (ply: number) => {
    return toSafeInteger(1 + (ply - 1) / 2);
};

export const plyToColor = (ply: number) => {
    if (ply === 0) {
        return Color.White;
    }

    return ((ply % 2) == 1) ? Color.White : Color.Black;
};

export const turnToPly = (turn: number, color?: Colors.BW) => {
    if (turn === 0) {
        return 0;
    }

    color = color || Color.White;
    return (((turn - 1) * 2) + color + 1);
};