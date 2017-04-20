import { Color } from './Color';
import { Piece } from './Piece';
import { Square } from './Square';

/**
 * Move data.
 */
export class SimpleMove {
    public PieceNum: number = 0;
    public MovingPiece: number = Piece.NoPiece;
    public From: number = Square.NullSquare;
    public To: number = Square.NullSquare;
    public Color = Color.NoColor;
    public CapturedNum = 0;
    public CapturedPiece = Piece.NoPiece;
    public Promote = Piece.NoPiece;
    public CapturedSquare = Square.NullSquare; // only different to "to" field if this capture is an en passant capture.
    public CastleFlags = 0;
    public EpSquare = Square.NullSquare;
    public OldHalfMoveClock = 0;

    public PlyCount = 0;
    public San: string = "";
    public Comments: string = "";
    public Nag: string = "";
    public Permanent: boolean = true;

    public toString(): string {
        return this.San;
    }
}