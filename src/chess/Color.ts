import { Colors } from '../types/Types';

// const lit = <V extends keyof any>(v: V) => v;
// export type GameColor = (typeof Color)[keyof typeof Color];

export namespace Color {
    const white: Colors.White = 0;
    const black: Colors.Black = 1;
    const none: Colors.None = undefined;

    export const White: Colors.White = white;
    export const Black: Colors.Black = black;
    export const None: Colors.None = none;

    export const WhiteChar: Colors.Char = "w";
    export const BlackChar: Colors.Char = "b";

    export function isColor(c?: number): c is Colors.BW {
        return (c !== none) && ((c === white) || (c === black));
    }

    export function flip(c: Colors.BW): Colors.BW {
        return (1 - c) as Colors.BW;
    }

    export function isBW(c?: number): c is Colors.BW {
        return c === White || c === Black;
    }

    export function isName(c?: string): c is Colors.Name {
        return c === "white" || c === "black";
    }

    export function isChar(c?: string): c is Colors.Char {
        return c === "w" || c === "b";
    }
    
    export function toName(c: Colors.BW): Colors.Name {
        switch (c) {
            case White:
                return "white";
            case Black:
                return "black";
        }
    }

    export function fromName(c: Colors.Name): Colors.BW {
        switch (c) {
            case "white":
                return White;
            case "black":
                return Black;
        }
    }

    export function toChar(c: Colors.BW): Colors.Char {
        switch (c) {
            case White:
                return "w";
            case Black:
                return "b";
        }
    }

    export function fromChar(c: Colors.Char): Colors.BW {
        switch (c) {
            case "w":
                return White;
            case "b":
                return Black;
        }
    }
}
