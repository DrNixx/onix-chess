const WHITE = 0;
const BLACK = 1;
const NO_COLOR = 2;

export type ColorName = "white" | "black";

/**
 * Color
 */
export class Color {
    public static White: number = WHITE;
    public static Black: number = BLACK;
    public static NoColor: number = NO_COLOR;

    public static WhiteChar: string = "w";
    public static BlackChar: string = "b";

    public static Names = ["white", "black", "none"];

    public static flip(c: number): number {
        return (1 - c);
    }

    public static toName(c: number): ColorName {
        switch (c) {
            case NO_COLOR:
                return undefined;
            case BLACK:
                return "black";
            default:
                return "white";
        }
    }
}