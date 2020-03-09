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

    public static WQCastle = 1;
    public static WKCastle = 2;
    public static BQCastle = 4;
    public static BKCastle = 8;
}