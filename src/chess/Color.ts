const WHITE = 0;
const BLACK = 1;
const NO_COLOR = 2;

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
}