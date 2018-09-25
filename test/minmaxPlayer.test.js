import MinMaxPlayer from '../src/MinMaxPlayer';
import Move from '../src/Move';

describe('propagateScore', () => {

    it('should propagate score up one level', () => {

        let firstMove = new Move(-1);
        new Move(4, firstMove, -10);
        
        firstMove.propagateBestScore();
        
        expect(firstMove.score).toBe(-11);
    });

    it('should propagate score up two levels', () => {

        let firstMove = new Move(-1);
        let nextMove = new Move(3, firstMove);
        new Move(4, nextMove, -10);

        firstMove.propagateBestScore(0);

        expect(nextMove.score).toBe(-12);
        expect(firstMove.score).toBe(-12);
    });

    it('should propagate scores from two end moves', () => {

        let firstMove = new Move(-1);
        let nextMove = new Move(3, firstMove);
        new Move(4, nextMove, -10);
        new Move(8, nextMove, 10);
        
        firstMove.propagateBestScore(0);
        
        expect(nextMove.score).toBe(-4);
        expect(firstMove.score).toBe(-4);
    }); 
});

describe('MinMaxPlayer', () => {
    it('should play optimally 1', () => {

        let player = new MinMaxPlayer();
        player.calculateMoveTree();

        player.calculateNext(4);
        player.calculateNext(1);
        player.calculateNext(3);
        player.calculateNext(6);

        expect(player.currentPath[0]).toBe(4);
        expect(player.currentPath[1]).toBe(0);
        expect(player.currentPath[2]).toBe(1);
        expect(player.currentPath[3]).toBe(7);
        expect(player.currentPath[4]).toBe(3);
        expect(player.currentPath[5]).toBe(5);
        expect(player.currentPath[6]).toBe(6);
        expect(player.currentPath[7]).toBe(2);
    });

    it('calculateWinner should calculate winner for board1', () => {
        let player = new MinMaxPlayer();
        let board = ['X', 'O', 'X', 'O', 'X', 'O', 'X', null, null];

        let winner = player._calculateWinner(board);

        expect(winner).toBe('X');
    });

    it('calculateWinner should calculate winner for board2', () => {
        let player = new MinMaxPlayer();
        let board = ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'O', 'X'];

        let winner = player._calculateWinner(board);

        expect(winner).toBe('X');
    });

});

describe('Move constructor', () => {
    it('should set previous move correctly across multiple levels', () => {

        let firstMove = new Move(-1);
        let nextMove = new Move(3, firstMove);
        let endMove1 = new Move(4, nextMove, -10);
        let endMove2 = new Move(8, nextMove, 10);
        
        expect(endMove1.previousMove).toBe(nextMove);
        expect(endMove2.previousMove).toBe(nextMove);
        expect(nextMove.previousMove).toBe(firstMove);
        expect(firstMove.previousMove).toBe(undefined);
    });
});