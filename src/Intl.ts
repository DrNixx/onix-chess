import { Intl as IntlCore } from 'onix-core';

var intlInitialized = false;

export function registerStrings() {
    if (!intlInitialized) {
        
        IntlCore.registerStrings('chess', {
            'ru-ru': {
                fen: "FEN",
                pieces: "Фигуры",
                squares: "Доска",
                who_move: "Очередь хода",
                white: "Белые",
                black: "Черные",
                white_move: "Ход белых",
                black_move: "Ход черных",
                move_no: "№ хода",
                ep_target: "e.p.",
                castle: "Рокировка",
                firstMove: "Первый ход",
                prevMove: "Предыдущий ход",
                nextMove: "Следующий ход",
                lastMove: "Последний ход",
            },

            'en-us': {
                fen: "FEN",
                pieces: "Pieces",
                squares: "Board",
                who_move: "Who move",
                white: "White",
                black: "Black",
                white_move: "White move",
                black_move: "Black move",
                move_no: "Move no",
                ep_target: "e.p.",
                castle: "Castle",
                firstMove: "First move",
                prevMove: " Prev move",
                nextMove: "Next move",
                lastMove: "Last move",
            }
        });

        intlInitialized = true;
    }
}
