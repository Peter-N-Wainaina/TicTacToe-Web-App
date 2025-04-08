import { isGameOver } from "./gameLogic";

describe("isGameOver",  () => {
    test("detects horizontal win", ()=>{
        const board = [
            ['X', 'X', 'X'],
            [null, 'O', null],
            ['O', null, null]
          ];
        const result = isGameOver(board);
        expect(result).toEqual({ game_over: true, winner: "X"})
    });

    test('detects vertical win', () => {
        const board = [
          ['O', 'X', null],
          ['O', 'X', null],
          ['O', null, 'X']
        ];
        const result = isGameOver(board);
        expect(result).toEqual({ game_over: true, winner: 'O' });
    });
    
    test('detects diagonal win', () => {
        const board = [
            ['X', null, 'O'],
            [null, 'X', 'O'],
            [null, null, 'X']
        ];
        const result = isGameOver(board);
        expect(result).toEqual({ game_over: true, winner: 'X' });
    });

    test('detects draw', () => {
        const board = [
            ['X', 'O', 'X'],
            ['X', 'O', 'O'],
            ['O', 'X', 'X']
        ];
        const result = isGameOver(board);
        expect(result).toEqual({ game_over: true, winner: null });
    });

    test('detects ongoing game', () => {
    const board = [
        ['X', null, null],
        [null, 'O', null],
        ['O', null, 'X']
    ];
    const result = isGameOver(board);
    expect(result).toEqual({ game_over: false, winner: null });
    });
})