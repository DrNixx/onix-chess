import { Color } from './Color';
import { Colors } from './Types';

class CastlingStrBrand {
    private _brand = 0;
}

export type CastlingStr = CastlingStrBrand & string;

function checkValidCastleStr(str: string): str is CastlingStr {
    return /^(?:-|(?:K?Q?k?q?)){1}$/.test(str);
}

export enum CastlingSide {
    Queen = 0,
    King = 1
}

/**
 * Castle
 */
export class Castling {
    // Queen side. Long castling.
    public static Q = 'O-O-O';
    // King side. Short castling.
    public static K = 'O-O';

    public static WQ = 1;
    public static WK = 2;
    public static BQ = 4;
    public static BK = 8;

    private flag = 0;

    public constructor(castling: number | string = 0) {
        if (typeof castling === 'string') {
            if (!this.fromFen(castling)) {
                this.clear();
            }
        } else {
            this.flag = castling;
        }        
    }

    public get Flag() {
        return this.flag;
    }

    public set Flag(value: number) {
        this.flag = value;
    }

    public clone()
    {
        return new Castling(this.flag);
    }

    public assign(src: Castling)
    {
        this.flag = src.flag;
    }

    public clear()
    {
        this.flag = 0;
    }

    public any() {
        return (this.flag > 0);
    }

    private getMask(color: Colors.BW, direction: CastlingSide): number {
        let mask = (color === Color.White ? 1 : 4);
        if (direction === CastlingSide.King) {
            mask += mask;
        }

        // now mask = 1 or 2 (white flags), or 4 or 8 (black flags)
        return mask;
    }

    /**
     * Return castling is enabled.
     */
    public has(pc: Colors.BW | string, direction?: CastlingSide): boolean {
        let mask: number = 0;

        if (typeof pc === "string") {
            switch (pc) {
                case "K":
                    mask = this.getMask(Color.White, CastlingSide.King);
                    break;
                case "Q":
                    mask = this.getMask(Color.White, CastlingSide.Queen);
                    break;
                case "k":
                    mask = this.getMask(Color.Black, CastlingSide.King);
                    break;
                case "q":
                    mask = this.getMask(Color.Black, CastlingSide.Queen);
                    break;
            }
        } else {
            if (direction !== undefined) {
                mask = this.getMask(pc, direction);
            }
        }

        return (this.flag & mask) ? true : false;
    }

    /**
     * Set castling flag.
     */
    public set(color: Colors.BW, direction: CastlingSide, enabled: boolean): void {
        let mask = this.getMask(color, direction);

        if (enabled) {
            this.flag |= mask;
        } else {
            this.flag &= (255 - mask);
        }
    }

    public on(pc: Colors.BW | string, direction?: CastlingSide): void {
        if (typeof pc === "string") {
            switch (pc) {
                case "K":
                    this.set(Color.White, CastlingSide.King, true);
                    break;
                case "Q":
                    this.set(Color.White, CastlingSide.Queen, true);
                    break;
                case "k":
                    this.set(Color.Black, CastlingSide.King, true);
                    break;
                case "q":
                    this.set(Color.Black, CastlingSide.Queen, true);
                    break;
            }
        } else {
            if (direction !== undefined) {
                this.set(pc, direction, true);
            }
        }
    }

    public off(pc: Colors.BW | string, direction?: CastlingSide): void {
        if (typeof pc === "string") {
            switch (pc) {
                case "K":
                    this.set(Color.White, CastlingSide.King, false);
                    break;
                case "Q":
                    this.set(Color.White, CastlingSide.Queen, false);
                    break;
                case "k":
                    this.set(Color.Black, CastlingSide.King, false);
                    break;
                case "q":
                    this.set(Color.Black, CastlingSide.Queen, false);
                    break;
            }
        } else {
            if (direction !== undefined) {
                this.set(pc, direction, false);
            }
        }
    }

    public fromFen(fen: string): boolean {
        if (checkValidCastleStr(fen)) {
            this.clear();

            if (fen != "-") {
                this.set(Color.White, CastlingSide.King, fen.indexOf("K") >= 0);
                this.set(Color.White, CastlingSide.Queen, fen.indexOf("Q") >= 0);
                this.set(Color.Black, CastlingSide.King, fen.indexOf("k") >= 0);
                this.set(Color.Black, CastlingSide.Queen, fen.indexOf("q") >= 0);
            }

            return true;
        }

        return false;
    }

    public asFen(): CastlingStr {
        if (this.any()) {
            let fen = "";
            if (this.has(Color.White, CastlingSide.King)) {
                fen += "K";
            }

            if (this.has(Color.White, CastlingSide.Queen)) {
                fen += "Q";
            }

            if (this.has(Color.Black, CastlingSide.King)) {
                fen += "k";
            }

            if (this.has(Color.Black, CastlingSide.Queen)) {
                fen += "q";
            }

            return fen as CastlingStr;
        }

        return "-" as CastlingStr;
    }
}