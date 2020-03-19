"use strict";

const expect = require('chai').expect;
const { FenString, FenFormat } = require("../dist/chess/FenString");
const { Position } = require("../dist/chess/Position");

const positions = [
    ["2k4r/ppprnp1p/5pq1/1P2b3/P1R1P3/Q1N2N2/5PPP/4K1R1 b - - 0 22", "h8d8", "Rhd8", "d7d8", "Rdd8"],
    ["2kr1b1r/pp1qpp1p/2n2p2/1BPp3b/3P4/P1N2P2/1P4PP/R2QK1NR w KQ - 0 12", "g1e2", "Nge2"],
    ["8/1R2r2k/p7/P6p/5PpP/3pP1P1/4r1B1/3K4 b - - 0 53", "e2e3", "Rxe3"],
    ["rnb2r2/pppnq1p1/6k1/2p1PpN1/2Pp4/3Q3P/PP3PP1/R1B2RK1 w - f6 0 15", "e5f6", "exf6+"],
    ["r6r/pppknp1p/6p1/4p3/8/NP2P3/P1P2PPP/R3K2R w KQ - 0 13", "e1c1", "O-O-O+"],
    ["8/6k1/1K1Q4/8/8/8/6pQ/q1q5 b - - 0 23", "g2g1q", "g1=Q+", "g2g1b", "g1=B+", "g2g1r", "g1=R", "c1g1", "Qg1+"],
    ["r4r2/1pq1nkb1/p1pnp1pp/P2p4/NB1P1PP1/3PP1N1/1P2K1Q1/R6R b - - 0 22", "f8h8", "Rh8"],
    ["q3k1q1/8/4q3/8/8/8/3K4/8 b - - 0 1", "a8d8", "Qd8+", "a8d5", "Qad5+", "e6d5", "Qed5+", "a8g2", "Qag2+", "g8g2", "Qgg2+"],
    ["4k3/2n1n3/8/3B4/8/2n5/8/4K3 b - - 0 1", "c7d5", "Nc7xd5", "e7d5", "Nexd5", "c3d5", "N3xd5"],
    ["rnbqk1nr/pppp1ppp/4p3/8/1b1P4/5N2/PPP1PPPP/RNBQKB1R w KQkq - 0 3", "b1d2", "Nbd2", "f3d2", "Nfd2", "c1d2", "Bd2"],
    ["rnbq1rk1/pppp1ppp/4pn2/8/1bPP4/2N1P3/PP3PPP/R1BQKBNR w KQ - 0 5", "g1e2", "Ne2"],
    ["4r3/3P1Pk1/8/3K4/8/8/8/8 w - - 0 5", "d7e8q", "dxe8=Q", "f7e8q", "fxe8=Q"],
    ["7k/8/8/1R3R2/8/3R4/8/K7 w - - 0 1", "d3d5", "Rdd5", "b5d5", "Rbd5", "f5d5", "Rfd5"],
    ["7k/8/2B1B3/8/2B5/8/8/K7 w - - 0 1", "c4d5", "B4d5", "c6d5", "Bc6d5", "e6d5", "Bed5"],
    ["7k/8/2q1q3/8/2q5/8/8/K7 b - - 0 1", "c4d5", "Q4d5", "c6d5", "Qc6d5", "e6d5", "Qed5"]
];

describe('Position', function() {
    describe('#makeSanString()', function() {
        it('positions test', function() {
            positions.forEach(function(row) {
                const pos = new Position();
                const loadResult = FenString.toPosition(pos, row[0]);
                expect(loadResult).to.equal(true);

                for (let i = 1; i < row.length; (i += 2)) {
                    const uci = row[i];
                    const fen = row[i + 1];

                    const sm = pos.readCoordMove(uci);
                    expect(sm, 'Read move error. ' + row[0] + ' ' + row[i]).to.not.be.null;

                    const san = pos.makeSanString(sm);
                    expect(san, 'Error in position ' + row[0]).to.equal(fen);
                }
            });
        });
    });
});