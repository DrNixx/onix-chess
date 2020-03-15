import { Color } from './Color';
import { Piece } from './Piece';
import { Square } from './Square';

const ns = Square.NullSquare;
const np = Piece.NoPiece;

/**
 * Move data.
 */
export class SimpleMove {
    public PieceNum: number = 0;
    public MovingPiece: number = np;
    public From: number = ns;
    public To: number = ns;
    public Color = Color.NoColor;
    public CapturedNum = 0;
    public CapturedPiece = np;
    public Promote = np;
    public CapturedSquare = ns; // only different to "to" field if this capture is an en passant capture.
    public CastleFlags = 0;
    public EpSquare = ns;
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