/**
 * Castle side
 */
export class Castle {
    // Queen side. Long castling.
    public static QSide: number = 0;
    public static Q = 'O-O-O';
    // King side. Short castling.
    public static KSide: number = 1;
    public static K = 'O-O';

    public static WQ = 1;
    public static WK = 2;
    public static BQ = 4;
    public static BK = 8;
}