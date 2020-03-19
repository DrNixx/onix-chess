import { Colors } from './Types';

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
    
    export function toName(c: Colors.BW): Colors.Name {
        switch (c) {
            case White:
                return "white";
            case Black:
                return "black";
        }
    }   
}
