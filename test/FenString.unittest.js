"use strict";

const expect = require('chai').expect;
const { FenString, FenFormat } = require("../dist/chess/FenString");
const { Position } = require("../dist/chess/Position");

const fenEmptyBoardStd = "8/8/8/8/8/8/8/8 w KQkq - 0 1";
const fenStdStart = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const fenTest = "8/8/8/3P4/3rN3/8/8/8 w KQkq - 0 1";
const fenTestEp = "rnb2r2/pppnq1p1/6k1/2p1PpN1/2Pp4/3Q3P/PP3PP1/R1B2RK1 w - f6 0 15";

describe('FenString', function() {
    describe('#trim()', function() {
        it('test return when the value is not present', function() {
            const fen = FenString.trim("", FenFormat.complete);
		    expect(fen).to.equal(fenEmptyBoardStd);
        });

        it('test return for FenFormat.color', function() {
            const fen = FenString.trim(fenStdStart, FenFormat.color);
            expect(fen).to.equal("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w");
        });

        it('test return for FenFormat.castlingEp', function() {
            const fen = FenString.trim(fenStdStart, FenFormat.castlingEp);
            expect(fen).to.equal("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -");
        });

        it('test assign fenStdStart to Position', function() {
            const pos = new Position();
            FenString.toPosition(pos, fenStdStart);
            expect(pos.pieceCount).to.deep.equal([16, 16]);
        });

        it('test assign fenTest to Position', function() {
            const pos = new Position();
            FenString.toPosition(pos, fenTest);
            expect(pos.pieceCount).to.deep.equal([2, 1]);
        });

        it('test assign fenTest to Position with e.p.', function() {
            const pos = new Position();
            FenString.toPosition(pos, fenTestEp);
            expect(pos.EpTarget).to.equal(0x2d);
        });
    });
});