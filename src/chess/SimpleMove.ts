import { Colors, Pieces, Squares } from '../types/Types';
import { Color } from './Color';
import { Piece } from './Piece';
import { Square } from './Square';

const ns = Square.NullSquare;
const np = Piece.None;

/**
 * Move data.
 */
export class SimpleMove {
    public PieceNum: number = 0;
    public MovingPiece?: Pieces.Piece = np;
    public From?: Squares.Square = ns;
    public To?: Squares.Square = ns;
    public Color?: Colors.BW = Color.None;
    public CapturedNum = 0;
    public CapturedPiece?: Pieces.Piece = np;
    public Promote?: Pieces.PieceType = np;
    public CapturedSquare?: Squares.Square = ns; // only different to "to" field if this capture is an en passant capture.
    public CastleFlags = 0;
    public EpSquare?: Squares.Square = ns;
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