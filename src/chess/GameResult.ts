export namespace GameResult {
    export enum Color {
        None = 0,
        White = 1,
        Black = 2,
        Draw = 3
    }
    
    export enum Type {
        None = 0,
        Win = 1,
        Lose = 2,
        Draw = 3
    }
    
    export const OppositeColor: Color[] = [
        Color.None,
        Color.Black,
        Color.White,
        Color.Draw
    ];
    
    const OppositeType: Type[] = [
        Type.None,
        Type.Lose,
        Type.Win,
        Type.Draw
    ];
    
    export const score: number[] = [ 0, 1, 0, 0.5 ];
    
    export const resultChar: string[] = [ "*", "1", "0", "=" ];
    
    export const resultShortString: string[] = [ "*", "1-0", "0-1", "=-=" ];
    
    export const resultLongStr: string[] = [ "*", "1-0", "0-1", "1/2-1/2" ];
    
    export const resultHtmlStr: string[] = ["*", "1&ndash;0", "0&ndash;1", "&frac12;&ndash;&frac12;"];
}